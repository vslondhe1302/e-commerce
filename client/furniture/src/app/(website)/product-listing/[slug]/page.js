"use client"
import React from 'react'
import ProductListingTop from '../ProductListingTop'
import ProductPage from '../ProductPage'
import { useParams } from 'next/navigation';

export default function ProductListing() {
  let {slug} = useParams()
  
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <ProductListingTop/>
      <ProductPage slug={slug}/>
      
    </div>
  )
}

