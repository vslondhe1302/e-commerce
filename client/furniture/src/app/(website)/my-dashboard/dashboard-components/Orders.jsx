import Link from 'next/link'
import React from 'react'

export default function Orders() {
    return (
        <div className='orders'>
            <div className=''>
                <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                    Orders
                </h3>
                <div className='table w-full'>
                    <table className='w-[100%] lg:mb-[15px] mb-[10px] border-1 border-[var(--border_color_1)]'>
                        <thead>
                            <tr className='border-b-1 border-b-black bg-gray-100'>
                                <th className='lg:text-[14px] text-[10px] font-[700] font-[font-playfair] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize w-[20%]'>
                                    order
                                </th>
                                <th className='lg:text-[14px] text-[10px] font-[700] font-[font-playfair] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize w-[20%]'>
                                    date
                                </th>
                                <th className='lg:text-[14px] text-[10px] font-[700] font-[font-playfair] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize w-[20%]'>
                                    total
                                </th>
                                <th className='lg:text-[14px] text-[10px] font-[700] font-[font-playfair] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize w-[20%]'>
                                    status
                                </th>
                                <th className='lg:text-[14px] text-[10px] font-[700] font-[font-playfair] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize w-[20%]'>
                                    actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className=''>
                            <tr className=''>
                                <td className='lg:text-[14px] text-[10px] font-[500] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize border-1 border-[var(--border_color_1)] w-[20%]'>
                                    1
                                </td>
                                <td className='lg:text-[14px] text-[10px] font-[500] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize border-1 border-[var(--border_color_1)] w-[20%]'>
                                    May 10, 2018
                                </td>
                                <td className='lg:text-[14px] text-[10px] font-[500] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize border-1 border-[var(--border_color_1)] w-[20%]'>
                                    Completed
                                </td>
                                <td className='lg:text-[14px] text-[10px] font-[500] text-center text-[var(--primary_text_color)] lg:leading-[24px] leading-[20px] p-2 capitalize border-1 border-[var(--border_color_1)] w-[20%]'>
                                    Rs. 25.00 for 1 item
                                </td>
                                <td className=' p-2 border-1 border-[var(--border_color_1)] text-center w-[20%]'>
                                    <Link href={'#'} className='lg:text-[14px] text-[10px] font-[500] text-[var(--secondary_text_color)] capitalize lg:leading-[24px] leading-[20px] cursor-pointer'>
                                        view
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
