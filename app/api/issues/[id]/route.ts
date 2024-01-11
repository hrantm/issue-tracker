import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1)
})

export async function PATCH(request: NextRequest,
    {params}: { params: {id: string}}){
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success){
      return NextResponse.json(validation.error.errors, {status: 400})
    }
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue){
        return NextResponse.json({error: 'Inavlid Issue'}, {status: 404})
    }
    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue, {status: 200})
}


export async function DELETE(request: NextRequest,
    {params}: { params: {id: string}}){
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })
    if(!issue){
        return NextResponse.json({error: 'Inavlid Issue'}, {status: 404})
    }
    await prisma.issue.delete({
        where: {
            id: issue.id
        }        
    })
    return NextResponse.json({})
}