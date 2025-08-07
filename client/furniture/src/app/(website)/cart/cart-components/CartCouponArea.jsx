import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CartCouponArea({cartData}) {
    let [discount, setDiscount] = useState(100)

    return (
        <div className='w-[100%]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='coupon_area lg:mb-[0px] mb-[40px]'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                        <div className='coupon_code_left'>
                            <div className=' border-[0.1px] border-gray-200'>
                                <h3 className='lg:px-[15px] px-[8px] py-[5px] lg:text-[16px] text-[12px] lg:leading-[37px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] lg:mb-[8px] mb-[5px] uppercase'>
                                    coupon
                                </h3>
                                <div className='coupan_inner lg:px-[20px] px-[10px] lg:pt-[10px] pt-[5px] lg:pb-[25px] pb-[15px]'>
                                    <p className='lg:mb-[20px] mb-[10px] lg:text-[13px] text-[11px] leading-[24px] text-[var(--gray_text_color)]'>
                                        Enter your coupon code, if you have one.
                                    </p>
                                    <form action="">
                                        <input type="text" placeholder='Coupon Code' name='entercode' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[18px] lg:px-[20px] px-[10px] lg:mr-[20px] mr-[10px] border-[0.1px] border-gray-200 lg:h-[42px] h-[36px] outline-0' />
                                        <button type='submit' className='lg:text-[12px] text-[9px] font-[600] uppercase leading-[18px] lg:px-[15px] px-[10px] lg:py-[10px] py-[8px] text-white bg-[var(--dark_bg_color)] rounded-[4px] hover:bg-[var(--bg_color)] duration-300'>
                                            Apply coupon
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <span className='lg:text-[12px] text-[10px] lg:leading-[24px] leading-[16px] text-red-600 hidden'>
                                Enter code  is required
                            </span>
                        </div>

                        <div className='coupon_code_left'>
                            <div className=' border-[0.1px] border-gray-200'>
                                <h3 className='lg:px-[15px] px-[8px] py-[5px] lg:text-[16px] text-[12px] lg:leading-[37px] leading-[26px] font-[600] font-[font-playfair] text-white bg-[var(--dark_bg_color)] lg:mb-[8px] mb-[5px] uppercase'>
                                    Cart Totals
                                </h3>
                                <div className='coupan_inner lg:px-[20px] px-[10px] lg:pt-[10px] pt-[5px] lg:pb-[25px] pb-[15px]'>
                                    <div className='flex justify-between'>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[14px] text-[12px] font-[600] leading-[24px] text-[var(--primary_text_color)]'>
                                            Subtotal
                                        </p>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[18px] text-[13px] font-[500] leading-[24px] text-[var(--primary_text_color)]'>
                                            Rs. {cartData.reduce((total,obj)=>total+(obj.price*obj.qty),0)}
                                        </p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[14px] text-[12px] font-[600] leading-[24px] text-[var(--primary_text_color)]'>
                                            Discount (-)
                                        </p>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[18px] text-[13px] font-[500] leading-[24px] text-[var(--primary_text_color)]'>
                                            Rs. {discount}
                                        </p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[14px] text-[12px] font-[600] leading-[24px] text-[var(--primary_text_color)]'>
                                            Total
                                        </p>
                                        <p className='lg:mb-[20px] mb-[10px] lg:text-[18px] text-[13px] font-[500] leading-[24px] text-[var(--primary_text_color)]'>
                                            Rs. {cartData.reduce((total,obj)=>total+(obj.price*obj.qty),0)-discount}
                                        </p>
                                    </div>
                                    <div className='flex justify-end'>
                                        <Link href={'/checkout'} className='py-[3px] lg:px-[14px] px-[10px] lg:text-[16px] text-[12px] font-[500] lg:leading-[30px] leading-[24px] text-white bg-[var(--bg_color)] hover:bg-[var(--dark_bg_color)] duration-300 rounded-[4px]'>
                                            Proceed to Checkout
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
