"use client"
import React, { useEffect } from 'react'
import MydashboardTop from './dashboard-components/MydashboardTop'
import MydashboardArea from './dashboard-components/MydashboardArea'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { store } from '@/app/store/store'


export default function MyDashboard() {
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
  let token = useSelector((store)=>store.login.token)
  let getOrder = () =>{
    axios.post(`${apiBaseUrl}order/view-order`,{},{
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes);
      
    })
  }

  useEffect(()=>{
    getOrder()
  },[])

  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      
      <MydashboardTop/>
      <MydashboardArea/>
      
    </div>
  )
}

