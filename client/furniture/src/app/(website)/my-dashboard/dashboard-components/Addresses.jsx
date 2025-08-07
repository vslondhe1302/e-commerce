import React from 'react'

export default function Addresses() {
  return (
    <div className=''>
        <p className='lg:text-[14px] text-[12px] lg:leading-[24px] font-[400] leading-[18px] text-[var(--gray_text_color)] lg:mb-[16px] mb-[10px]'>
            The following addresses will be used on the checkout page by default.
        </p>
    <div className='addresses grid lg:grid-cols-2 grid-cols-1 gap-4 '>
            <div className=''>
                <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                    Billing Address
                </h3>
                <div className='Billing-address_form'>
                    <form className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Name *
                            </label>
                            <input type="text" name='name' placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Name is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Billing Email
                            </label>
                            <input type="email" name='email' placeholder='Billing Email' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Email is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Please enter a valid Billing email address
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px] addresses'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Billing Mobile Number*
                            </label>
                            <input type="number" name='phone' placeholder='Billing Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Billing Mobile Number is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Please enter valid Billing Mobile Number.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Billing Address*
                            </label>
                            <input type="text" name='address' placeholder='Billing Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                               Billing Address is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                country*
                            </label>
                            <select name='country' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0'>
                                <option value="select">Select Country</option>
                                <option value="india">India</option>
                                <option value="india">USA</option>
                            </select>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                country is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                State*
                            </label>
                            <input type="text" name='state' placeholder='State' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                State is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                City*
                            </label>
                            <input type="text" name='city' placeholder='City' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                City is required and cannot be empty.
                            </p>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='py-[5px] lg:px-[20px] px-[12px] bg-[var(--bg_color)] lg:leading-[21px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-full hover:bg-[var(--primary_text_color)] duration-300 lg:h-[34px] h-[24px]'>
                                update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
         {/* Billing address */}
         
             <div className=''>
                <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                    Shipping Address
                </h3>
                <div className='Shipping-address_form'>
                    <form className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Name *
                            </label>
                            <input type="password" name='name' placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Name is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Shipping Email
                            </label>
                            <input type="password" name='email' placeholder='Shipping Email' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Email is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Please enter a valid Shipping email address
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px] addresses'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Shipping Mobile Number*
                            </label>
                            <input type="number" name='phone' placeholder='Shipping Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Shipping Mobile Number is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Please enter valid Shipping Mobile Number.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                Shipping Address*
                            </label>
                            <input type="text" name='address' placeholder='Shipping Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                               Shipping Address is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                country*
                            </label>
                            <select name='country' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0'>
                                <option value="select">Select Country</option>
                                <option value="india">India</option>
                                <option value="india">USA</option>
                            </select>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                country is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                State*
                            </label>
                            <input type="text" name='state' placeholder='State' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                State is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                City*
                            </label>
                            <input type="text" name='city' placeholder='City' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                City is required and cannot be empty.
                            </p>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='py-[5px] lg:px-[20px] px-[12px] bg-[var(--bg_color)] lg:leading-[21px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-full hover:bg-[var(--primary_text_color)] duration-300 lg:h-[34px] h-[24px]'>
                                update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    </div>
  )
}
