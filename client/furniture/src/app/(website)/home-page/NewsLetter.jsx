import React from 'react'

export default function NewsLetter() {
  return (
    <div>
       <div className='newsletter max-w-[100%] bg-[rgb(248,249,249)] lg:py-[70px] py-[50px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
                <div className='max-w-[1320px] mx-auto'>
                    <h2 className='lg:text-[24px] text-[20px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] lg:leading-[32px] text-center lg:mb-[8px]'>Our Newsletter</h2>
                    <p className='text-[var(--gray_text_color)] lg:text-[14px] text-[12px] tracking-[0.3px] leading-[26px] text-center lg:mb-[37px] mb-[28px]'>
                        Get E-mail updates about our latest shop and special offers.
                    </p>

                    <div className='newsletter-form max-w-[100%]'>
                        <form action="" className='flex justify-between mx-auto lg:h-[50px] h-[35px] lg:rounded-[4px] rounded-[2px] border-[1.6px] border-gray-200 '>
                            <input type="email" placeholder='Email address...' className='h-[100%] w-[600px] py-[10px] lg:pl-[24px] px-[10px] lg:pr-[100px] outline-none text-[12px] lg:text-[14px]' />
                            <button className='lg:px-[60px] px-[20px] lg:text-[16px] text-[12px] lg:h-[100%] font-bold text-white bg-[var(--bg_color)] hover:bg-[var(--hover_bg_color)] duration-300 lg:rounded-[4px] rounded-[2px]'>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}
