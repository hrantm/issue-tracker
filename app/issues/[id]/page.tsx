import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import delay from 'delay'
import { AlertDialog, Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import Link from 'next/link'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import DeleteButton from '../_components/DeleteButton'
import UpdateButton from '../_components/UpdateButton'
import AssigneeSelect from '../_components/AssigneeSelect'
import { Metadata } from 'next'

interface Props {
    params: {id: string}
}

const IssueDetails = async ({params}: Props) => {
    const issue = await prisma.issue.findFirst({
        where: {id: parseInt(params.id)}
    })    
    if(!issue){
        notFound()
    }
    return (
        <Grid columns={{initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <Heading>{issue.title}</Heading>
                <Flex className='my-2 space-x-3'>                
                    <IssueStatusBadge status={issue.status}/>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    <p>{issue.description}</p>
                </Card>
            </Box>
            
                <Box>
                <Flex direction={'column'} gap='4'>
                    <AssigneeSelect issue={issue}/>
                    <UpdateButton issueId={issue.id}/>
                    <DeleteButton issueId={issue.id}/>
                    </Flex>
                </Box>

            
        </Grid>
    )
}

export default IssueDetails

export const metadata: Metadata = {
    title: 'Issue Tracker - Edit Issue',
    description: 'Edit Issue Page'
  }