import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
    params: {id: string}
}

const IssueDetails = async ({params}: Props) => {
    const issue = await prisma.issue.findFirst({
        where: {id: parseInt(params.id)}
    })
    console.log(issue)
    if(!issue){
        notFound()
    }
    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetails