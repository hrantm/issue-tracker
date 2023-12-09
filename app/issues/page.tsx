import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'
import IssueActions from './issueActions'

const IssuesPage = async () => {    
    const issues = await prisma.issue.findMany()
    return (
      <div>   
          <IssueActions/>
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
                    <Table.RowHeaderCell><Link href={`/issues/${issue.id}`}>{issue.title}</Link></Table.RowHeaderCell>
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