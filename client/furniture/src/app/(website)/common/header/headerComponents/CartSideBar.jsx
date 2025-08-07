import { store } from '@/app/store/store'
import Link from 'next/link'
import React from 'react'
import { FaXmark } from 'react-icons/fa6'
import { HiMiniXMark } from 'react-icons/hi2'
import { useSelector } from 'react-redux'

export default function CartSideBar({cartSideBar,setCartSideBar}) {
    let cart = useSelector((store) => store.cart.cart)
    let imagePath = useSelector((store) => store.cart.imagePath)
console.log(cart);

    return (
        <div>
            {cart &&
            cart.map((items,index)=>(
                    <div key={index} className='lg:px-4 lg:py-4 py-3'>
                        <div className='flex justify-between items-center pb-3 mb-4 border-b-1 border-gray-200'>
                            <span className='lg:text-[22px] text-[20px] lg:leading-[28px] leading-[26px] font-[700] font-[font-playfair] text-gray-600'>Cart</span>
                            <span onClick={() => setCartSideBar(0)} className='lg:text-[20px] text-[20px] lg:leading-[28px] leading-[26px] font-[900] font-[font-playfair] text-gray-600 cursor-pointer block'>
                                <FaXmark />
                            </span>
                        </div>
                        <div className='flex gap-4 pb-4 mb-4 border-b-1 border-b-gray-200'>
                            <figure className='lg:w-[32%] '>
                                <img src={imagePath+items.image} alt="" />
                            </figure>
                            <div className='lg:w-[60%]'>
                                <div className='lg:text-[15px] text-[13px] leading-[20px] font-[600] font-[font-playfair] text-gray-600 tracking-normal'>
                                    {items.title}
                                </div>
                                <span className='lg:text-[14px] text-[12px] leading-[20px] font-[600] text-gray-600 block'>
                                    Qty : {items.qty}
                                </span>
                                <span className='lg:text-[14px] text-[12px] leading-[20px] font-[600] text-[var(--secondary_text_color)]'>
                                    Rs. {Number(items.price).toLocaleString()}
                                </span>
                            </div>
                            <span className='lg:text-[18px] text-[16px] lg:leading-[28px] leading-[26px] text-gray-700 cursor-pointer'>
                                <HiMiniXMark />
                            </span>
                        </div>
                        <div className='flex justify-between items-center mb-7'>
                            <div className='lg:text-[15px] text-[13px] leading-[20px] font-[600] text-gray-700'>
                                Subtotal :
                            </div>
                            <span className='lg:text-[15px] text-[13px] leading-[20px] font-[600] text-gray-700'>
                                Rs. {Number(items.price).toLocaleString()}
                            </span>
                        </div>
                        <div className='bg-gray-950 p-5'>
                            <div>
                                <Link href={'/pages/cart'} className='lg:text-[14px] text-[12px] leading-[40px] font-[500] text-white text-center bg-gray-900 rounded-[4px] uppercase mb-3 tracking-[0.6px] block'>
                                    View Cart
                                </Link >
                            </div>
                            <div>
                                <Link href={'/pages/checkout'} className='lg:text-[14px] text-[12px] leading-[40px] font-[500] text-white text-center bg-[var(--bg_color)] rounded-[4px] uppercase tracking-[0.6px] block'>
                                    checkout
                                </Link >
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    )
}
