"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LiaStarSolid } from "react-icons/lia";

export default function Testimonial() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
  return (
    <div className='w-[100%] lg:mt-[48px] mt-[40px] lg:px-0 px-[10px] lg:pb-0 pb-[40px] '>
      <div className='max-w-[1320px] mx-auto '>
        <div className='lg:mb-[25px] mb-[18px] '>
            <h3 className='lg:text-[24px] text-[16px] lg:leading-[24px] font-[font-playfair] font-[700] text-[var(--primary_text_color)] text-center '>
                What Our Custumers Say ?
            </h3>
        </div>

        <div id='testimonialSlider' className='mb-[30px]'>
            <Slider {...settings}>
                <div>
                    <div className=''>
                        <p className='lg:text-[16px] text-[11px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] text-center lg:px-[145px] lg:mb-[35px] mb-[20px] tracking-[0.3px] '>
                        These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                        </p>
                        <img src="/images/3023f95a-ce85-434c-b9c5-2b0943b865e2-1670161621.jpg" alt="" className='mb-[15px] lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] mx-auto ' />
                        <span className='lg:text-[14px] text-[12px] leading-[16px] lg:mb-[20px] mb-[8px] uppercase text-center font-[font-playfair] font-[700] block text-[var(--primary_text_color)] '>
                            Kathy Young
                        </span>
                        <span className='lg:text-[14px] text-[11px] leading-[16px] text-[var(--gray_text_color)] text-center block lg:mb-[20px] mb-[8px] '>
                        CEO of SunPark
                        </span>
                        <div className=''>
                            <ul className='flex justify-center'>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <p className='lg:text-[16px] text-[11px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] text-center lg:px-[145px] lg:mb-[35px] mb-[20px] tracking-[0.3px] '>
                        These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                        </p>
                        <img src="/images/c6381687-5a5e-4914-9373-9cbec4937be6-1670161604.jpg" alt="" className='mb-[15px] lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] mx-auto ' />
                        <span className='lg:text-[14px] text-[12px] leading-[16px] lg:mb-[20px] mb-[8px] uppercase text-center font-[font-playfair] font-[700] block text-[var(--primary_text_color)] '>
                            Kathy Young
                        </span>
                        <span className='lg:text-[14px] text-[11px] leading-[16px] text-[var(--gray_text_color)] text-center block lg:mb-[20px] mb-[8px] '>
                        CEO of SunPark
                        </span>
                        <div className=''>
                            <ul className='flex justify-center'>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=''>
                        <p className='lg:text-[16px] text-[11px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] text-center lg:px-[145px] lg:mb-[35px] mb-[20px] tracking-[0.3px] '>
                        These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!
                        </p>
                        <img src="/images/35b5a0a0-e80f-4038-a75a-2811de92118b-1670161614.png" alt="" className='mb-[15px] lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] mx-auto ' />
                        <span className='lg:text-[14px] text-[12px] leading-[16px] lg:mb-[20px] mb-[8px] uppercase text-center font-[font-playfair] font-[700] block text-[var(--primary_text_color)] '>
                            Kathy Young
                        </span>
                        <span className='lg:text-[14px] text-[11px] leading-[16px] text-[var(--gray_text_color)] text-center block lg:mb-[20px] mb-[8px] '>
                        CEO of SunPark
                        </span>
                        <div className=''>
                            <ul className='flex justify-center'>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                                <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)]'><LiaStarSolid /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
      </div>
    </div>
  )
}
