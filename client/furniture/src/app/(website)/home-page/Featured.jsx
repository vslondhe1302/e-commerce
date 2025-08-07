"use client"
import { fetchCart } from '@/app/slice/cartSlice';
import { store } from '@/app/store/store';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';

export default function Featured({ productType, setProductType, productData, staticPath }) {

    return (
        <div>
            <div className='w-[100%] px-[10px]'>
                <div className='max-w-[1320px] mx-auto'>
                    <div className='w-[100%] mb-[35px] featured'>
                        <ul className='flex sm:flex-row flex-col justify-center items-center'>
                            <li onClick={() => setProductType(1)} className={`${productType == 1 ? 'active' : ''} ml-[-2px] before lg:w-[160px] w-[140px] text-center sm:border-[2px] border-[1px] border-gray-300 text-[var(--gray_text_color)] duration-300 relative`}>
                                <Link href={'#'} onClick={(e) => { e.preventDefault() }} className='lg:px-[30px] lg:text-[20px] text-[14px] lg:leading-[48px] leading-[30px] font-[font-playfair] font-[700] '>Featured</Link>
                            </li>
                            <li onClick={() => setProductType(2)} className={`${productType == 2 ? 'active' : ''} ml-[-2px] lg:w-[185px] w-[140px]  text-center sm:border-[2px] border-[1px] border-gray-300  text-[var(--gray_text_color)] duration-300`}>
                                <Link href={'#'} onClick={(e) => { e.preventDefault() }} className='lg:px-[30px]  lg:text-[20px] text-[14px] lg:leading-[48px] leading-[30px] font-[font-playfair] font-[700] '>New Arrivals</Link>
                            </li>
                            <li onClick={() => setProductType(3)} className={`${productType == 3 ? 'active' : ''} ml-[-2px] lg:w-[160px] w-[140px] text-center after sm:border-[2px] border-[1px] border-gray-300 text-[var(--gray_text_color)] duration-300 relative`}>
                                <Link href={'#'} onClick={(e) => { e.preventDefault() }} className='lg:px-[30px]  lg:text-[20px] text-[14px] lg:leading-[48px] leading-[30px] font-[font-playfair] font-[700] '>Onsale</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='mb-5'>
                        {productData.length != 0 ?
                            productData.map((items, index) => {
                                return (
                                    <div key={index} className='w-[100%] grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 lg:gap-[24px] sm:gap-[18px] gap-[14px]'>
                                        <FeaturedItems items={items} staticPath={staticPath} />
                                    </div>
                                )

                            })
                            :
                            <div key={1} className='text-center '>
                                <span className='lg:text-[16px] sm:text-[15px] text-[13px] text-center text-[var(--primary_text_color)] font-[500]'>
                                    This products are not available currently
                                </span>
                            </div>

                        }

                    </div>
                </div>
            </div>

        </div>
    )
}

