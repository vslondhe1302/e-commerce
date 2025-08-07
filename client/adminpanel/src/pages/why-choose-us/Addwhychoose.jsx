import React, { useState } from 'react'


export default function Addwhychoose() {
    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)
    
    return (
        <div>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-300'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Why Choose Us /</span>
                    <span className='text-gray-800'> Add</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>Add Why Choose Us </h2>
                    </div>

                    <form className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-2 rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Choose Image</label>
                            <div className='border-1 border-gray-300 rounded-[6px]'>
                                <img src={preview} alt="" className='rounded-[6px] mx-auto' />
                                <input onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} type="file" name='image' className="p-2" />

                            </div>
                        </div>
                        <div className='px-[10px]'>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Title</label>
                                <input type="text" name='title' placeholder='Title' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input type="text" placeholder='Order' name="order" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[70px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Description</label>
                                <textarea type="text" name="desc" id="" className='px-[12px] w-[100%] h-[90px] resize-none rounded-[6px] text-gray-800 border-2 border-gray-300'>
                                </textarea>
                            </div>
                        </div>

                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>Add Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
