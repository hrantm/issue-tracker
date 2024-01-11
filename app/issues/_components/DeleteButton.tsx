'use client';
import { Issue } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteButton = ({issueId}: {issueId: number}) => {    
    return (
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
                    <AlertDialog.Action><Button color='red'>Delete Issue</Button></AlertDialog.Action>
                </Flex>

            </AlertDialog.Content>            
        </AlertDialog.Root>

    )
}

export default DeleteButton