function FeaturedItems({ items, staticPath }) {
    let salePrice = items.salePrice
    let actualPrice = items.actualPrice
    let discountPrice = Number(actualPrice) - Number(salePrice)
    let discountPercent = ((discountPrice * 100) / actualPrice).toFixed(2)

    let formattedSalePrice = Number(salePrice).toLocaleString()
    let formattedActualPrice = Number(actualPrice).toLocaleString()


    let user = useSelector((store) => store.login.user)
    let token = useSelector((store) => store.login.token)
    let [color, setColor] = useState(items.productColor[0]._id)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let cart = useSelector((store) => store.cart.cart)

    let [addWishlist, setAddWishlist] = useState(false)

    let dispatch = useDispatch()

    let addToCart = () => {
        if (user) {
            let obj = {
                id: items._id,
                image: items.productImage,
                price: items.salePrice,
                title: items.productName,
                qty: 1,
                color,
            }

            axios.post(`${apiBaseUrl}cart/add-to-cart`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    if (finalRes.status) {
                        alert(finalRes.msg)
                        dispatch(fetchCart())
                    }
                    else {
                        alert(finalRes.msg)
                    }

                })

        }
        else {
            alert("Please login first")
        }
    }
    return (
        <>
            <div className='max-w-[1320px] mx-auto lg:shadow-[0px_0px_35px_0px_rgba(0,0,0,0.3)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] border-[0.1px] border-gray-200 rounded-[4px] lg:pb-[30px] pb-[20px] lg:mb-[0px] mb-[16px]'>
                <Link href={`/product/${items.slug}`}>
                    <img src={staticPath + items.productImage} alt="" className='rounded-[4px]' />
                </Link>
                <div className='product-content w-[100%] mt-[8px]'>
                    <div className='lg:mb-[10px] text-center'>
                        <p className='lg:text-[13px] text-[11px] font-[500] text-[var(--gray_text_color)] lg:leading-[24px]'>{items.subSubCategory.subSubCategoryName}
                        </p>
                    </div>
                    <h3 className='lg:pb-[15px] pb-[10px] lg:mb-[13px] mb-[8px] text-center relative'>
                        <Link href={`/product/${items.slug}`} className='heading lg:text-[16px] text-[14px] text-[var(--primary_text_color)] leading-[22px] font-[700] font-[font-playfair] hover:text-[var(--secondary_text_color)] duration-300'>
                            {items.productName}
                        </Link>
                    </h3>
                    <div className='text-center'>
                        <span className=' lg:text-[16px] text-[12px] font-[500] text-[var(--secondary_text_color)] lg:leading-[24px]'>
                            Rs. {formattedSalePrice}
                        </span>
                        <span className='ml-[6px] lg:text-[14px] text-[12px] leading-[24px] line-through text-[var(--primary_text_color)]'>
                            Rs. {formattedActualPrice}
                        </span>
                        <span className=' lg:text-[13px] text-[10px] lg:ml-2 ml-1.5 font-[500] text-[var(--green_text_color)] lg:leading-[24px]'>
                            {discountPercent}% off
                        </span>
                    </div>
                    <div className='mt-[16px] max-w-[100%]'>
                        <ul className='flex justify-center lg:px-2'>
                            <li className='lg:w-[100px] sm:w-[90px] w-[70px] lg:h-[35px] h-[30px] mr-[5px] flex justify-center items-center cursor-pointer bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 group'>
                                <select onChange={(e) => setColor(e.target.value)} name="" id="" className='lg:text-[12px] h-full w-full text-[10px] text-[var(--gray_text_color)]  font-[500] lg:leading-[35px] group-hover:bg-[var(--bg_color)] group-hover:text-white outline-0'>
                                    {
                                        items.productColor.map((colors, index) => <option key={index} value={colors._id}>{colors.colorName}</option>)
                                    }

                                </select>
                            </li>
                            <li className='lg:w-[35px] w-[30px] lg:h-[35px] h-[30px] mr-[5px] flex justify-center items-center cursor-pointer bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 group relative '>
                                <button onClick={() => setAddWishlist(!addWishlist)} className='lg:text-[20px] text-[16px] lg:leading-[37px] group-hover:text-white'>
                                    {addWishlist ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
                                </button>
                                <div className='absolute bottom-[-50px] right-[0px] bg-white text-[14px] py-2 text-center w-[110px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0 invisible duration-300  group-hover:opacity-[1] group-hover:visible text-[var(--gray_text_color)] cursor-auto'>Add To Wishlist</div>
                            </li>
                            <li className='lg:h-[35px] h-[30px] relative bg-[rgb(241,241,241)] hover:bg-[var(--bg_color)] duration-300 flex items-center group cursor-pointer'>
                                <button onClick={addToCart} className='lg:text-[12px] text-[11px] font-[500] text-[var(--gray_text_color)] group-hover:text-white text-center lg:px-[18px] px-[10px] cursor-pointer'>
                                    {cart.length != 0 ? "Remove Cart" : "Add To Cart"}
                                </button>
                                <div className='absolute bottom-[-50px] right-[-30px] bg-white text-[14px] py-2 text-center w-[100px] shadow-[0px_0px_10px_2px_rgba(0,0,0,0.4)] border-[0.1px] border-gray-200 opacity-0 invisible  duration-300  group-hover:opacity-[1] group-hover:visible text-[var(--gray_text_color)] cursor-auto'>
                                    {cart.length != 0 ? "Remove Cart" : "Add To Cart"}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

