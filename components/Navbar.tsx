import { auth, signOut,signIn } from '@/auth'
import {CirclePlus, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = async() => {
    const session = await  auth();
  return (
    <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
            {/* <Image src="/logo.png" alt='logo' width={144} height={30} /> */}
            <span className='font-bold text-2xl md:text-3xl'>Show<span className='text-[#EE2B69]'>Startup</span> </span>
            </Link>
            <div className='flex items-center  gap-5 text-black'>
                {
                    session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className='max-sm:hidden'>Create</span>
                                <CirclePlus className='size-6 sm:hidden text-red-500'/>
                            </Link>
                            <form action={async()=>{ 
                                 "use server"
                                await signOut({redirectTo:'/'})}}>
                                <button type='submit'>
                                <span className='max-sm:hidden'>Logout</span>
                                <LogOut className='size-6 mt-1 sm:hidden text-red-500'/>

                                </button>
                            </form>
                            
                            <Link href={`/user/${session?.id}`}>
                                {/* <span>{session?.user?.name}</span> */}
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
                                    <AvatarFallback>
                                        <span className='size-10 rounded-full bg-red-500 text-xl text-white font-bold flex justify-center items-center'>
                                            {session?.user?.name?.slice(0,1).toUpperCase()}
                                        </span>
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) :
                    (
                        <form action={async()=> {
                            "use server"
                            await signIn('github')}}>
                            <button type='submit'>Login</button>
                        </form>
                    )
                }
            </div>

        </nav>
    </div>
  )
}

export default Navbar
