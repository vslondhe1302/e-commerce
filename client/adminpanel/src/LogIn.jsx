import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { loginContext } from './context/MainContext'
import { toast, ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router'

export default function Login() {
    let navigate = useNavigate()
    let {adminId,setAdminId} = useContext(loginContext)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let loginAdmin = (event) =>{
        event.preventDefault()
        
        let obj = {
            adminEmail : event.target.email.value,
            adminPassword : event.target.password.value
        }
        axios.post(`${apiBaseUrl}auth/login`,obj)
        .then((res)=>res.data)
        .then((finalRes)=>{
           if(finalRes.status){
            setAdminId(finalRes.adminId)
              
           }else{
             toast.error(finalRes.msg)
           }
            
        })
    }

    useEffect(()=>{
        if(adminId!=''){
            navigate('/dashboard')
        }
    },[adminId])

    return (
        <div>
            <ToastContainer/>
            <div className='max-w-[460px] py-3 mx-auto h-full mt-[100px]'>
                <img src="/images/wscube-tech-logo-2.svg" alt="" className='mx-auto' />
                <form onSubmit={loginAdmin} action="" className='px-5 py-5 shadow-[0px_10px_20px_2px_rgba(128,128,128,0.2)] border-[0.1px] border-[rgba(128,128,128,0.08)] mt-5 '>
                    <h2 className='text-[26px] font-bold mb-3'>Sign in to your account</h2>
                    <div className='mb-3'>
                        <label htmlFor="" className='block font-medium'>Email</label>
                        <input type="email" name='email' placeholder='Enter Email' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px]'/>
                    </div>
                    <div className=''>
                        <label htmlFor="" className='block font-medium'>Password</label>
                        <input type="password" name='password' placeholder='Enter Password' required className='w-[100%] h-[45px] bg-gray-50 border-[0.1px] border-[rgba(128,128,128,0.5)] px-2.5 rounded-[8px] mb-2'/>
                    </div>
                    <div className='mb-4 text-right'>
                        <Link to={'/forget-password'} className=' text-[14px] text-blue-600 hover:underline cursor-pointer'>Forget Password ?</Link>
                    </div>
                    <button className='w-[100%] h-[45px] bg-blue-500 text-white rounded-[8px] text-[18px] font-medium cursor-pointer'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
