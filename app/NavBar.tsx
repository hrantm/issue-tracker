'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const listItems = [
        {path: '/', label: 'Dashboard'},
        {path: '/issues', label: 'Issues'}
    ]
    const currentPath = usePathname()
    return (
    <nav className='flex space-x-6 items-center border-b mb-5 px-5 h-14'>
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

    </nav>
    )
}

export default NavBar