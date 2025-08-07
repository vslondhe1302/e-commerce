import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { HiMenu, HiOutlineUserCircle } from 'react-icons/hi'
import { TbLogout2 } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router'
import { loginContext } from '../context/MainContext'

export default function Header() {
    let {adminId, setAdminId} = useContext(loginContext)
    let [viewProfile, setViewProfile] = useState(false)
    let dropdownRef = useRef(null)

    useEffect(()=>{
       let handleClickOutside = (event) =>{
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setViewProfile(false)
        }          
       }
       document.addEventListener("mousedown",handleClickOutside)
    },[])
    
    let navigate = useNavigate()
    useEffect(()=>{
        if(adminId==''){
            navigate('/')
        }
    },[adminId])

    return (
        <div>
            <div className='flex justify-between px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='flex items-center leading-[24px] text-[20px] font-medium text-gray-600 gap-5'>
                    <HiMenu className='text-[24px] text-gray-400 font-bold' />Dashboard
                </div>
                <div onClick={() => setViewProfile(!viewProfile)} ref={dropdownRef} className='w-[50px] h-[50px] rounded-[50%] bg-gray-400 relative flex justify-center items-center'> <HiOutlineUserCircle className='text-[30px]' />
                    <div className={`w-[160px] bg-white border-[0.1px] border-gray-200 rounded-[10px] shadow-lg absolute top-[124%] left-[-100px] ${viewProfile == true ? "block" : "hidden"}`}>
                        <ul>
                            <li className='border-b-[0.1px] border-b-gray-300 group hover:bg-gray-100 duration-100'>
                                <Link to={'/profile'} className='text-[14px] text-gray-700 font-medium flex gap-2 items-center px-3 py-2 group-hover:text-blue-600 duration-100'>
                                    <FaUserCircle className='text-[18px]' />Profile
                                </Link>
                            </li>
                            <li className='border-b-[0.1px] border-b-gray-300 group hover:bg-gray-100 duration-100'>
                                <Link to={'/company-profile'} className='text-[14px] text-gray-700 font-medium flex gap-2 items-center px-3 py-2 group-hover:text-blue-600 duration-100'>
                                    <BsLayoutTextWindowReverse className='text-[15px]' />Company Profile
                                </Link>
                            </li>
                            <li className='border-b-[0.1px] border-b-gray-300 group hover:bg-gray-100 duration-100'>
                                <button onClick={()=>setAdminId('')} className='text-[14px] text-gray-700 font-medium flex gap-2 items-center px-3 py-2 group-hover:text-blue-600 duration-100'>
                                    <TbLogout2 className='text-[18px]' />Log Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
