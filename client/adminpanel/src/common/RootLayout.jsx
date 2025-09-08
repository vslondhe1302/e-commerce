import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { AiFillPieChart } from "react-icons/ai";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";
import { HiShoppingBag } from "react-icons/hi";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { RiFileEditFill } from "react-icons/ri";
import { LiaSlidersHSolid } from "react-icons/lia";
import { FaLocationArrow } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FcFaq } from "react-icons/fc";
import { FaFileLines } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { Link, Outlet } from 'react-router'
import Header from './Header';
import Footer from './Footer';

export default function Rootlayout() {

  let [menu, setmenu] = useState(-1)

  return (
    <div className=''>
      <section className='max-w-[100%] h-screen grid grid-cols-[16%_84%]'>
        <div className=' bg-[rgb(31,41,55)] h-screen overflow-y-scroll'>
          <figure className='border-b-[0.1px] border-b-[rgba(128,128,128,0.8)] py-4'><img src="/images/wscube-tech-logo-2.svg" alt="" className='mx-auto' /></figure>
          <ul className='text-white w-[100%] px-3 font-medium'>
            <Link to={'/dashboard'} className='my-4 flex items-center gap-3 px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)]'><AiFillPieChart className='text-[22px] text-gray-400 group-hover:text-white' />Dashboard</Link>

            <li  onClick={() => setmenu(menu== 1 ? '-1' : '1')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaUser className='text-[20px] group-hover:text-white' />Users</h3>
              {menu == 1 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 1 ? '' : 'hidden'} `}>
              <Link to={'/user/view'} className='flex items-center justify-between'>
                <h3 className='flex items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] w-[100%] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Users</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu == 2 ? '-1' : '2')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaCommentAlt className='text-[18px] group-hover:text-white' />Enquiry's</h3>
              {menu == 2 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 2 ? '' : 'hidden'} `}>
              <Link to={'/contact/enquiries'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Contact Enquiry's</h3>
              </Link>
              <Link to={'/newsletters'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Newsletters</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu == 3 ? '-1' : '3')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaDroplet className='text-[22px] text-gray-400 group-hover:text-white' />Colors</h3>
              {menu == 3 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 3 ? '' : 'hidden'} `}>
              <Link to={'/color/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Colors</h3>
              </Link>
              <Link to={'/color/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Colors</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 4 ? '-1' : '4')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaExpandArrowsAlt className='text-[22px] text-gray-400 group-hover:text-white' />Materials</h3>
              {menu == 4 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 4 ? '' : 'hidden'} `}>
              <Link to={'/material/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Material</h3>
              </Link>
              <Link to={'/material/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Material</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 5 ? '-1' : '5')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><CgMenuLeft className='text-[22px] text-gray-400 group-hover:text-white' />Parent Categorys</h3>
              {menu == 5 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 5 ? '' : 'hidden'} `}>
              <Link to={'/category/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Category</h3>
              </Link>
              <Link to={'/category/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Category</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 6 ? '-1' : '6')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><CgMenuLeft className='text-[22px] text-gray-400 group-hover:text-white' />Sub Categorys</h3>
              {menu == 5 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 6 ? '' : 'hidden'} `}>
              <Link to={'/sub-category/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Sub Category</h3>
              </Link>
              <Link to={'/sub-category/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Sub Category</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 7 ? '-1' : '7')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><CgMenuLeft className='text-[22px] text-gray-400 group-hover:text-white' />Sub Sub Categorys</h3>
              {menu == 7 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 7 ? '' : 'hidden'} `}>
              <Link to={'/sub-sub-category/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Sub Sub Categorys</h3>
                <FaAngleDown className='text-[14px] text-[gray]' />
              </Link>
              <Link to={'/sub-sub-category/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Sub Sub Categorys</h3>
                <FaAngleDown className='text-[14px] text-[gray]' />
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 8 ? '-1' : '8')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><HiShoppingBag className='text-[22px] text-gray-400 group-hover:text-white' />Products</h3>
              {menu == 8 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 8 ? '' : 'hidden'} `}>
              <Link to={'/product/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Products</h3>
              </Link>
              <Link to={'/product/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Products</h3>
              </Link>
            </div>

            <li  onClick={() => setmenu(menu== 9 ? '-1' : '9')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><PiClockCounterClockwiseBold className='text-[22px] text-gray-400 group-hover:text-white' />Why Choose Us</h3>
              {menu == 9 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 9 ? '' : 'hidden'} `}>
              <Link to={'/why-choose-us/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Why Choose Us</h3>
              </Link>
              <Link to={'/why-choose-us/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Why Choose Us</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 10 ? '-1' : '10')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><RiFileEditFill className='text-[22px] text-gray-400 group-hover:text-white' />Orders</h3>
              {menu == 10 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 10 ? '' : 'hidden'} `}>
              <Link to={'/orders/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Orders</h3>
              </Link>
            </div>

            <li  onClick={() => setmenu(menu== 11 ? '-1' : '11')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><LiaSlidersHSolid className='text-[22px] text-gray-400 group-hover:text-white' />Sliders</h3>
              {menu == 11 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 11 ? '' : 'hidden'} `}>
              <Link to={'/slider/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Sliders</h3>
              </Link>
              <Link to={'/slider/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Sliders</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 12 ? '-1' : '12')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaLocationArrow className='group-hover:text-white'/>Country</h3>
              {menu == 12 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 12 ? '' : 'hidden'} `}>
              <Link to={'/country/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Country</h3>
              </Link>
              <Link to={'/country/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Country</h3>
              </Link>
            </div>

            <li  onClick={() => setmenu(menu== 13 ? '-1' : '13')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaUserPen className='text-[22px] group-hover:text-white' />Testimonials</h3>
              {menu == 13 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 13 ? '' : 'hidden'} `}>
              <Link to={'/testimonial/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Testimonials</h3>
              </Link>
              <Link to={'/testimonial/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Testimonials</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 14 ? '-1' : '14')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FcFaq className='text-[22px] group-hover:text-white' />Faqs</h3>
              {menu == 14 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
            <div className={` ${menu == 14 ? '' : 'hidden'} `}>
              <Link to={'/faq/add'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />Add Faq</h3>
              </Link>
              <Link to={'/faq/view'} className='flex items-center justify-between'>
                <h3 className='flex w-[100%] items-center gap-4 text-[13px] px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'><FaRegDotCircle className='text-[14px] text-gray-400 group-hover:text-white' />View Faq</h3>
              </Link>
            </div>

            <li onClick={() => setmenu(menu== 15 ? '-1' : '15')} className='flex items-center justify-between px-[8px] py-2 rounded-[8px] group hover:bg-[rgb(64,76,94)] cursor-pointer'>
              <h3 className='flex items-center gap-4 text-[15px]'><FaFileLines className='text-[22px] text-gray-400 group-hover:text-white' />Terms & Conditions</h3>
              {menu == 15 ? <FaChevronUp className='text-[14px] text-[gray]' /> : <FaChevronDown className='text-[14px] text-[gray]' />}
            </li>
          </ul>
        </div>
        <div className='overflow-y-scroll relative'>
          <Header/>
          <Outlet />
          <Footer/>

        </div>
      </section>

    </div>
  )
}
