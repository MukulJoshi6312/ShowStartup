import { auth,signIn } from '@/auth';
import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartup from '@/components/UserStartup';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/quires';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'


const page =  async({params}:{params:Promise<{id:string}>}) => {
    const id  = (await params).id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id});

    if (!session?.id) {
        return (
          <div className="flex flex-col items-center gap-2 justify-center h-screen">
            <p className="text-xl font-semibold text-red-500">
              Please login first to access this page.
            </p>
           {
             <form action={async()=> {
                "use server"
                await signIn('github')}}>
                <button type='submit' className='bg-black hover:bg-black/80 text-white text-2xl px-6 py-1 rounded-full flex justify-center items-center'>Login</button>
            </form>
           }
          </div>
        );
      }

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
