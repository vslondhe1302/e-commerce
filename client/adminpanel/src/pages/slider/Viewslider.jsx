import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewslider() {
    let [search, setSearch] = useState(false)
    let [sliderData, setSliderData] = useState([])
    let [staticPath, setStaticPath] = useState('')

    let [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)

    let [sliderTitle, setSliderTitle] = useState('')

    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(null)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getSliderdata = () => {
        axios.get(`${apiBaseUrl}slider/view`,
            {
                params: {
                    sliderTitle,
                    currentPage,
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setSliderData(finalRes.data)
                setStaticPath(finalRes.staticPath)
                setTotalPages(finalRes.pages)

            })
    }
    useEffect(() => {
        getSliderdata()
    }, [sliderTitle, currentPage])

    let getCheckedValue = (e) => {
        if (e.target.checked && !ids.includes(e.target.value)) {
            setIds([...ids, e.target.value])
        }
        else {
            setIds(ids.filter((v) => !v.includes(e.target.value)))
        }
    }

    let deleteSlider = () => {
        axios.post(`${apiBaseUrl}slider/delete`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getSliderdata()
                toast.success(finalRes.msg)

            })
    }

    let changeStatus = () => {
        axios.post(`${apiBaseUrl}slider/change-status`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                getSliderdata()
                setIds([])
                toast.success(finalRes.msg)

            })
    }

    let handleAll = (event) => {
        if (event.target.checked) {
            let allIds = sliderData.map((items) => items._id)
            setIds(allIds)
        }
        else {
            setIds([])
        }
    }

    useEffect(() => {
        if (sliderData.length >= 1) {
            if (sliderData.length == ids.length) {
                setSelectAll(true)
            }
            else {
                setSelectAll(false)
            }
        }
    }, [ids])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Slider /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                <form className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                    <input onChange={(e) => setSliderTitle(e.target.value)} type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                    <button onClick={getSliderdata} className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                </form>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                        <h2 className='text-[22px] font-medium'>View Slider</h2>
                        <div className='flex gap-[10px]'>
                            <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                {search ?
                                    <MdFilterAltOff />
                                    : <MdFilterAlt />}

                            </button>
                            <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                            <button onClick={deleteSlider} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                        </div>
                    </div>
                    <div className=' rounded-[10px] bg-gray-800'>
                        <div className='flex justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                            <div className='basis-[45%] flex gap-10 items-center'>
                                <input onChange={handleAll} checked={selectAll} value={selectAll} type="checkbox" className='scale-140' />
                                <h3 className='text-gray-300 uppercase text-[13px] font-medium'>Name</h3>
                            </div>
                            <div className='basis-[55%] flex justify-between items-center uppercase text-gray-300 font-medium text-[13px]'>
                                <h2 className='text-left w-[10%]'>Image </h2>
                                <h2 className='text-left w-[10%]'>Order </h2>
                                <h2 className='text-left w-[10%]'>status</h2>
                                <h2 className='text-left w-[10%]'>action</h2>
                            </div>
                        </div>

                        {sliderData.length >= 1
                            ?
                            sliderData.map((items, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center p-[20px]'>
                                        <div className='basis-[45%] flex gap-10 items-center'>
                                            <input onChange={getCheckedValue} checked={ids.includes(items._id)} value={items._id} type="checkbox" className='scale-140' />
                                            <h3 className='text-gray-300 uppercase text-[13px] font-medium'>{items.sliderTitle}</h3>
                                        </div>
                                        <div className='basis-[55%] flex justify-between items-center text-gray-300 font-medium text-[13px]'>
                                            <h2 className='text-left w-[10%]'>
                                                <img src={staticPath + items.sliderImage} alt="" className='w-[100px] h-[60px] ' />
                                            </h2>
                                            <h2 className='text-left w-[10%]'>{items.sliderOrder}</h2>
                                            <div className='text-left w-[10%]'>
                                                {items.sliderStatus
                                                    ?
                                                    <button className='bg-green-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                                    :
                                                    <button className='bg-red-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                                }
                                            </div>
                                            <div className='text-left w-[10%]'>
                                                <Link to={`/slider/edit/${items._id}`} className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className='text-gray-300 text-left py-[15px] px-[20px]'>No Slider List Found</div>
                        }
                    </div>
                </div>
            </div>
            <ResponsivePagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
