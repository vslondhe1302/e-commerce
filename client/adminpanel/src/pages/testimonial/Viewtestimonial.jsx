import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Viewtestimonial() {
    let [search, setSearch] = useState(false)
    let [testimonialData, setTestimonialData] = useState([])
    let [staticPath, setStaticPath] = useState('')

    let [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getTestimonialdata = () =>{
        axios.get(`${apiBaseUrl}testimonial/view`)
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                console.log(finalRes);
                setTestimonialData(finalRes.data)
                setStaticPath(finalRes.staticPath)
                
            }
        })
    }

    useEffect(()=>{
        getTestimonialdata()
    },[])

    let getCheckValue = (e) =>{
        if(e.target.checked && !ids.includes(e.target.value)){
           setIds([...ids,e.target.value]);
        }
        else{
            setIds(ids.filter((v)=>!v.includes(e.target.value)))
        }
    }

    let handleCheckAll = (e) =>{
        if(e.target.checked){
            let allIds = testimonialData.map((items)=>items._id)
            setIds(allIds)
        }
        else{
            setIds([])
        }
        
    }

    useEffect(()=>{
        if(testimonialData.length>=1){
            if(testimonialData.length == ids.length){
                setSelectAll(true)
            }
            else{
                setSelectAll(false)
            }
        }
    },[ids])

    let deleteTestimonial = () =>{
        axios.post(`${apiBaseUrl}testimonial/delete`,{ids})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
            console.log(finalRes);
            getTestimonialdata()
            toast.success(finalRes.msg)
            setIds([])
            }
            else{
                toast.error(finalRes.msg)
            }
            
        })
    }

    let changeStatus = () =>{
        axios.post(`${apiBaseUrl}testimonial/change-status`,{ids})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                toast.success(finalRes.msg)
                getTestimonialdata()
            }
            else{
                toast.error(finalRes.msg)
            }
        })
    }
    

    return (
        <div>
            <ToastContainer/>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Testimonial /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div >
                <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                    <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                        <input type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                        <button className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                    </div>
                </div>
                <div className='px-[20px] py-[20px]'>
                    <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                        <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                            <h2 className='text-[22px] font-medium'>View Testimonial</h2>
                            <div className='flex gap-[10px]'>
                                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                    {search ?
                                        <MdFilterAltOff />
                                        : <MdFilterAlt />}

                                </button>
                                <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>
                                    Change Status
                                </button>
                                <button onClick={deleteTestimonial} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className=' rounded-[10px] bg-gray-800'>
                            <div className='grid grid-cols-[30%_70%] justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                                <div className='flex gap-6 items-center'>
                                    <input onChange={handleCheckAll} type="checkbox" checked={selectAll} value={selectAll} className='scale-140' />
                                    <h3 className='text-gray-400 uppercase text-[13px] font-bold'>name</h3>
                                </div>
                                <div className='grid grid-cols-12 uppercase text-gray-400 font-bold text-[13px]'>
                                    <h2 className='text-center  col-span-2'>Image </h2>
                                    <h2 className='text-center  col-span-2'>Designation</h2>
                                    <h2 className='text-center  col-span-2'>rating </h2>
                                    <h2 className='text-center  col-span-2'>Order </h2>
                                    <h2 className='text-center  col-span-2'>status</h2>
                                    <h2 className='text-center  col-span-2'>action</h2>
                                </div>
                            </div>

                            {testimonialData.length!=0 ?
                             testimonialData.map((items,index)=>(
                            <div key={index} className='grid grid-cols-[30%_70%] justify-between items-center p-[20px]'>
                                <div className='flex gap-6 items-center'>
                                    <input onChange={getCheckValue} type="checkbox" checked={ids.includes(items._id)} value={items._id} className='scale-140' />
                                    <h3 className='text-gray-400 uppercase text-[13px] font-medium'>
                                        {items.testimonialName}
                                    </h3>
                                </div>
                                <div className='grid  grid-cols-12 items-center font-medium text-gray-400 text-[14px]'>
                                    <h2 className='text-center col-span-2'>
                                        <img src={staticPath+items.testimonialImage} alt="" className='w-[40px] mx-auto ' />
                                    </h2>
                                    <h2 className='text-center col-span-2'>{items.testimonialDesignation}</h2>
                                    <h2 className='text-center col-span-2'>{items.testimonialRating} </h2>
                                    <h2 className='text-center col-span-2'>{items.testimonialOrder} </h2>
                                    <div className='text-center col-span-2'>
                                    
                                    {items.testimonialStatus ?
                                        <button className='bg-green-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>
                                            Active
                                        </button>
                                        :
                                        <button className='bg-red-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>
                                            Deactive
                                        </button>
                                    }
                                    </div>
                                    <div className='text-center col-span-2'>
                                        <button className='w-[40px] h-[40px] bg-blue-500 mx-auto text-white flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                    </div>
                                </div>
                            </div>
                              ))
                            :
                            <div className=''>
                                <div className='flex justify-between items-center px-[20px] py-[15px] text-white'> No Data Found</div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
