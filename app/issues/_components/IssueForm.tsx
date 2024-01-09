'use client';
import { Issue } from '@prisma/client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import { redirect, useRouter } from 'next/navigation';
// import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";

type IssueFormData = {
    title: string
    description: string
}


const IssueForm = ({issue}: {issue?: Issue}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        } = useForm<IssueFormData>()

    // const [error, setError] = useState('');
    // const [isSubmitting, setSubmitting] = useState(false);        
    const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
        // setSubmitting(true);
        const res = await axios.post('/api/issues', data)
        window.location.href = "/issues"
    }
    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root>
                <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")}/>
            </TextField.Root>
            <TextArea placeholder="Description" defaultValue={issue?.description} {...register("description")}/>
            <Button>Submit</Button>
        </form>
    )
}

export default IssueForm

