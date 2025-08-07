import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function ForgetPassword() {
    let [showOtpInput, setShowOtpInput] = useState(false)
    let [isVerified, setIsVerified] = useState(false)
    let [message, setMessage] = useState('')
    let [error, setError] = useState('')
    let [email, setEmail] = useState('')
    let [otp, setOtp] = useState('')
    let [newPassword, setNewPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let handleSubmit = (e) =>{
        e.preventDefault()
        setError('')
        setMessage('')

        axios.post(`${apiBaseUrl}auth/send-otp`,{email})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                setMessage("OTP has been sent to your email")
                setShowOtpInput(true)

            }
            else{
                setError('Failed to send OTP , Please try again.')
            }
        })
    }

    let handleOtpVerification = (e) =>{
        e.preventDefault()
        setOtp('')
        setError('')
        setMessage('')
        setLoading(true)

    if(otp.length === 6){
        axios.post(`${apiBaseUrl}auth/verify-otp`,{otp})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                setIsVerified(true)
                setMessage("OTP verified successfully. You can now reset your password")
            }
            else{
                setError("Invalid OTP , Please try again.")
            }
            
        })
    }
    else{
        setError("Please enter a valid 6-digit OTP")
    }
    }

    let handleResetPassword = (e) =>{
        e.preventDefault()
        setMessage('')
        setError('')

        if(newPassword !== confirmPassword){
            setError("Confirm password not matched")
            return
        }
        if(newPassword.length<8){
            setError("Password must be at least 8 characters long")
            return
        }

        axios.post(`${apiBaseUrl}auth/reset-password`,{email,newPassword})
        .then((res)=>res.data)
        .then((finalRes)=>{
           if(finalRes.status){
            setMessage("Password has been reset successfully !")
            setTimeout(()=>{
                navigate('/')
            },[2000])
           }
           else{
            setError("Failed to reset password , please try again.")
           }
            
        })
    }



    return (
        <div>
            <div className='max-w-[460px] py-3 mx-auto h-full mt-[100px]'>
                <div className=' px-5 py-5 mt-5 shadow-[0px_10px_20px_2px_rgba(128,128,128,0.2)] border-[0.1px] border-[rgba(128,128,128,0.08)] '>
                    <h2 className='text-[26px] text-center font-bold mb-3'>{isVerified ? "Reset" : "Forget"} Password</h2>
                    <p className='text-[14px] mb-6 text-center'>
                        {!showOtpInput
                            ?
                            "Enter your email address and we'll send you an OTP to reset your password"
                            : !isVerified
                                ?
                                "Enter the OTP sent to your email address."
                                :
                                "Enter your New password."
                        }

                    </p>
                    {!showOtpInput
                        ?
                        (<form onSubmit={handleSubmit} action="" className=''>
                            <div className='mb-6'>
                                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name='email' placeholder='Enter Email address' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px]' />
                            </div>
                            <button type='submit' className='w-[100%] h-[45px] bg-violet-700 hover:bg-violet-600 text-white rounded-[8px] font-medium cursor-pointer'>
                                Send OTP
                            </button>
                        </form>)

                        : !isVerified
                            ?
                                (<form onSubmit={handleOtpVerification} className=''>
                                <div className='mb-6'>
                                    <input onChange={(e)=>setOtp(e.target.value)} value={otp} type="text" name='otp' placeholder='Enter 6-digit OTP' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px]' />
                                </div>
                                <button className='w-[100%] h-[45px] bg-violet-700 hover:bg-violet-600 text-white rounded-[8px] font-medium cursor-pointer'>
                                    Verify OTP
                                </button>
                            </form>)
                            
                            :

                            (<form onSubmit={handleResetPassword} action="" className=''>
                                <div className='mb-4'>
                                    <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="password" name='newPassword' placeholder='Enter New Password' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px]' />
                                </div>
                                <div className='mb-6'>
                                    <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" name='confirmPassword' placeholder='Confirm Password' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px]' />
                                </div>
                                <button className='w-[100%] h-[45px] bg-violet-700 hover:bg-violet-600 text-white rounded-[8px] font-medium cursor-pointer'>
                                    Reset Password
                                </button>
                            </form>)
                    }
                    
                    {message && 
                    <div className=' mt-5 mb-2 w-[100%] py-4 bg-green-100 '>
                        <div className='text-[15px] text-green-900 font-medium text-center '>{message}</div>
                    </div>}

                    {error && 
                    <div className=' mt-5 mb-2 w-[100%] py-4 bg-red-100 '>
                        <div className='text-[15px] text-red-900 font-medium text-center '>{error}</div>
                    </div>}

                    <Link to={'/'} className='block w-[100%] mt-7 text-violet-700 hover:text-violet-600 text-center font-medium cursor-pointer'>
                        Back To Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
