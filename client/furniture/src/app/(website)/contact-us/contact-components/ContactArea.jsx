import React from 'react'
import { FaFax } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMail } from "react-icons/lu";

export default function ContactArea() {
    return (
        <div className='w-[100%] mb-[40px]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-[24px] gap-[14px]'>
                    <div className='contact_message'>
                        <div className=''>
                            <h3 className='lg:text-[21px] text-[15px] font-[700] lg:leading-[20px] leading-[16px] text-[var(--primary_text_color)] lg:mb-[25px] mb-[16px] font-[font-playfair] '>
                                Contact Us
                            </h3>
                            <ul>
                                <li className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:py-[13px] py-[8px] flex items-center border-t-[0.1px] border-gray-200 '>
                                    <FaFax className='lg:text-[14px] text-[12px] lg:leading-[14px] leading-[12px] lg:mr-[10px] mr-[6px]' />
                                    Address : Claritas est etiam processus dynamicus
                                </li>
                                <li className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:py-[13px] py-[8px] flex items-center border-t-[0.1px] border-gray-200 '>
                                    <FaPhoneAlt className='lg:text-[14px] text-[12px] lg:leading-[14px] leading-[12px] lg:mr-[10px] mr-[6px]' />
                                    9781234560
                                </li>
                                <li className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:py-[13px] py-[8px] flex items-center border-t-[0.1px] border-gray-200 '>
                                    <LuMail className='lg:text-[14px] text-[12px] lg:leading-[14px] leading-[12px] lg:mr-[10px] mr-[6px]' />
                                    furniture@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='contact_form'>
                        <div className=''>
                            <h3 className='lg:text-[21px] text-[15px] font-[700] lg:leading-[20px] leading-[16px] text-[var(--primary_text_color)] lg:mb-[25px] mb-[16px] capitalize font-[--font-playfair]'>
                                Tell us your question
                            </h3>
                            <form action="">
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[600] lg:mb-[10px] mb-[6px] block'>
                                    Your Name (required)
                                    </label>
                                    <input type="text" name='name' placeholder='Name *' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Name is required and cannot be empty
                                    </p>
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Name should only consist of alphabets
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[600] lg:mb-[10px] mb-[6px] block'>
                                    Your Email (required)
                                    </label>
                                    <input type="text" name='name' placeholder='Email *' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Email address is required and cannot be empty
                                    </p>
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Please enter a valid email address
                                    </p>
                                   
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[600] lg:mb-[10px] mb-[6px] block'>
                                    Your Mobile Number (required)
                                    </label>
                                    <input type="text" name='name' placeholder='Mobile Number *' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Mobile Number is required and cannot be empty
                                    </p>
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Please enter valid mobile number
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[600] lg:mb-[10px] mb-[6px] block'>
                                    Subject
                                    </label>
                                    <input type="text" name='name' placeholder='Subject *' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Subject is required and cannot be empty
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[600] lg:mb-[10px] mb-[6px] block'>
                                    Your Message
                                    </label>
                                    <textarea type="text" name='name' placeholder='Message *' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:py-[10px] py-[6px] lg:h-[170px] h-[90px] w-[100%]  border-[0.1px] border-gray-200 outline-0 resize-none'></textarea>
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                    Message is required and cannot be empty
                                    </p>
                                </div>

                                <button type='submit' className='lg:text-[14px] text-[12px] lg:leading-[42px] leading-[32px] text-white bg-[var(--dark_bg_color)] hover:bg-[var(--bg_color)] duration-300 rounded-[4px] font-[500] lg:px-[30px] px-[18px]'>
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
