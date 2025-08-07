import Link from 'next/link'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

export default function ContactTop() {
    return (
        <div className='w-[100%] py-[20px] lg:py-[40px] '>
            <div className='max-w-[1320px] mx-auto '>
                <div className='w-[100%] lg:pb-[37px] pb-[20px] lg:border-b-[0.1px] border-gray-200'>
                    <h2 className='lg:text-[36px] text-[20px] lg:leading-[48px] leading-[34px] font-[700] font-[font-playfair] text-center mb-[8px]'>
                       Contact Us
                    </h2>
                    <ul className='w-[100%] flex justify-center items-center'>
                        <li className='mr-[5px] flex items-center'>
                            <Link href={'/'} className='lg:text-[14px] text-[11px] leading-[15px] text-[var(--primary_text_color)]'> Home</Link>
                        </li>
                        <li className=' mr-[5px]'><AiOutlineRight className='lg:text-[13px] text-[11px]  text-[var(--secondary_text_color)] leading-[15px]' /></li>
                        <li className='mr-[5px] flex items-center lg:text-[14px] text-[11px] leading-[15px] text-[var(--secondary_text_color)]'>
                           Contact Us
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
