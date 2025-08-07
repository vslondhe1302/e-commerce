import React from 'react'

export default function Collection() {
  return (
    <div className='w-[100%] lg:pb-[35px] lg:px-0 px-[10px] lg:mb-[70px] mb-[30px] border-b-[0.1px] border-gray-200'>
        <div className='max-w-[1320px] mx-auto grid sm:grid-cols-3 grid-cols-1 sm:gap-[16px] gap-[10px]'>
            <div className='relative w-full group cursor-pointer lg:mb-0 mb-4'>
                <figure className='w-full overflow-hidden'>
                    <img src="/images/08e20925-4e58-4ad3-bbb9-b037d6da2466-1670180400.webp" alt="" className='w-full object-cover mx-auto scale-100 sm:group-hover:scale-[1.08] group-hover:scale-105 duration-300' />
                </figure>
                <div className='absolute top-[0px] left-[0px] w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.1)] duration-300'>
                    <div className='pl-[20px] pt-[20px]'>
                        <p className='lg:text-[14px] text-[12px] lg:leading-[24px] text-[var(--primary_text_color)]'>Design Creative</p>
                        <h2 className='lg:text-[24px] text-[18px] lg:leading-[27px] font-[700] text-[var(--primary_text_color)] font-[font-playfair]'>Chair Collection</h2>
                    </div>
                </div>
            </div>
            <div className='relative group overflow-hidden cursor-pointer lg:mb-0 mb-4'>
                <figure className='w-full overflow-hidden'>
                    <img src="/images/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp" alt="" className='w-full object-cover mx-auto sm:group-hover:scale-[1.08] group-hover:scale-[1.05] duration-300' />
                </figure>
                <div className='absolute top-[0px] left-[0px] w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.1)] duration-300'>
                    <div className='pl-[20px] pt-[20px]'>
                        <p className='lg:text-[14px] text-[12px] lg:leading-[24px] text-[var(--primary_text_color)]'>
                            Bestselling Products</p>
                        <h2 className='lg:text-[24px] text-[18px] lg:leading-[27px] font-[700] text-[var(--primary_text_color)] font-[font-playfair]'>Chair Collection</h2>
                    </div>
                </div>
            </div>
            <div className='relative group overflow-hidden cursor-pointer lg:mb-0 mb-4'>
                <figure className='w-full overflow-hidden'>
                    <img src="/images/08e20925-4e58-4ad3-bbb9-b037d6da2466-1670180400.webp" alt="" className='w-full object-cover mx-auto sm:group-hover:scale-[1.08] group-hover:scale-[1.05] duration-300' />
                </figure>
                <div className='absolute top-[0px] left-[0px] w-[100%] h-[100%] group-hover:bg-[rgba(0,0,0,0.1)] duration-300'>
                    <div className='pl-[20px] pt-[20px]'>
                        <p className='lg:text-[14px] text-[12px] lg:leading-[24px] text-[var(--primary_text_color)]'>Onsale Products</p>
                        <h2 className='lg:text-[24px] text-[18px] lg:leading-[27px] font-[700] text-[var(--primary_text_color)] font-[font-playfair]'>Chair Collection</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
