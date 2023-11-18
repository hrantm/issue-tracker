import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";


const NavBar = () => {
    const listItems = [
        {path: '/', label: 'Dashboard'},
        {path: '/issues', label: 'Issues'}
    ]
    return (
    <nav className='flex space-x-6 items-center border-b mb-5 px-5 h-14'>
        <Link href="/"><AiFillBug/></Link>
        <ul className='flex space-x-6'>
            {listItems.map(item => (
                <li key={item.path}><Link href={item.path} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{item.label}</Link></li>
            ))}
        </ul>

    </nav>
    )
}

export default NavBar