import React from 'react'

export default function WelcomeMonsta() {
  return (
    <div className='w-[100%] lg:pb-[61px] pb-[30px]'>
        <div className='max-w-[1320px] mx-auto'>
            <div className='w-[100%] lg:mb-[21px] mb-[18px]'>
                <img src="/images/983cc349-1718-4290-b7cd-c8eb20459536-1671213069.jpg" className='mx-auto' alt="" />
            </div>
            <div>
                <h1 className='lg:text-[24px] text-[16px] lg:leading-[24px] leading-[20px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:mb-[15px] mb-[8px]'>
                    Welcome to Monsta!
                </h1>
                <p className='lg:text-[14px] text-[12px] lg:leading-[26px] leading-[20px] lg:mb-[16px] mb-[10px] text-[var(--gray_text_color)] text-center'>
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem. 
                </p>
                <span className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-center block italic text-[var(--secondary_text_color)]'>
                “There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”
                </span>
            </div>
        </div>
      
    </div>
  )
}
