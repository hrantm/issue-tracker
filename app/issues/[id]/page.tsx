import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import delay from 'delay'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import Link from 'next/link'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'

interface Props {
    params: {id: string}
}

const IssueDetails = async ({params}: Props) => {
    // await delay(2000)
    const issue = await prisma.issue.findFirst({
        where: {id: parseInt(params.id)}
    })    
    if(!issue){
        notFound()
    }
    return (
        <Grid columns={{initial: '1', md: '2'}} gap='5'>
            <Box className='max-w-xl'>
                <Heading>{issue.title}</Heading>
                <Flex className='my-2 space-x-3'>                
                    <IssueStatusBadge status={issue.status}/>
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    <p>{issue.description}</p>
                </Card>
            </Box>
            <Box className='space-x-4'>
                <Button>
                    <Pencil2Icon/>
                    <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
                </Button>
                <Button>
                    <TrashIcon/>
                    Delete
                </Button>                
            </Box>
        </Grid>
    )
}

export default IssueDetails