import React, { useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";

export default function Viewwhychoose() {
    let [search, setSearch] = useState(false)

    return (
        <div>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Why Choose Us /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <form >
                <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                    <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                        <input type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                        <button className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                    </div>
                </div>
                <div className='px-[20px] py-[20px]'>
                    <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                        <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                            <h2 className='text-[22px] font-medium'>View Why Choose Us</h2>
                            <div className='flex gap-[10px]'>
                                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                    {search ?
                                        <MdFilterAltOff />
                                        : <MdFilterAlt />}

                                </button>
                                <button className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                                <button className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                            </div>
                        </div>
                        <div className=' rounded-[10px] bg-gray-800'>
                            <div className='flex justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                                <div className='flex gap-6 items-center'>
                                    <input type="checkbox" className='scale-140' />
                                    <h3 className='text-gray-300 uppercase text-[13px] font-medium'>title</h3>
                                </div>
                                <div className='grid grid-cols-10 gap-20 pr-4 uppercase text-gray-300 font-medium text-[14px]'>
                                    <h2 className='text-center  col-span-2'>Image </h2>
                                    <h2 className='text-center  col-span-2'>Description </h2>
                                    <h2 className='text-center  col-span-2'>Order </h2>
                                    <h2 className='text-center  col-span-2'>status</h2>
                                    <h2 className='text-center  col-span-2'>action</h2>
                                </div>
                            </div>
                            <div className='flex justify-between items-center p-[20px]'>
                                <div className='flex gap-6 items-center'>
                                    <input type="checkbox" className='scale-140' />
                                    <h3 className='text-gray-300 uppercase text-[13px] font-medium'>Neil Sims</h3>
                                </div>
                                <div className='grid  grid-cols-10 gap-16 items-center text-gray-300 font-medium text-[14px]'>
                                    <h2 className='text-center col-span-2'>
                                        <img src="/images/iso.png" alt="" className='w-[40px] ' />
                                    </h2>
                                    <h2 className='col-span-2'>CEO of SunPark</h2>
                                    <h2 className='text-center col-span-2'>1 </h2>
                                    <div className='text-center col-span-2'>
                                        <button className='bg-green-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                    </div>
                                    <div className='text-center col-span-2'>
                                        <button className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center p-[20px]'>
                                <div className='flex gap-6 items-center'>
                                    <input type="checkbox" className='scale-140' />
                                    <h3 className='text-gray-300 uppercase text-[14px] font-medium'>Neil Sims</h3>
                                </div>
                                <div className='grid grid-cols-10 gap-16 text-gray-300 font-medium text-[14px]'>
                                    <h2 className='text-center col-span-2'>
                                        <img src="/images/iso.png" alt="" className='w-[40px] ' />
                                    </h2>
                                    <h2 className='col-span-2 text-center'>CEO of SunPark</h2>
                                    <h2 className='text-center col-span-2'>1 </h2>
                                    <div className='text-center col-span-2'>
                                        <button className=' bg-red-400 text-white  text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                    </div>
                                    <div className='text-center col-span-2'>
                                        <button className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
