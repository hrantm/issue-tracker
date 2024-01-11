'use client';
import { Issue } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, AlertDialogCancel, AlertDialogDescription, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const DeleteButton = ({issueId}: {issueId: number}) => {    
    const router = useRouter()
    const [error, setError] = useState(false);
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red'>
                        <TrashIcon/>
                        Delete
                    </Button> 
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone</AlertDialog.Description>
                    <Flex gap={'4'} className='mt-3'>
                        <AlertDialog.Cancel><Button variant='soft' color='gray'>Cancel</Button></AlertDialog.Cancel>
                        <AlertDialog.Action><Button color='red' onClick={async () =>{
                            try{
                                await axios.delete(`/api/issues/${issueId}`);
                                router.push('/issues');
                                router.refresh();
                            }catch (error) {
                                setError(true);
                            }

                        }}>Delete Issue</Button></AlertDialog.Action>
                    </Flex>

                </AlertDialog.Content>            
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialogDescription>This issue could not be deleted</AlertDialogDescription>
                        <Button color='gray' variant='soft' mt={'2'} onClick={() => setError(false)}>Ok</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteButton