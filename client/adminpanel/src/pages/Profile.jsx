import React, { useEffect, useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import { MdOutlinePhoneAndroid } from 'react-icons/md'
import $ from 'jquery';
import 'dropify/dist/js/dropify.min.js';
import 'dropify/dist/css/dropify.min.css';

export default function Profile() {
    let preview = 'https://archive.org/download/instagram-plain-round/instagram%20dip%20in%20hair.jpg'
    let [active, setActive] = useState(1)
    let [selectedFile, setSelectedFile] = useState(preview)

    let handleFile = (e) =>{
        let file = e.target.files[0]
        if(file){
            setSelectedFile(URL.createObjectURL(file))
        }
    }

   
return (
    <div>
        <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
            <div className='font-medium text-gray-600'>Home / <span className='text-gray-800'>Profile</span>
            </div>
        </div>

        <div className='px-[20px] py-[20px]'>
            <div className='grid grid-cols-[25%_auto] items-start gap-[15px] rounded-[5px]'>
                <div className=' pt-[30px] pb-[20px] border-[0.1px] border-gray-200 rounded-[10px] shadow-lg'>
                    <div className='mb-18 flex flex-col items-center'>
                        <img src="/images/59c32aee-61e4-4868-b27c-e9339ab54e9a-1670132624.jpg" className='w-[75px] h-[75px] rounded-full' alt="" />
                        <span className='text-center text-[14px] text-gray-900 font-medium mt-2 block'>Admin</span>
                    </div>

                    <div className='px-5'>
                        <h2 className='text-[15px] text-gray-900 font-medium mb-2'>Contact Information</h2>
                        <div className='flex gap-2 items-center text-[14px] mb-1'>
                            <MdOutlinePhoneAndroid /> 9876543210
                        </div>
                        <div className='flex gap-2 items-center text-[14px] mb-1'>
                            <IoMdMail /> xyz@gmail.com
                        </div>
                    </div>
                </div>
                <div className=' py-[30px] px-[20px] border-[0.1px] border-gray-200 rounded-[10px] shadow-lg'>
                    <div className='flex gap-7 border-b-[0.1px] border-b-gray-300'>
                        <h2 onClick={()=>setActive(1)} className={`text-[18px] text-center text-gray-700 font-medium w-[110px] cursor-pointer ${active===1 ? 'border-b-[4px] border-b-violet-600' : '' }`}>
                            Edit Profile
                        </h2>
                        <h2 onClick={()=>setActive(2)} className={`text-[18px] text-center text-gray-700 font-medium w-[160px] cursor-pointer ${active===2 ? 'border-b-[4px] border-b-violet-600' : '' }`}>
                            Change Password
                        </h2>
                    </div> 
                    {active===1 ?
                      <form className='grid grid-cols-[35%_65%] gap-3 mt-6'>
                        <div className='mb-[10px] overflow-hidden'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Profile Image</label>

                            <div className='border-1 border-gray-200 p-2 rounded-[6px]'>
                            {selectedFile && (
                                <img src={selectedFile} alt='Preview' className='w-[180px] h-[180px]'/>
                            )}

                                <input onChange={handleFile} type="file" id='profileImg' name='categoryImage' className=" py-3"/>
                            </div>
                        </div>
                        <div className='px-[10px]'>
                            <div className='mb-[16px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'> Name</label>
                                <input type="text" placeholder='Enter Name' name='categoryName' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[16px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Email</label>
                                <input type="text" placeholder='Enter Email' name="categoryOrder" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className=''>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Mobile Number</label>
                                <input type="text" placeholder='Enter Mobile Number' name="categoryOrder" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>

                        <div className=''>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'> Update Profile</button>
                        </div>
                    </form>
                    :
                    <form className='mt-6'>
                        <div className='px-[10px]'>
                            <div className='mb-[16px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'> Current Password</label>
                                <input type="text" placeholder='Current Password' id='currentPassword' name='currentPassword' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[16px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>New Password</label>
                                <input type="text" placeholder='New Password' name="newPassword" id="newPassword" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Confirm Password</label>
                                <input type="text" placeholder='Confirm Password' name="confirmPassword" id="confirmPassword" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'> Update Password</button>
                        </div>
                    </form>
                    }                   
                </div>
            </div>
        </div>
      
    </div>
  )
}
