"use client"
import { store } from '@/app/store/store';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaFacebookF, FaTelegram, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

export default function Footer() {
    let user = useSelector((store) => store.login.user)

    return (
        <>
            <section className='footer-top  w-[100%]'>
                <div className='scrollTotop'>
                    <ScrollToTop smooth top={250} className='flex justify-center items-center group' component={<RiArrowUpDoubleLine className='group-hover:animate-wiggle text-white leading-[45px] text-[22px] font-bold' />} />
                </div>

                <div className='max-w-[1320px] mx-auto grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-1 gap-3 border-b-1 border-gray-200 lg:pt-[64px] lg:pb-[61px] py-[30px] lg:px-0 px-[10px]'>
                    <div className='col-span-2 lg:mb-0 mb-3'>
                        <h3 className='lg:text-[22px] lg:leading-[26px] font-[font-playfair] font-bold text-[var(--primary_text_color)] lg:mb-[24px] mb-[8px]'>Contact Us</h3>
                        <div>
                            <p className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[30px]'>Address: Claritas est etiam processus dynamicus</p>
                            <p className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[30px]'>Phone: 9781234560</p>
                            <p className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[30px]'>Email: furniture@gmail.com</p>
                            <ul className='flex gap-2.5 mt-[10px]'>
                                <li className='lg:w-[40px] w-[30px] h-[30px] lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaFacebookF className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                                <li className='lg:w-[40px] w-[30px] h-[30px] lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaInstagram className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                                <li className='lg:w-[40px] w-[30px] h-[30px] lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaTwitter className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                                <li className='lg:w-[40px] w-[30px] h-[30px]  lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaLinkedinIn className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                                <li className='lg:w-[40px] w-[30px] h-[30px] lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaYoutube className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                                <li className='lg:w-[40px] w-[30px] h-[30px] lg:h-[40px] rounded-full border-[1.5px] group border-[var(--footer_icon_color)] hover:border-[var(--bg_color)] duration-300 flex justify-center items-center cursor-pointer'>
                                    <Link href={'#'} className=''>
                                        <FaTelegram className='lg:text-[18px] text-[14px] text-[var(--footer_icon_color)] duration-300 group-hover:text-[var(--secondary_text_color)]' />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='lg:mb-0 mb-3'>
                        <h3 className='lg:text-[22px] lg:leading-[26px] font-[font-playfair] font-bold text-[var(--primary_text_color)] lg:mb-[24px] mb-[8px]'>Information</h3>
                        <ul>
                            <li>
                                <Link href={'/about-us'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={'/contact-us'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href={'/frequently-questions'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                    Frequently Questions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='lg:mb-0 mb-3'>
                        {user &&
                            <div>
                                <h3 className='lg:text-[22px] lg:leading-[26px] font-[font-playfair] font-bold text-[var(--primary_text_color)] lg:mb-[24px] mb-[8px]'>My Account</h3>
                                <ul>
                                    <li>
                                        <Link href={'/my-dashboard'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                            My Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/wishlist'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/cart'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                            Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'#'} className='lg:text-[14px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] hover:text-[var(--secondary_text_color)] duration-300 lg:leading-[30px]'>
                                            Checkout
                                        </Link>
                                    </li>
                                </ul>
                            </div>}
                    </div>

                    <div className='col-span-2 lg:mb-0 mb-2 lg:mt-0 sm:mt-4 mt-3'>
                        <TopRatedProducts />
                    </div>
                </div>
            </section>

            <section className='footer-middle w-[100%]'>
                <div className='max-w-[1320px] mx-auto lg:pt-[17px] py-[10px] lg:pb-[15px] border-b-1 border-gray-200'>
                    <ul className='flex justify-center items-center'>
                        <li>
                            <Link href={''} className='lg:text-[16px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[24px] lg:mr-[40px] mr-[16px] hover:text-[var(--secondary_text_color)] duration-300'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={''} className='lg:text-[16px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[24px] lg:mr-[40px] mr-[16px] hover:text-[var(--secondary_text_color)] duration-300'>
                                Online Store
                            </Link>
                        </li>
                        <li>
                            <Link href={''} className='lg:text-[16px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[24px] lg:mr-[40px] mr-[16px] hover:text-[var(--secondary_text_color)] duration-300'>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href={''} className='lg:text-[16px] text-[11px] text-[var(--gray_text_color)] tracking-[0.5px] font-[500] lg:leading-[24px] lg:mr-[40px] mr-[16px] hover:text-[var(--secondary_text_color)] duration-300'>
                                Terms Of Use
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            <search className='footer-bottom w-[100%]'>
                <div className='max-w-[1320px] mx-auto lg:pt-[38px] pt-[16px] pb-[20px] lg:pb-[46px]'>
                    <p className='lg:text-[14px] text-[12px] lg:leading-[26px] text-center text-[var(--gray_text_color)] lg:mb-[16px] mb-[8px]'>All Rights Reserved By Furniture | © 2025</p>
                    <img src="/images/papyel2.png" className='mx-auto' alt="" />
                </div>
            </search>


        </>
    )
}

function TopRatedProducts() {
    let [topRatedProduct, setTopRatedProduct] = useState([])
    let [ratedImgPath, setRatedImgPath] = useState('')
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let getTopRatedProducts = () => {
        axios.get(`${apiBaseUrl}home/top-rated`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    setTopRatedProduct(finalRes.data)
                    setRatedImgPath(finalRes.staticPath)
                }
            })
    }

    useEffect(() => {
        getTopRatedProducts()
    }, [])
    return (
        <div>
            <h3 className='lg:text-[22px] lg:leading-[26px] font-[font-playfair] font-bold text-[var(--primary_text_color)] lg:mb-[24px] mb-[8px]'>
                Top Rated Products
            </h3>
            <div className=''>
                {topRatedProduct.length != 0 ?
                 topRatedProduct.map((items,index)=>(

                    <div key={index} className='flex justify-between pb-[12px] mb-[12px] border-b-2 border-gray-200'>
                        <Link href={`/product/${items.slug}`} className='basis-[25%]'>
                            <img src={ratedImgPath+items.productImage} className='w-[100%]' alt="" />
                        </Link>
                        <div className='basis-[70%]'>
                            <div className='sm:text-[14px] text-[12px] lg:leading-[24px] font-[400] text-[var(--gray_text_color)] cursor-pointer'>
                                {items.subSubCategory.subSubCategoryName}
                            </div>
                            <h3 className='sm:text-[16px] text-[14px] lg:leading-[26px] text-[var(--fp_heading)] hover:text-[var(--secondary_text_color)] font-[font-playfair] cursor-pointer duration-300 mb-[10px]'>
                                <Link href={`/product/${items.slug}`}>
                                    {items.productName}
                                </Link>
                            </h3>
                            <div className='sm:text-[14px] text-[12px]'>
                                <span className='pr-[8px] text-[var(--gray_text_color)] font-[500] line-through'>
                                    Rs. {Number(items.actualPrice).toLocaleString()}
                                </span>
                                <span className='text-[var(--secondary_text_color)] font-[600]'>
                                    Rs. {Number(items.salePrice).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    ))
                    :
                    <div className='w-full'>
                        <span className='lg:text-[14px] sm:text-[13px] text-[11px] text-center text-[var(--primary_text_color)] font-[500]'>
                            Top Rated products are not available currently
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}
