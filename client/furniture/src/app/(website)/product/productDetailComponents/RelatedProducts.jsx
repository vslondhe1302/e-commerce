"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { relatedProductData } from '../../data/RelatedProductsData';



export default function RelatedProducts() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='w-[100%] lg:pb-[39px] pb-[35px] lg:mb-0 mb-[10px] lg:px-[0px] px-[10px]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='w-[100%] mb-[22px] relative grid lg:grid-cols-[17%_76%_2%] sm:grid-cols-[30%_65%_3%] grid-cols-[30%_55%_3%] items-center'>
                    <h3 className='lg:text-[24px] lg:leading-[30px] font-[700] font-[font-playfair] lg:pr-[20px] pr-0 '>Related Products</h3>
                    <span className=' block h-[1.5px] w-[100%] bg-gray-200 lg:pr-3'></span>
                </div>
                <div className='w-[100%]' id='sellingProduct'>
                    <Slider {...settings}>
                        {relatedProductData.map((items, index) => <SliderItems sItems={items} key={index} />)}

                    </Slider>
                </div>
            </div>
        </div>
    )
}

function SliderItems({ sItems }) {
    let { title, category_name, image, old_price, new_price } = sItems
    return (
        <div className='max-w-[1320px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)] border-[0.1px] border-gray-200 lg:pb-[30px] pb-[20px] lg:my-[30px] lg:mx-[8px] mx-[5px] '>
            <Link href={'#'}>
                <img src={`/images/${image}`} alt="" className='' />
            </Link>
            <div className='product-content w-[100%] mt-[8px]'>
                <div className='mb-[10px] text-center'>
                    <Link href={'#'} className='lg:text-[13px] text-[11px] font-[500] text-[var(--gray_text_color)] lg:leading-[24px]'>{category_name}</Link>
                </div>
                <h3 className='lg:pb-[15px] pb-[10px] lg:mb-[13px] mb-[8px] text-center relative'>
                    <Link href={'#'} className='heading lg:text-[16px] text-[14px] text-[var(--primary_text_color)] leading-[22px] font-[700] font-[font-playfair] hover:text-[var(--secondary_text_color)]'>
                        {title}
                    </Link>
                </h3>
                <div className='text-center'>
                    <span className='mr-[5px] lg:text-[14px] text-[12px] lg:leading-[24px] line-through text-[var(--primary_text_color)]'>Rs. {old_price}</span>
                    <span className=' lg:text-[16px] text-[12px] font-[500] text-[var(--secondary_text_color)] lg:leading-[24px]'>Rs. {new_price}</span>
                </div>
                <div className='mt-[16px] w-[100%]'>
                    <ul className='flex justify-center'>
                        <li className='lg:w-[35px] w-[30px] h-[30px] lg:h-[35px] mr-[5px] flex justify-center items-center cursor-pointer bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 group relative '>
                            <Link href={'#'} className='lg:text-[20px] text-[16px] lg:leading-[37px] group-hover:text-white'><FaRegHeart /></Link>
                            <div className='absolute bottom-[-50px] left-[-20px] bg-white lg:text-[14px] text-[11px] lg:py-2 py-1 text-center lg:w-[110px] w-[90px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0 invisible duration-300  group-hover:visible group-hover:opacity-[1] text-[var(--gray_text_color)]'>Add To Wishlist</div>
                        </li>
                        <li className='lg:h-[35px] h-[30px] bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 flex items-center group relative'>
                            <Link href={'#'} className='lg:text-[12px] text-[11px] font-[500] text-[var(--gray_text_color)] group-hover:text-white text-center lg:px-[18px] px-[10px]'>Add To Cart</Link>
                            <div className='absolute bottom-[-50px] right-[-20px] bg-white lg:text-[14px] text-[11px] lg:py-2 py-1 text-center lg:w-[100px] w-[90px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0 invisible duration-300  group-hover:visible group-hover:opacity-[1] text-[var(--gray_text_color)]'>Add To Cart</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
