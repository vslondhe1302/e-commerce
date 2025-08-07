import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewcountry() {
    let [search, setSearch] = useState(false)
    let [countryData, setCountryData] = useState([])
    let [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)
    let [countryName, setCountryName] = useState('')
    let [currentPage, setCurrentPage] = useState(1)
    let [totalPages, setTotalPages] = useState(null)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getCountryList = () => {
        axios.get(`${apiBaseUrl}country/view`,
            {
                params: {
                    countryName,
                    currentPage
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                setCountryData(finalRes.countryData)
                setTotalPages(finalRes.pages)
            })
    }
    useEffect(() => {
        getCountryList()
    }, [countryName,currentPage])

    let getCheckedCountry = (event) => {
        if (event.target.checked && !ids.includes(event.target.value)) {
            setIds([...ids, event.target.value])
        }
        else {
            setIds(ids.filter((v) => v != event.target.value))
        }
    }

    let deleteCountry = () => {
        axios.post(`${apiBaseUrl}country/delete`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getCountryList()
                setIds([])
            })
    }

    let changeStatus = () => {
        axios.post(`${apiBaseUrl}country/change-status`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getCountryList()
                setIds([])
            })
    }

    useEffect(() => {

    }, [ids])

    let handleAll = (event) => {
        if (event.target.checked) {
            let allIds = countryData.map((items) => items._id)
            setIds(allIds);
        }
        else {
            setIds([])
        }
    }

    useEffect(() => {
        if (countryData.length >= 1) {
            if (countryData.length == ids.length) {
                setSelectAll(true)
            }
            else {
                setSelectAll(false)
            }
        }
    }, [ids])

    return (
        <div>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Country /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div >
                <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                    <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                        <input onChange={(e) => setCountryName(e.target.value)} type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                        <button onClick={getCountryList} className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                    </div>
                </div>
                <div className='px-[20px] py-[20px]'>
                    <div className=' border-[0.1px] border-gray-300 rounded-[8px] mb-7'>
                        <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                            <h2 className='text-[22px] font-medium'>View Country</h2>
                            <div className='flex gap-[10px]'>
                                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                    {search ?
                                        <MdFilterAltOff />
                                        : <MdFilterAlt />}

                                </button>
                                <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>

                                <button onClick={deleteCountry} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                            </div>
                        </div>
                        <div className=' rounded-[10px] bg-gray-800'>
                            <div className='grid grid-cols-[40%_40%] justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                                <div className='flex gap-6 items-center'>
                                    <input onChange={handleAll} checked={selectAll} type="checkbox" className='scale-140' />
                                    <h3 className='w-[16%] text-gray-300 uppercase text-[13px] font-medium'>sr. no.</h3>
                                    <h3 className='w-[15%] text-gray-300 uppercase text-[13px] font-medium'>Name</h3>
                                </div>
                                <div className='grid grid-cols-3 uppercase text-gray-300 font-medium text-[13px]'>
                                    <h2 className='text-center  col-span-1'>Order </h2>
                                    <h2 className='text-center  col-span-1'>status</h2>
                                    <h2 className='text-center  col-span-1'>action</h2>
                                </div>
                            </div>
                            {countryData.length >= 1
                                ?
                                countryData.map((items, index) => {
                                    return (
                                        <div key={index} className='grid grid-cols-[40%_40%] justify-between items-center p-[20px]'>
                                            <div className='flex gap-6 items-center'>
                                                <input onChange={getCheckedCountry} checked={ids.includes(items._id)} type="checkbox" value={items._id} className='scale-140' />
                                                <h3 className='w-[16%] text-gray-300 uppercase text-[13px] font-medium'>{(currentPage-1)*4+(index+1)}</h3>
                                                <h3 className='w-[15%] text-gray-300 uppercase text-[13px] font-medium'>{items.countryName}</h3>
                                            </div>
                                            <div className='grid  grid-cols-3 items-center text-gray-300 font-medium text-[13px]'>
                                                <h2 className='text-center col-span-1'>{items.countryOrder}</h2>
                                                <div className='text-center col-span-1'>
                                                    {items.countryStatus
                                                        ?
                                                        <button className='bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                                        :
                                                        <button className='bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                                    }

                                                </div>
                                                <div className='text-center col-span-1 mx-auto'>
                                                    <Link to={`/country/edit/${items._id}`}>
                                                        <button className='w-[35px] h-[35px] bg-blue-500 hover:bg-blue-600 text-white flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='grid grid-cols-1 justify-between items-center p-[20px] text-white'>
                                    No List Found
                                </div>
                            }

                        </div>
                    </div>
                    <ResponsivePagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}
