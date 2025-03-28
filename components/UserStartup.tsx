import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/quires'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard'
import { string } from 'zod'

const UserStartup = async({id}:{id:string}) => {
    const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY,{id})
    const startup_id = startups?._id;
    console.log( "First starup ",startups[0])
  return (
   
   <>
    {startups.length > 0 ? startups.map((startup:StartupTypeCard)=>(
        <StartupCard key={startup._id} post={startup} isUserProfilePage={true}/>
    ))  : (
        <p className='no-result'>No post yet</p>
    ) }
   </>
  )
}

export default UserStartup
