import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany()
    return (
      <div>   
          <div className='mb-5'>
            <Button><Link href='/issues/new'>New Issue</Link></Button>
          </div>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id}>
                  <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                  <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
                  <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>                
              ))}
            </Table.Body>
          </Table.Root>          
      </div>
    )
}

export default IssuesPage