import { store } from '@/app/store/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function MyProfile() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store)=>store.login.token)


    let [formData, setFormData] = useState({
        userName : '',
        userEmail : '',
        userPhone : '',
        userAddress : '',
        userGender : ''
    })

    let getUserData = ()=>{
        axios.post(`${apiBaseUrl}user/data`,{},{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res)=>res.data)
        .then((finalRes)=>{
            setFormData({
                userName : finalRes.user[0].userName,
                userEmail : finalRes.user[0].userEmail,
                userPhone : finalRes.user[0].userPhone,
                userAddress : finalRes.user[0].userAddress,
                userGender : finalRes.user[0].userGender,
            })
            
        })
    }

    let updateProfile = (e) =>{
        e.preventDefault()
        let obj = {
            name : e.target.name.value,
            address : e.target.address.value,
            gender : e.target.gender.value
        }     

        axios.put(`${apiBaseUrl}user/update-profile`,obj,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){                
                alert(finalRes.msg)
            }
            else{
                alert(finalRes.msg)
            }
            
        })
    }

    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div className='myprofile'>
            <div className=''>
                <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                    My Profile
                </h3>
                <div className='changePassword_form'>
                    <form onSubmit={updateProfile} className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <div className='inline-flex items-center myprofile'>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['userGender'] = e.target.value
                                    setFormData(obj)
                                }} type="radio" checked={formData.userGender=='male'} name='gender'value='male' placeholder='' className='accent-blue-500' />
                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] ml-1.5'>
                                    Mr.
                                </label>
                            </div>
                            <div className='inline-flex items-center myprofile ml-5'>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['userGender'] = e.target.value
                                    setFormData(obj)
                                 }} type="radio" name='gender' checked={formData.userGender=='female'}  value='female' placeholder='' className='accent-blue-500' />
                                <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] ml-1.5'>
                                    Mrs.
                                </label>
                            </div>

                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                Name *
                            </label>
                            <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['userName'] = e.target.value
                                    setFormData(obj)
                             }} type="text" name='name' value={formData.userName} placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Name is required and cannot be empty
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                Email *
                            </label>
                            <input type="email" name='email' value={formData.userEmail} readOnly placeholder='Email Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Email Address is required and cannot be empty
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Please enter a valid email address
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                Mobile Number *
                            </label>
                            <input type="text" value={formData.userPhone} readOnly name='phone' placeholder='Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Mobile Number is required and cannot be empty
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                Address *
                            </label>
                            <textarea onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['userAddress'] = e.target.value
                                    setFormData(obj)
                             }} type="text" value={formData.userAddress} name='address' placeholder='' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0'>
                            </textarea>
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
    )
}
