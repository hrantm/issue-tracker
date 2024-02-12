import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/client";

const patchIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z.string().min(1, "assignedToUserId is Required").max(255).optional().nullable()
})

export async function PATCH(request: NextRequest,
    {params}: { params: {id: string}}){
    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)
    if (!validation.success){
      return NextResponse.json(validation.error.errors, {status: 400})
    }

    const { assignedToUserId, title, description } = body
    if(assignedToUserId){
        const user = await prisma.user.findUnique({
            where: {id: assignedToUserId}
        })
        if(!user){
            return NextResponse.json({error: 'Invalid User'}, {status: 400})
        }
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
            title,
            description,
            assignedToUserId
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
        return NextResponse.json({"error": "Inavlid Issue"}, {status: 404})
    }
    await prisma.issue.delete({
        where: {
            id: issue.id
        }        
    })
    return NextResponse.json({})
}