import React, { useEffect, useRef } from 'react'
import $, { param } from 'jquery';
import 'dropify/dist/js/dropify.min.js';
import 'dropify/dist/css/dropify.min.css';

export default function ComapanyProfile() {
    let inputRef = useRef(null)  //for dropify reset

    useEffect(() => {
        $('.dropify').dropify({
            messages: {
                'default': 'Image',
                'replace': '',
                'remove': 'Remove',
                'error': 'Sorry, this file is too large',
            },

        });
    }, [])

    return (
        <div>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-800'>/ Company Profile</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50 rounded-[8px_8px_0px_0px]'>
                        <h2 className='text-[22px] font-medium'> Company Profile</h2>
                    </div>

                    <form className='py-[20px] px-[20px] rounded-[5px]'>
                        <div className='grid grid-cols-[35%_65%] gap-4'>
                            <div className='mb-[10px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Company Image</label>
                                <div className='border-2 border-gray-200 rounded-[6px]'>
                                    <input type="file" ref={inputRef} id='imageInput' name='categoryImage' className="dropify" data-height="300" />
                                </div>
                            </div>
                            <div className='px-[10px]'>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Company Name*</label>
                                    <input type="text" placeholder='Enter Company Name' name='companyName' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                                <div className='mb-[20px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Email*</label>
                                    <input type="email" placeholder='Enter Email' name='companyEmail' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                                <div className='mb-[70px]'>
                                    <label htmlFor="" className='pb-[6px] block font-medium'>Phone Number*</label>
                                    <input type="text" placeholder='Enter Phone Number' name="companyPhone" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                                </div>
                            </div>
                        </div>
                        <textarea name="companyAddress" id="" placeholder='Company Address' className='w-[100%] h-[90px] border-[1px] border-gray-500 rounded-[5px] resize-none px-3 py-1 mb-3'></textarea>
                        <textarea name="companyAddress" id="" placeholder='Google Map URL' className='w-[100%] h-[90px] border-[1px] border-gray-500 rounded-[5px] resize-none px-3 py-1 mb-3'></textarea>
                        <div className='w-[100%] h-[200px] border-[1px] border-gray-500 rounded-[5px]'>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d114484.26140712612!2d72.94809350494357!3d26.27356648048276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d26.3498892!2d73.0713464!4m5!1s0x39418c37b277d1c3%3A0x1412272be9646840!2sFirst%20Floor%2C%20Laxmi%20Tower%2C%20Bhaskar%20Cir%2C%20Ratanada%2C%20Jodhpur%2C%20Rajasthan%20342001!3m2!1d26.27359!2d73.030495!5e0!3m2!1sen!2sin!4v1749890661749!5m2!1sen!2sin" className='w-[100%] h-[100%] rounded-[5px]' allowFullScreen='' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className='my-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>Update Company Profile</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
