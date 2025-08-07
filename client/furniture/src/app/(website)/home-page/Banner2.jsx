import Link from 'next/link'
import React from 'react'

export default function Banner2() {
  return (
    <div className='banner2 w-[100%] lg:h-[510px] h-[310px] lg:mb-[64px] mb-[55px] bg-[url(/images/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg)] bg-center bg-no-repeat bg-cover'>
        <div className='max-w-[1320px] h-[100%] mx-auto'>
            <div className='w-[100%] h-[100%] lg:px-[64px] px-[10px] flex items-center'>
                <div className='w-[100%] hover:scale-[1.08] duration-300'>
                    <h2 className='lg:text-[50px] text-[18px] lg:leading-[65px] mb-[10px] font-[font-playfair] font-[700] text-[var(--primary_text_color)] '>New Trending Collection</h2>
                    <p className='lg:text-[16px] text-[12px] lg:leading-[24px] text-[var(--gray_text_color)]'>
                        We Believe That Good Design is Always in Season
                    </p>
                    <Link href={'#'} className='lg:text-[14px] text-[12px] lg:leading-[46px] leading-[28px] uppercase text-[var(--secondary_text_color)] font-[600] lg:px-[45px] px-[20px] lg:mt-[70px] mt-[16px] inline-block border-[2px] border-[var(--border_color)] rounded-[2px] hover:bg-[var(--bg_color)] hover:text-white duration-300 '>
                    shopping Now
                    </Link>
                </div>
            </div>
        </div>
      
    </div>
  )
}
