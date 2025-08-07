"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userData } from '@/app/slice/userSlice';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '@/app/config/firebaseConfig';
import { fetchCart } from '@/app/slice/cartSlice';

export default function LogInArea() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let dispatch = useDispatch()
    console.log(dispatch);


    let userRegister = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)

        axios.post(`${apiBaseUrl}user/register`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                e.target.reset()

            })
    }

    let userLogin = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)

        axios.post(`${apiBaseUrl}user/login`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                if (finalRes.status) {
                    dispatch(userData({ user: finalRes.user, token: finalRes.token }))
                    redirect('/my-dashboard')
                    dispatch(fetchCart())
                    alert(finalRes.msg)
                }
                else {
                    alert(finalRes.msg)
                }
            })
    }
    
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    let googleLogIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)

                let insertObj = {
                    name: user.displayName,
                    email: user.email,
                    phone: user.user
                }

                axios.post(`${apiBaseUrl}user/google-login`, insertObj)
                    .then((res) => res.data)
                    .then((finalRes) => {
                        if (finalRes.status) {
                            alert(finalRes.msg)
                            dispatch(userData({ user: finalRes.user, token: finalRes.token }))
                            dispatch(fetchCart())
                            redirect('/my-dashboard')
                        }
                        else {
                            alert(finalRes.msg)
                        }
                    })

            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <div className='w-[100%] pb-[40px]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='grid lg:grid-cols-2 grid-cols-1 gap-[24px]'>
                    <div className='login_form'>
                        <div className=''>
                            <h2 className='lg:text-[30px] text-[20px] lg:leading-[22px] leading-[18px] font-[500] text-[var(--primary_text_color)] font-[font-playfair] lg:mb-[34px] mb-[18px] capitalize'>
                                login
                            </h2>
                            <form onSubmit={userLogin} className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                        Email / User Name *
                                    </label>
                                    <input type="email" name='email' placeholder='User Name / Email Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Email Address is required and cannot be empty
                                    </p>
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Please enter a valid email address
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                        Password *
                                    </label>
                                    <input type="password" name='password' placeholder='Password' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Password is required and cannot be empty
                                    </p>
                                </div>
                                <div className='flex justify-between lg:mb-[20px] mb-[12px]'>
                                    <Link href={'#'} className=' lg:text-[13px] text-[11px] lg:leading-[39px] leading-[26px] text-[var(--secondary_text_color)] cursor-pointer'>
                                        Forgot your password?
                                    </Link>
                                    <button type='submit' className='py-[5px] lg:px-[20px] px-[12px] bg-[var(--bg_color)] lg:leading-[21px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-full hover:bg-[var(--primary_text_color)] duration-300 lg:h-[34px] h-[24px]'>
                                        login
                                    </button>
                                </div>
                                <div className='lg:my-[16px] my-[10px] w-[100%] mx-auto flex items-center justify-center'>
                                    <div className='w-[250px] h-[2px] bg-linear-to-l from-[rgba(0,0,0,0.2)] to-[rgb(255,255,255)]'></div>
                                    <div className='lg:text-[14px] text-[11px] leading-[14px] text-[var-(--gray_text_color)] lg:px-[12px] px-[8px]'>or</div>
                                    <div className='w-[250px] h-[2px] bg-linear-to-r from-[rgba(0,0,0,0.2)] to-[rgb(255,255,255)]'></div>

                                </div>
                                <div className='lg:mb-[12px] mb-[8px]'>
                                    <button onClick={googleLogIn} type='button' className='py-[5px] lg:px-[20px] px-[10px] lg:leading-[21px] leading-[16px] font-[600] capitalize lg:text-[12px] text-[9px] rounded-full  hover:bg-[var(--secondary_text_color)] duration-300 lg:h-[39px] h-[30px] w-[380px] mx-auto border-[0.1px] border-gray-400 flex items-center justify-center cursor-pointer'>
                                        <FcGoogle className=' lg:text-[18px] text-[13px] lg:leading-[21px] leading-[16px] lg:mr-[20px] mr-[12px]' />
                                        login with google
                                    </button>
                                </div>
                                <div className=''>
                                    <button type='button' className='py-[5px] lg:px-[20px] px-[10px] lg:leading-[21px] leading-[16px] font-[600] capitalize lg:text-[12px] text-[9px] rounded-full  hover:bg-[var(--secondary_text_color)] duration-300 lg:h-[39px] h-[30px] w-[380px] mx-auto border-[0.1px] border-gray-400 flex items-center justify-center cursor-pointer'>
                                        <FaGithub className=' lg:text-[18px] text-[13px] lg:leading-[21px] leading-[16px] lg:mr-[20px] mr-[12px]' />
                                        login with github
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='register_form'>
                        <div className=''>
                            <h2 className='lg:text-[30px] text-[20px] lg:leading-[22px] leading-[18px] font-[500] text-[var(--primary_text_color)] font-[font-playfair] lg:mb-[34px] mb-[18px] capitalize'>
                                register
                            </h2>
                            <form onSubmit={userRegister} className='lg:px-[20px] px-[12px] lg:pt-[23px] pt-[11px] lg:pb-[29px] pb-[14px] border-[0.1px] border-gray-200 rounded-[4px]'>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                        Name *
                                    </label>
                                    <input type="text" name='name' placeholder='Name' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Name is required and cannot be empty
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                        Email *
                                    </label>
                                    <input type="email" name='email' placeholder='Email Address' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
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
                                    <input type="text" name='phone' placeholder='Mobile Number' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Mobile Number is required and cannot be empty
                                    </p>
                                </div>
                                <div className='lg:mb-[20px] mb-[12px]'>
                                    <label className='lg:text-[14px] text-[12px] lg:leading-[18px] leading-[16px] text-[var(--primary_text_color)] font-[500] lg:mb-[10px] mb-[6px] block'>
                                        Password *
                                    </label>
                                    <input type="password" name='password' placeholder='Password' className='lg:text-[14px] text-[12px] lg:leading-[24px] leading-[20px] text-[var(--gray_text_color)] lg:px-[20px] px-[12px] lg:h-[45px] h-[32px] w-[100%]  border-[0.1px] border-gray-200 outline-0' />
                                    <p className='hidden lg:text-[12px] text-[9px] lg:leading-[24px] leading-[16px] text-red-500'>
                                        Password is required and cannot be empty
                                    </p>
                                </div>
                                <div className='flex justify-end'>
                                    <button type='submit' className='py-[5px] lg:px-[20px] px-[12px] bg-[var(--bg_color)] lg:leading-[21px] leading-[16px] font-[600] uppercase lg:text-[12px] text-[9px] text-white rounded-full hover:bg-[var(--primary_text_color)] duration-300 lg:h-[34px] h-[24px]'>
                                        register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
