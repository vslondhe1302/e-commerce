"use client"
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import { FaRegHeart } from 'react-icons/fa';
import { sliderData } from '../data/BestSellingData';


export default function BestSellingProducts({ bestSelling, staticPath }) {
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
                breakpoint: 600,
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
                <div className='w-[100%] mb-[22px] relative grid lg:grid-cols-[22%_72%_2%] sm:grid-cols-[20%_74%_2%] grid-cols-[36%_52%_3%] items-center'>
                    <h3 className='lg:text-[24px] sm:text-[20px] lg:leading-[30px] font-[700] font-[font-playfair] '>Bestselling Products</h3>
                    <span className=' block h-[1.5px] w-[100%] bg-gray-200 '></span>
                </div>
                <div className='w-[100%]' id='sellingProduct'>
                    {bestSelling.length > 1 ?
                        <Slider {...settings} className=''>
                            <div>
                                {
                                    bestSelling?.map((items, index) => <SliderItems items={items} key={index} staticPath={staticPath} />)
                                }
                            </div>
                        </Slider>
                        :
                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-[24px] sm:gap-[18px] gap-[14px]'>
                            <div className='w-full'>
                                {bestSelling.map((items, index) => <SliderItems items={items} key={index} staticPath={staticPath} />)}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

function SliderItems({ items, staticPath, index }) {
    return (
        <div key={index} className='max-w-[1320px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.15)]  rounded-[4px] lg:pb-[30px] pb-[20px] lg:my-[30px]'>
            <Link href={`/product/${items.slug}`}>
                <img src={staticPath + items.productImage} alt="preview" className='rounded-t-[4px]' />
            </Link>
            <div className='product-content w-[100%] mt-[8px]'>
                <div className='mb-[10px] text-center'>
                    <Link href={`/product-listing/${items.slug}`} className='lg:text-[13px] text-[11px] font-[500] text-[var(--gray_text_color)] lg:leading-[24px]'>
                        {items.subSubCategory.subSubCategoryName}
                    </Link>
                </div>
                <h3 className='lg:pb-[15px] pb-[10px] lg:mb-[13px] mb-[8px] text-center relative'>
                    <Link href={`/product/${items.slug}`} className='heading lg:text-[16px] text-[14px] text-[var(--primary_text_color)] leading-[22px] font-[700] font-[font-playfair] hover:text-[var(--secondary_text_color)]'>
                        {items.productName}
                    </Link>
                </h3>
                <div className='text-center'>
                    <span className='mr-[5px] lg:text-[14px] text-[12px] lg:leading-[24px] line-through text-[var(--primary_text_color)]'>
                        Rs. {Number(items.actualPrice).toLocaleString()}
                    </span>
                    <span className=' lg:text-[16px] text-[12px] font-[500] text-[var(--secondary_text_color)] lg:leading-[24px]'>
                        Rs. {Number(items.salePrice).toLocaleString()}
                    </span>
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

// function SampleNextArrow(props) {
//     const { onClick } = props;
//     return (
//         <div
//             className="absolute top-[50%] right-2 w-[40px] h-[50px] translateY-[-50%] flex items-center justify-center"
//             onClick={onClick}
//         ><GrNext className='' /></div>
//     );
// }

// function SamplePrevArrow(props) {
//     const { onClick } = props;
//     return (
//         <div
//             className="absolute top-[50%] left-2 z-10 w-[40px] h-[50px] translateY-[-50%] flex items-center justify-center"
//             onClick={onClick}
//         ><GrPrevious /></div>
//     );
// }
