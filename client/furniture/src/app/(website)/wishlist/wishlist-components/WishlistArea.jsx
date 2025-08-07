import Link from 'next/link'
import React from 'react'
import { ImBin } from 'react-icons/im'

export default function WishlistArea() {
    return (
        <div className='w-[100%]'>

            <div className='max-w-[1320px] mx-auto'>
                <div className='cart-table  mt-[2px] lg:mb-[70px] mb-[30px]'>
                    <table className='w-[100%] border-[0.1px] border-gray-200'>
                        <thead className='bg-[rgb(242,242,242)]'>
                            <tr>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Delete
                                </th>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Image
                                </th>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Product
                                </th>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Price
                                </th>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Stock Status
                                </th>
                                <th className='lg:text-[18px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                    Add To Cart
                                </th>
                            </tr>
                        </thead>

                        <tbody className='border-[0.1px] border-gray-200'>
                            <tr className=''>
                                <td className=' text-center lg:p-[10px] p-[5px] border-[0.1px] border-gray-200'>
                                    <ImBin className='lg:text-[18px] text-[14px] leading-[24px] font-[700] font-[font-playfair] text-[var(--secondary_text_color)] inline-table cursor-pointer' />
                                </td>
                                <td className='max-w-[100px] min-w-[70px] lg:p-[10px] p-[5px] border-[0.1px] border-gray-200'>
                                    <Link href={'#'}>
                                        <img src="/images/16253179270591620747711033Hardwell Temple Prayer Unit__.jpg" alt="" />
                                    </Link>
                                </td>
                                <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200'>
                                    <Link href={'#'} className='lg:text-[16px] text-[11px] lg:leading-[24px] leading-[18px] font-[500] font-[font-playfair] text-[var(--primary_text_color)] hover:text-[var(--secondary_text_color)] duration-300'>
                                        Gloria Shoe Racks
                                    </Link>
                                </td>
                                <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200 lg:text-[16px] text-[12px] lg:leading-[24px] leading-[18px] font-[600] font-[font-playfair] text-[var(--primary_text_color)]'>
                                    Rs. 2,900
                                </td>
                                <td className='lg:p-[10px] max-w-[100px] lg:text-[15px] text-[12px] lg:leading-[24px] leading-[18px] text-[var(--primary_text_color)] font-[600] text-center p-[5px] border-[0.1px] border-gray-200 capitalize'>
                                    Out of stock
                                </td>
                                <td className='text-center '>
                                    <button className='lg:py-[10px] py-[7px] lg:w-[120px] w-[90px] lg:leading-[18px] leading-[16px] font-[700] uppercase lg:text-[12px] text-[9px] text-white rounded-[4px] hover:bg-[var(--primary_text_color)] bg-[var(--secondary_text_color)] duration-300'>
                                        Add To Cart
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <div>
                <figure>
                    <img src="/images/wishlist-Empty.jpg" className='mx-auto lg:w-[324px] sm:w-[280px] w-[180px]' alt="" />
                </figure>
                <div className='lg:text-[14px] text-[12px] leading-[24px] font-[500] text-[var(--gray_text_color)] text-center'>
                    Your wishlist is empty!
                </div>
            </div> */}
        </div>
    )
}
