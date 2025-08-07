"use client"
import { store } from '@/app/store/store';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { ImBin } from "react-icons/im";
import { useSelector } from 'react-redux';

export default function CartArea({ cartData, imagePath }) {
     let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
     let token = useSelector((store)=>store.login.token)
    // let updateCart = () =>{
    //         axios.put(`${apiBaseUrl}cart/update-cart`,{},{
    //             headers : {
    //                 Authorization : `Bearer ${token}`
    //             }
    //         })
    //         .then((res)=>res.data)
    //         .then((finalRes)=>{
    //             console.log(finalRes);
    //             if(finalRes.status){
    //                 alert(finalRes.msg)
    //                 dispatch(fetchCart())
    //             }
    //             else{
    //                 alert(finalRes.msg)
    //             }
                
    //         })

    //     }
    return (
        <div className='w-[100%]'>
            <div className='max-w-[1320px] mx-auto'>
                    <div className='cart-table  mt-[2px] lg:mb-[70px] mb-[30px]'>
                        <table className='w-[100%] border-[0.1px] border-gray-200'>
                            <thead className='bg-[rgb(242,242,242)]'>
                                <tr>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Delete
                                    </th>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Image
                                    </th>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Product
                                    </th>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Price
                                    </th>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Quantity
                                    </th>
                                    <th className='lg:text-[16px] text-[12px] leading-[24px] font-[700] font-[font-playfair] text-[var(--primary_text_color)] text-center lg:p-[10px] p-[5px] lg:border-b-[2.4px] border-b-[2px] border-[var(--border_color)]'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody className='border-[0.1px] border-gray-200'>

                                {cartData.map((items,index)=><CartItems key={index} items = {items} imagePath={imagePath} />)}
                                
                            </tbody>
                        </table>
                        <div className='w-[100%] lg:p-[12px] p-[8px] border-[0.1px] border-gray-200 flex justify-end'>
                            <button type='submit' className='lg:py-[10px] lg:px-[15px] px-[10px] py-[7px] bg-[var(--primary_text_color)] lg:leading-[18px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-[4px] hover:bg-[var(--secondary_text_color)] duration-300'>
                                Update cart
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

function CartItems({items, imagePath}) {
    let [changeQty, setChangeQty] = useState(items.qty)

    return (
        <tr className=''>
            <td className=' text-center lg:p-[10px] p-[5px] border-[0.1px] border-gray-200'>
                <ImBin className='lg:text-[18px] text-[14px] leading-[24px] font-[700] font-[font-playfair] text-[var(--secondary_text_color)] inline-table cursor-pointer' />
            </td>
            <td className='max-w-[80px] min-w-[70px] lg:p-[10px] p-[5px] border-[0.1px] border-gray-200'>
                <Link href={'#'}>
                    <img src={imagePath+items.image} className='w-full' alt="" />
                </Link>
            </td>
            <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200'>
                <Link href={'#'} className='lg:text-[15px] text-[11px] lg:leading-[24px] sm:leading-[20px] leading-[16px] font-[500] font-[font-playfair] text-[var(--primary_text_color)] hover:text-[var(--secondary_text_color)] duration-300'>
                    {items.title} ({items.color.colorName})
                </Link>
            </td>
            <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200 lg:text-[16px] text-[12px] lg:leading-[24px] leading-[18px] font-[600] font-[font-playfair] text-[var(--primary_text_color)]'>
                Rs. {Number(items.price).toLocaleString()}
            </td>
            <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200'>
                <label className='lg:text-[14px] text-[11px] leading-[24px] font-[600] font-[font-playfair] text-[var(--primary_text_color)] mr-[5px]'>Quantity</label>
                <input onChange={(e)=>setChangeQty(e.target.value)} type="number" min="1" max="100" value={changeQty} className='lg:pl-[10px] pl-[6px] pr-[5px] lg:text-[16px] text-[13px] border-[0.1px] border-gray-200 lg:w-[60px] w-[40px] lg:h-[32px] h-[28px] outline-0' />
            </td>
            <td className='lg:p-[10px] max-w-[100px] text-center p-[5px] border-[0.1px] border-gray-200 lg:text-[14px] text-[12px] lg:leading-[24px] leading-[18px] font-[600] font-[font-playfair] text-[var(--primary_text_color)]'>
                Rs. {Number(items.price*changeQty).toLocaleString()}
            </td>
        </tr>
    )
}
