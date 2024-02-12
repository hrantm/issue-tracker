'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
    const {status, data: session} = useSession();
    const listItems = [
        {path: '/', label: 'Dashboard'},
        {path: '/issues', label: 'Issues'}
    ]
    const currentPath = usePathname()
    return (
    <nav className='space-x-6 items-center border-b mb-5 px-5 py-3'>
        <Container>
            <Flex justify='between'>
                <Flex align='center' gap='3'>
                    <Link href="/"><AiFillBug/></Link>
                    <ul className='flex space-x-6'>
                        {listItems.map(item => (
                            <li key={item.path}><Link href={item.path} className={classnames({
                                'text-zinc-900': item.path === currentPath,
                                'text-zinc-500': item.path !== currentPath,
                                'hover:text-zinc-800': true
                            })}>{item.label}</Link></li>
                        ))}
                    </ul>                
                </Flex>
                <Box>
                    {status === 'authenticated' && (
                        <DropdownMenu.Root>
                             <DropdownMenu.Trigger>
                                <Avatar referrerPolicy='no-referrer' className='cursor-pointer' fallback='?' size='2' radius='full' src={session.user!.image!}/>
                             </DropdownMenu.Trigger>
                             <DropdownMenu.Content>                                
                                <DropdownMenu.Label>
                                    <Text size='2'>{session.user?.email}</Text>
                                </DropdownMenu.Label>
                                <DropdownMenu.Item><Link href='/api/auth/signout'>Logout</Link></DropdownMenu.Item>
                             </DropdownMenu.Content>
                             
                        </DropdownMenu.Root>
                    )}
                    {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                </Box>
            </Flex>
        </Container>

    </nav>
    )
}

export default NavBar