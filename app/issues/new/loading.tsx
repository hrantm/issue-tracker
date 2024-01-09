'use client';
import { TextField, TextArea, Button } from '@radix-ui/themes'
import delay from 'delay'
import { register } from 'module'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const LoadingNewIssue = async () => {
  // await delay(2000)
  return (
    // <>
    // LOADING
    // </>
    <form className='max-w-xl space-y-3'>
      {/* // <TextField.Root> */}
      <Skeleton/>
          {/* <TextField.Input placeholder="Title" {...register("title")}/> */}
      {/* </TextField.Root> */}
      {/* <TextArea placeholder="Description" /> */}
      <Skeleton/>
      <Button>Submit New Issue</Button>
  </form>    
  )
}

export default LoadingNewIssue