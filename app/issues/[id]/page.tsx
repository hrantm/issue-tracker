import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import delay from 'delay'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
interface Props {
    params: {id: string}
}

const IssueDetails = async ({params}: Props) => {
    // await delay(2000)
    const issue = await prisma.issue.findFirst({
        where: {id: parseInt(params.id)}
    })
    console.log(issue)
    if(!issue){
        notFound()
    }
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex className='my-2 space-x-3'>                
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{issue.description}</p>
            </Card>
            
        </div>
    )
}

export default IssueDetails