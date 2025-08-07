import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Addtestimonial() {
    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)

    let navigate = useNavigate()

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let addTestimonial = (e) =>{
        e.preventDefault()

        let formValue = new FormData(e.target)

        axios.post(`${apiBaseUrl}testimonial/add`,formValue)
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                console.log(finalRes);
                toast.success(finalRes.msg)
                e.target.reset()
                setPreview(defaultPreview)
                setTimeout(()=>{
                   navigate('/testimonial/view')
                },[2000])
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
                    <span className='text-gray-800'> Add</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>Add Testimonial</h2>
                    </div>

                    <form onSubmit={addTestimonial} className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-4 rounded-[5px]'>
                        <div className='mb-[15px] h-[400px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Choose Image</label>
                            <div className='border-1 border-gray-300 rounded-[5px] overflow-hidden'>
                                <img src={preview} alt="" className='rounded-[5px] mx-auto' />
                                <input onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} type="file" name='testimonialImage' className="p-2" />

                            </div>
                        </div>
                        <div className='pr-[20px]'>
                            <div className='mb-[15px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Name</label>
                                <input type="text" placeholder='Name' name="testimonialName" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[15px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Designation</label>
                                <input type="text" placeholder='Designation' name="testimonialDesignation" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[15px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Rating</label>
                                <input type="number" placeholder='Rating' min={1} max={5} name="testimonialRating" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[15px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input type="number" placeholder='Order' name="testimonialOrder" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[15px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Message</label>
                                <textarea type="text" name="testimonialMessage" id="" className='px-[12px] w-[100%] h-[85px] resize-none rounded-[6px] text-gray-800 border-2 border-gray-300' >
                                </textarea>
                            </div>
                        </div>

                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                                Add Testimonial
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
