import React from 'react'

export default function WhychooseUs() {
  return (
    <div className='w-[100%] lg:mb-[65px] mb-[30px]'>
        <div className='max-w-[1320px] mx-auto'>
            <div className='lg:mb-[7px] mb-5px'>
                <h2 className='lg:text-[24px] text-[16px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center '>
                    Why chose us?
                </h2>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                <div className=''>
                    <div>
                        <img src="/images/c65c4789-c1eb-4cfc-9961-3ab025317e08-1670161041.jpg" className='lg:w-[100px] w-[85px] mx-auto ' alt="" />
                    </div>
                    <div>
                        <h3 className='lg:text-[14px] text-[12px] font-[700] text-[var(--primary_text_color)] text-center lg:mb-[15px] mb-[10px] '>
                            Creative Design
                        </h3>
                        <p className='lg:text-[14px] text-[12px] text-[var(--gray_text_color)] text-center '>
                        Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim
                        </p>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <img src="/images/89df96b6-b70d-463b-affb-58a74d49ed6b-1670161065.jpg" className='lg:w-[100px] w-[85px] mx-auto' alt="" />
                    </div>
                    <div>
                        <h3 className='lg:text-[14px] text-[12px] font-[700] text-[var(--primary_text_color)] text-center lg:mb-[15px] mb-[10px] '>
                        100% Money Back Guarantee
                        </h3>
                        <p className='lg:text-[14px] text-[12px] text-[var(--gray_text_color)] text-center '>
                        Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim
                        </p>
                    </div>
                </div>
                <div className=''>
                    <div>
                        <img src="/images/eb6a7519-f0f9-469f-af25-4ba0536060fd-1670161090.jpg" className='lg:w-[100px] w-[85px] mx-auto' alt="" />
                    </div>
                    <div>
                        <h3 className='lg:text-[14px] text-[12px] font-[700] text-[var(--primary_text_color)] text-center lg:mb-[15px] mb-[10px] '>
                        Online Support 24/7
                        </h3>
                        <p className='lg:text-[14px] text-[12px] text-[var(--gray_text_color)] text-center '>
                        Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
