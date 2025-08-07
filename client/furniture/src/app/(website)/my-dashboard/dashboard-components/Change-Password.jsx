import { loginSlice } from '@/app/slice/userSlice'
import { store } from '@/app/store/store'
import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ChangePassword() {
    
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store)=>store.login.token)


    let ChangePassword = (e) =>{
        e.preventDefault()
        let oldPassword = e.target.currentPassword.value
        let newPassword = e.target.newPassword.value
        let confirmPassword = e.target.confirmPassword.value

        let obj = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        axios.post(`${apiBaseUrl}user/change-password`,obj,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                alert(finalRes.msg);
                e.target.reset()
                
            }else{
                alert(finalRes.msg);
                
            }
            
        })
        
    }
    return (
        <div className='change-password'>
            <div className=''>
                <h3 className='lg:text-[22px] text-[16px] font-[700] lg:leading-[30px] leading-[24px] text-[var(--primary_text_color)] font-[font-playfair] capitalize lg:mb-[15px] mb-[10px] '>
                    Change Password
                </h3>
                <div className='changePassword_form'>
                    <form onSubmit={ChangePassword} className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                current password
                            </label>
                            <input type="password" name='currentPassword' placeholder='Current Password' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Current Password is required and cannot be empty.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                new password
                            </label>
                            <input type="password" name='newPassword' placeholder='New Password' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                New Password is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Password should be atleast 8 characters long.
                            </p>
                        </div>
                        <div className='lg:mb-[20px] mb-[12px]'>
                            <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block capitalize'>
                                confirm password
                            </label>
                            <input type="password" name='confirmPassword' placeholder='Confirm Password' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                Confirm Password is required and cannot be empty.
                            </p>
                            <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                New Password and Confirm Password not matched !
                            </p>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='py-[5px] lg:px-[20px] px-[12px] bg-[var(--bg_color)] lg:leading-[21px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-full hover:bg-[var(--primary_text_color)] duration-300 lg:h-[34px] h-[24px]'>
                                change password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
