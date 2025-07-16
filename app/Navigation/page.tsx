'use client'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);
    const pathName = usePathname();
  return (
    <div className='relative'>
      <div className='flex justify-between items-center h-[60px] w-full p-2 bg-green-600 text-white'>
        <span className='text-white text-xl'>m-pessa | Safaricom</span>
        <nav className='flex'>
            <button type='button' className="sm:hidden outline-0 border-0 bg-transparent" onClick={() => setShowMenu(!showMenu)}>
                {!showMenu ? <Menu /> : <X className='text-black absolute top-7 right-0 z-10'/>}
            </button>
            <ul className={`flex gap-4 items-center font-bold ${showMenu ? 'flex-col bg-amber-50 text-green-600 text-sm absolute right-0' : 'hidden sm:flex'}`}>
                <li><Link href=''>APPLY</Link></li>
                <li><Link href=''>RECOMMEND</Link></li>
                <li className={`${pathName === '/login' ? 'bg-white text-green-600 rounded-md p-2' : ''}`}><Link href='/login'>LOGIN</Link></li>
            </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
