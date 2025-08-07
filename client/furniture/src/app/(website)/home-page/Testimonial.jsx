"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LiaStarSolid } from "react-icons/lia";
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export default function Testimonial({ staticPath, data }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='w-[100%] lg:mt-[48px] lg:pb-[64px] pb-[30px] lg:px-0 px-[10px] '>
            <div className='max-w-[1320px] mx-auto '>
                <div className='lg:mb-[25px] mb-[18px] '>
                    <h3 className='lg:text-[24px] text-[16px] lg:leading-[24px] font-[font-playfair] font-[700] text-[var(--primary_text_color)] text-center '>
                        What Our Custumers Say ?
                    </h3>
                </div>

                <div id='testimonialSlider' className='mb-[30px]'>
                    <Slider {...settings}>
                        {data.map((items, index) => {
                            let { testimonialName, testimonialImage, testimonialDesignation, testimonialMessage, testimonialRating } = items
                            return (
                                <div key={index}>
                                    <div className=''>
                                        <p className='lg:text-[16px] text-[11px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] text-center lg:px-[145px] lg:mb-[35px] mb-[20px] tracking-[0.3px] '>
                                            {testimonialMessage}
                                        </p>
                                        <img src={staticPath + testimonialImage} alt="" className='mb-[15px] lg:w-[100px] w-[80px] h-[80px] lg:h-[100px] mx-auto ' />
                                        <span className='lg:text-[14px] text-[12px] leading-[16px] lg:mb-[20px] mb-[8px] uppercase text-center font-[font-playfair] font-[700] block text-[var(--primary_text_color)] '>
                                            {testimonialName}
                                        </span>
                                        <span className='lg:text-[14px] text-[11px] leading-[16px] text-[var(--gray_text_color)] text-center block lg:mb-[20px] mb-[8px] '>
                                            {testimonialDesignation}
                                        </span>
                                        <div className=''>
                                            <RatingStars rating={testimonialRating} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

function RatingStars({ rating }) {
    const stars = []

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} className='' />)
        }
        else if (rating >= i-0.5) {
            stars.push(<FaStarHalfAlt key={i} />)
        } else {
            stars.push(<FaRegStar key={i} />)
        }
    }
    return (
        <ul className=''>
            <li className='lg:text-[14px] text-[12px] leading-[14px] text-[var(--secondary_text_color)] flex justify-center gap-[0.3px]'>
                {stars}
            </li>
        </ul>
    )
}
