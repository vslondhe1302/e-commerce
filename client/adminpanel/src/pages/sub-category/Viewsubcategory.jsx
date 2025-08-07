import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router';

export default function Viewsubcategory() {
    let [search, setSearch] = useState(false)
    let [subCatList, setSubCatList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)
    let [subCategoryName, setSubCategoryName] = useState('')
    let [currentPage, setCurrentPage] = useState(1)
    let [totalPages, setTotalPages] = useState(null)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getSubCategoryList = () => {
        axios.get(`${apiBaseUrl}sub-category/view`, {
            params: {
                subCategoryName,
                currentPage
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {                
                setSubCatList(finalRes.data);
                setStaticPath(finalRes.staticPath)
                setTotalPages(finalRes.pages)
            })
    }

    useEffect(() => {
        getSubCategoryList()
    }, [subCategoryName, currentPage])

    let getCheckedValue = (event) => {
        if (event.target.checked && !ids.includes(event.target.value)) {
            setIds([...ids, event.target.value])
        }
        else {
            setIds(ids.filter((v) => !v.includes(event.target.value)))
        }
    }

    let deleteSubcategory = () => {
        axios.post(`${apiBaseUrl}sub-category/delete`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getSubCategoryList()
                setIds([])
                toast.success(finalRes.msg)
            })
    }

    let changeStatus = () => {
        axios.post(`${apiBaseUrl}sub-category/status-change`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getSubCategoryList()
                setIds([])
                toast.success(finalRes.msg)
            })
    }

    let handleAll = (event) => {
        if (event.target.checked) {
            let allIds = subCatList.map((items) => items._id)
            setIds(allIds)
        }
        else {
            setIds([])
        }
    }

    useEffect(() => {
        if (subCatList.length >= 1) {
            if (subCatList.length == ids.length) {
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
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Sub Category /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div >
                <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                    <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                        <input onChange={(e) => setSubCategoryName(e.target.value)} type="text" value={subCategoryName} placeholder='Search Sub-Category' name="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                        <button onClick={getSubCategoryList} className='px-[15px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                    </div>
                </div>
                <div className='px-[20px] py-[20px]'>
                    <div className=' border-[0.1px] border-gray-300 rounded-[8px] mb-7'>
                        <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                            <h2 className='text-[22px] font-medium'>View Sub Category</h2>
                            <div className='flex gap-[10px]'>
                                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                    {search ?
                                        <MdFilterAltOff />
                                        : <MdFilterAlt />}

                                </button>
                                <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                                <button onClick={deleteSubcategory} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                            </div>
                        </div>
                        <table className='w-[100%] rounded-[10px] bg-gray-800'>
                            <thead className='bg-gray-700 rounded-[10px_10px_0px_0px]'>
                                <tr className='flex justify-between items-center uppercase text-gray-300 font-medium text-[13px]  p-[20px]'>
                                    <th className=''>
                                        <input onChange={handleAll} checked={selectAll} value={selectAll} type="checkbox" className='scale-140' />
                                    </th>
                                    <th className='text-gray-300 uppercase text-[13px] text-left font-medium w-[15%]'>parent category Name</th>
                                    <th className='text-gray-300 uppercase text-[13px] text-left font-medium w-[15%]'>sub category name </th>
                                    {/* className='grid grid-cols-10 gap-4 pr-0 ' */}
                                    <th className='text-left w-[10%]'>Image </th>
                                    <th className='text-left w-[10%]'>Order </th>
                                    <th className='text-left w-[10%]'>status</th>
                                    <th className='text-left w-[10%]'>action</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {subCatList.length>=1 ?
                                    subCatList.map((items, index) => {
                                        return (
                                            <tr key={index} className='flex justify-between px-[20px] py-[15px] items-center text-gray-300 font-medium text-[13px]'>
                                                <td>
                                                    <input onChange={getCheckedValue} checked={ids.includes(items._id)} type="checkbox" value={items._id} className='scale-140' />
                                                </td>
                                                <td className='text-gray-300 text-[13px] text-left font-medium w-[15%]'>{items.parentCategory.categoryName}</td>
                                                <td className='text-gray-300 text-[13px] text-left font-medium w-[15%]'>{items.subCategoryName}</td>
                                                {/* className='grid  grid-cols-10 gap-18 items-center '> */}
                                                <td className='text-center w-[10%]'>
                                                    <img src={staticPath + items.subCategoryImage} alt="" className='w-[40px] ' />
                                                </td>
                                                <td className='w-[10%] text-left'>{items.subCategoryOrder} </td>
                                                <td className='w-[10%] text-left'>
                                                    {items.subCategoryStatus ?
                                                        <button className='bg-green-400 text-white  text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                                        :
                                                        <button className='bg-red-400 text-white  text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                                    }

                                                </td>
                                                <td className='w-[10%] text-left'>
                                                    <Link to={`/sub-category/edit/${items._id}`}>
                                                        <button className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr className='w-[100%]'>
                                        <td className='text-gray-300 text-left py-[15px] px-[20px]'>No Sub-Category List Found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
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
