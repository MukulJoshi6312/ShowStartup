import StartupFrom from '@/components/StartupFrom'
import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation';

const page = async() => {
    const session = await auth();
    if(!session) redirect("/");
    
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit your Startup</h1>
    </section>
    <StartupFrom/>
    </>
  )
}

export default page
