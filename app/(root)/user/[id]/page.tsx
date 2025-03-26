import { auth } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartup from '@/components/UserStartup';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/quires';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense, use } from 'react'

const page =  async({params}:{params:Promise<{id:string}>}) => {
    const id  = (await params).id;
    const session = await auth();
    console.log(session.id)
    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id});
    console.log(user)
    if(!user) return notFound();
  return (
   <>
    <section className='profile_container'>
    <div className='profile_card'>
        <div className='profile_title'>
            <h3 className='text-2xl text-black font-extrabold uppercase text-center line-clamp-1'>
            {user.name}
            </h3>
        </div>
        <Image
        src={user.image}
        alt={user.name}
        width={220}
        height={220}
        className='profile_image'
        />

        <p className='text-3xl font-extrabold mt-7 text-center  text-white'>@{user?.username}</p>
        <p className='mt-1 text-center text-sm font-normal text-white' >{user?.bio}</p>
    </div>
    <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
        <p className='text-3xl font-bold'>{session?.id === id ? 'Your ': 'All'} Startups</p>
        <ul className='card_grid-sm'>
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartup id={id} />
            </Suspense>
        </ul>
    </div>
    </section>
   </>
  )
};

export default page
