"use client"

import Form from 'next/form'
import SerachFormReset from './SerachFormReset';
import {Search} from 'lucide-react'
import { useEffect, useState } from 'react'

const SearchForm = ({query}:{query?:string}) => {

    const[serachBy,setSearchBy] = useState([
        "Tech Startup",
        "E-commerce Startup",
        "Fintech Startup",
        "HealthTech Startup",
        "EdTech Startup",
        "AI/ML Startup",
        "SaaS Startup",
        "Social Media Startup",
        "Blockchain/Crypto Startup"
    ])
    const [currentIndex,setCurrenIndex] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrenIndex((prev)=> (prev+1)%serachBy.length)
        }, 2000);

        return () => clearInterval(interval)
    })
  return (
   <Form action="/" scroll={false} className='search-form'>
        <input type="text"
        name='query'
        defaultValue={query}
        className='search-input placeholder:text-black-100'
        placeholder={`Search Startup`} />

        <div className='flex gap-2'>
            {query && <SerachFormReset/>}
            <button type='submit' className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
        </div>
   </Form>
  )
}

export default SearchForm
