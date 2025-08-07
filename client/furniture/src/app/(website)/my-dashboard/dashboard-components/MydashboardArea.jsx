"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Orders from './Orders'
import ChangePassword from './Change-Password'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/app/slice/userSlice'
import { redirect } from 'next/dist/server/api-utils'
import MyProfile from './MyProfile'
import Addresses from './Addresses'

export default function MydashboardArea() {
    let dispatch = useDispatch()
    let [dashboardPages, setDashboardPages] = useState(1)

    let user = useSelector((store) => store.login.user)

    useEffect(() => {
        if (!user) {
            redirect('/login')
        }
    }, [])

    return (
        <div className='w-[100%] lg:pb-[65px] pb-[40px]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='grid lg:grid-cols-[330px_auto] grid-cols-1 lg:gap-[24px] gap-[14px]'>
                    <div className=''>
                        <ul>
                            <li onClick={() => setDashboardPages(1)} className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] ${dashboardPages == 1 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'} hover:bg-[var(--bg_color)] duration-150`}>
                                <div className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    My Dashboard
                                </div>
                            </li>
                            <li onClick={() => setDashboardPages(2)} className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] hover:bg-[var(--bg_color)] duration-150 ${dashboardPages == 2 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'}`}>
                                <div className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    Orders
                                </div>
                            </li>
                            <li onClick={() => setDashboardPages(3)} className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] ${dashboardPages == 3 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'} hover:bg-[var(--bg_color)] duration-150`}>
                                <div className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    addresses
                                </div>
                            </li>
                            <li onClick={() => setDashboardPages(4)} className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] ${dashboardPages == 4 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'} hover:bg-[var(--bg_color)] duration-150`}>
                                <div className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    My profile
                                </div>
                            </li>
                            <li onClick={() => setDashboardPages(5)} className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] ${dashboardPages == 5 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'} hover:bg-[var(--bg_color)] duration-150`}>
                                <div className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    change password
                                </div>
                            </li>
                            <li onClick={() => {
                                dispatch(logout())
                                setDashboardPages(6)
                            }}
                                className={`lg:h-[40px] h-[28px] w-full rounded-[4px] mb-[5px] ${dashboardPages == 6 ? 'bg-[var(--bg_color)]' : 'bg-[var(--dark_bg_color)]'} hover:bg-[var(--bg_color)] duration-150`}>
                                <button className='block lg:px-[16px] px-[12px] lg:py-[8px] py-[4px] lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-white font-[500] capitalize'>
                                    logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className='my-dashboard'>
                        <div className={`${dashboardPages == 1 ? 'block' : 'hidden'}`}>
                            <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                                My dashboard
                            </h3>
                            <p className='lg:text-[14px] text-[10px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)]'>
                                From your account dashboard. you can easily check & view your <span className='font-[500] cursor-pointer'>recent orders</span>, manage your <span className='font-[500] cursor-pointer'>shipping and billing addresses</span> and <span className='font-[500] cursor-pointer'>Edit your password and account details.</span>
                            </p>
                        </div>
                        <div className={`${dashboardPages == 2 ? 'block' : 'hidden'}`}>
                            <Orders />
                        </div>
                        <div className={`${dashboardPages == 3 ? 'block' : 'hidden'}`}>
                            <Addresses />
                        </div>
                        <div className={`${dashboardPages == 4 ? 'block' : 'hidden'}`}>
                            <MyProfile />
                        </div>
                        <div className={`${dashboardPages == 5 ? 'block' : 'hidden'}`}>
                            <ChangePassword />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
