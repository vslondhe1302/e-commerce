import React from 'react'
import { IoEarth } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import { MdAccessTime } from "react-icons/md";

export default function ShipingArea() {
  return (
    <div className='w-[100%] lg:pt-[70px] pt-[60px] pb-[25px] lg:mb-[0px] mb-[60px] bg-[rgb(248,249,249)] border-y-[1px] border-gray-200'>
        <div className='max-w-[1320px] mx-auto lg:grid grid-cols-3'>
            <div className='mb-[30px] flex flex-col items-center'>
                <div className='lg:mb-[18px] mb-[15px] lg:w-[70px] lg:h-[70px] w-[60px] h-[60px] rounded-full flex items-center justify-center border-2 border-gray-800 hover:border-[var(--border_color)] duration-300 group'>
                    <IoEarth className='lg:text-[25px] text-[20px] text-[var(--gray_text_color)] lg:leading-[67px] group-hover:text-[var(--secondary_text_color)] ' />
                </div>
                <div className=''>
                    <h3 className='lg:text-[18px] text-[15px] lg:leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] lg:mb-[12px] mb-[8px] text-center '>
                        Free Shipping
                    </h3>
                    <p className='lg:text-[15px] text-[12px] lg:leading-[26px] text-[var(--gray_text_color)] text-center tracking-[0.3px] '>Free shipping on all order</p>
                </div>
            </div>
            <div className='mb-[30px] flex flex-col items-center'>
                <div className='lg:mb-[18px] mb-[15px] lg:w-[70px] lg:h-[70px] w-[60px] h-[60px] rounded-full flex items-center justify-center border-2 border-gray-800 hover:border-[var(--border_color)] duration-300 group'>
                    <LiaCheckCircle className='lg:text-[25px] text-[20px] text-[var(--gray_text_color)] lg:leading-[67px] group-hover:text-[var(--secondary_text_color)] ' />
                </div>
                <div className=''>
                    <h3 className='lg:text-[18px] text-[15px] lg:leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] lg:mb-[12px] mb-[8px] text-center '>
                    Money Return
                    </h3>
                    <p className='lg:text-[15px] text-[12px] lg:leading-[26px] text-[var(--gray_text_color)] text-center tracking-[0.3px] '>
                    Back guarantee under 7 days</p>
                </div>
            </div>
            <div className='mb-[30px] flex flex-col items-center'>
                <div className='lg:mb-[18px] mb-[15px] lg:w-[70px] lg:h-[70px] w-[60px] h-[60px] rounded-full flex items-center justify-center border-2 border-gray-800 hover:border-[var(--border_color)] duration-300 group'>
                    <MdAccessTime  className='lg:text-[25px] text-[20px] text-[var(--gray_text_color)] lg:leading-[67px] group-hover:text-[var(--secondary_text_color)] ' />
                </div>
                <div className=''>
                    <h3 className='lg:text-[18px] text-[15px] lg:leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] lg:mb-[12px] mb-[8px] text-center '>
                    Online Support
                    </h3>
                    <p className='lg:text-[15px] text-[12px] lg:leading-[26px] text-[var(--gray_text_color)] text-center tracking-[0.3px] '>
                    Support online 24 hours a day</p>
                </div>
            </div>
        </div>
      
    </div>
  )
}
