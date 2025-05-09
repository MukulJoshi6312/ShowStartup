import { fromateDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/quires';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
export const experimental__ppr = true;
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
const md = markdownit();
const page = async({params}:{params : Promise<{id:string}>}) => {

    const id = (await params).id;

    const [post,{select: startupOfTheDay}] = await Promise.all([client.fetch(STARTUP_BY_ID_QUERY,{id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY,{ slug:"startup-of-the-day" })

    ])

    // const post = await client.fetch(STARTUP_BY_ID_QUERY,{id})

    // const {select: startupOfTheDay} = await client.fetch(PLAYLIST_BY_SLUG_QUERY,{ slug:"startup-of-the-day" });

    if(!post) return notFound();
    const parsedContent  = md.render(post?.pitch || '');

  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{fromateDate(post?._createdAt)}</p>
        <h1 className='heading'>{post?.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
    </section>
    <section className='section_container'>
    <img
          src={post?.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
    <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
            <Link href={`/user/${post?.author?._id}`} className='flex gap-2 items-center mb-3'>
                <Image src={post.author.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg'/>
            <div>
            <p className='text-20-medium font-bold'>{post.author.name}</p>
            <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
            </div>
            </Link>

            <p className='category-tag font-bold'>{post.category}</p>
        </div>
        <h3 className='text-3xl font-bold'>Pitch Details</h3>
        {parsedContent ? (
            <article className='prose max-w-4xl font-sans break-all' dangerouslySetInnerHTML={ {__html: parsedContent}}/>
        ) : (
            <p className='no-result'>No details provided</p>
        )}
    </div>
    <hr className='border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto'/>

    {startupOfTheDay?.length > 0 && (
        <div className='max-w-4xl mx-auto'>
            <p className='text-3xl font-semibold'>Startup of the Day</p>
            <ul className='mt-7 card_grid-sm'>
                {
                    startupOfTheDay.map((post:StartupTypeCard,index:number)=>(
                        <StartupCard key={index} post={post}/>
                    ))
                }

            </ul>

        </div>
    )}

        <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3;'/>}>
            <View id={id}/>
        </Suspense>
    </section>
</>
  )
}

export default page
