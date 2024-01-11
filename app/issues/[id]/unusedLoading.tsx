import { Box, Card, Flex } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetails = () => {
  return (
    <Box className='max-w-xl'>      
      <Skeleton/>
      <Flex className='my-2 space-x-3'>
        <Skeleton width='5rem'/>
        <Skeleton width='8rem'/>
      </Flex>
      <Card>          
          <Skeleton count={3}/>
      </Card>
      
  </Box>    
  )
}

export default LoadingIssueDetails