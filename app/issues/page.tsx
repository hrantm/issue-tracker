// 'use client'
import { Button, Table } from '@radix-ui/themes'
import NextLink  from 'next/link';
import Link from '../components/Link';
import React from 'react'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { pages } from 'next/dist/build/templates/app-page';
import Pagination from '../components/Pagination';

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue, page: string } 
}

const IssuesPage = async ({searchParams}: Props) => {
    const columns: { label: string, value: keyof Issue }[] = [
      {label: 'Title', value: 'title'},
      {label: 'Status', value: 'status'},
      {label: 'Created At', value: 'createdAt'}
    ]
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

    const where = {status};
    const orderBy = searchParams.orderBy ? {
      [searchParams.orderBy]: 'asc'
    } : undefined

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10

    const issues = await prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    const issueCount = await prisma.issue.count({where})
    return (
      <div>   
          <IssueActions/>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>
                {columns.map((col) => (
                  <Table.ColumnHeaderCell key={col.value}><NextLink href={{
                    query: {...searchParams, orderBy: col.value}
                  }}>{col.label}</NextLink>
                  {col.value === searchParams.orderBy && <ArrowUpIcon className='inline'/> }
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {issues.map((issue) => (                
                <Table.Row key={issue.id}>
                    <Table.RowHeaderCell><Link href={`/issues/${issue.id}`}>{issue.title}</Link></Table.RowHeaderCell>
                    <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
                    <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>                
              ))}
            </Table.Body>
          </Table.Root>      
          <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize}/>
      </div>
    )
}

export const dynamic = 'force-dynamic';

export default IssuesPage