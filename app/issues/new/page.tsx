'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type IssueForm = {
    title: string
    description: string
}

const newIssue = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm<IssueForm>()    
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        const res = await axios.post('/api/issues', data)
        router.push('/issues')
    }
    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register("title")}/>
            </TextField.Root>
            <TextArea placeholder="Description" {...register("description")}/>
            <Button>Submit New Issue</Button>
        </form>
    )
}

export default newIssue