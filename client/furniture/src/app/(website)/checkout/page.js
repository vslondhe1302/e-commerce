"use client"
import React from 'react'
import CheckoutTop from './checkout-components/CheckoutTop'
import CheckoutArea from './checkout-components/CheckoutArea'
import { useSelector } from 'react-redux'
import { store } from '@/app/store/store'
import { useRouter } from 'next/navigation'

export default function FAQ() {
  return (
    <div className=' lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
       <CheckoutTop/>
       <CheckoutArea/>
    </div>
  )
}
