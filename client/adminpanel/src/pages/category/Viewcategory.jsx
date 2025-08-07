import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff, MdSearch } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewcategory() {
    let [search, setSearch] = useState(false)
    let [categoryList, setCategoryList] = useState([])
    let [staticPath, setStaticPath] = useState('')

    let [categoryName, setCategoryName] = useState('')
    let [ids, setIds] = useState([])

    let [selectAll, setSelectAll] = useState(false)

    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(null)

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let getCategoryData = () => {
        axios.get(`${apiBaseUrl}category/view`,
            {
                params: {
                    categoryName,
                    currentPage
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                setCategoryList(finalRes.categorydata);
                setStaticPath(finalRes.staticPath)
                setTotalPages(finalRes.pages)
            })
    }
    useEffect(() => {
        getCategoryData()
    }, [categoryName,currentPage])


    let getCheckedValue = (event) => {
        if (event.target.checked && !ids.includes(event.target.value)) {
            setIds([...ids, event.target.value])
        }
        else {
            setIds(ids.filter((v) => v != event.target.value))
        }
    }

    let deleteCategory = () => {
        axios.post(`${apiBaseUrl}category/delete`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                toast.success(finalRes.msg)
                setIds([])
                getCategoryData()
            })
    }

    let statusChange = () => {
        axios.post(`${apiBaseUrl}category/status-change`, { ids })
            .then((res) => res.data)
            .then((finalRes) => {
                getCategoryData()
                setIds([])
            })
    }

    let handleAll = (event) => {
        if (event.target.checked) {
            let allIds = categoryList.map((items) => items._id)
            setIds(allIds);
        }
        else {
            setIds([])
        }
    }

    useEffect(() => {
        if (categoryList.length >= 1) {
            if (categoryList.length == ids.length) {
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
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Category /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                    <input onChange={(e) => setCategoryName(e.target.value)} type="text" placeholder='Search Name' name="" id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                    <button onClick={getCategoryData} className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                        <h2 className='text-[22px] font-medium'>View Category</h2>
                        <div className='flex gap-[10px]'>
                            <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                {search ?
                                    <MdFilterAltOff />
                                    : <MdFilterAlt />}

                            </button>
                            <button onClick={statusChange} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                            <button onClick={deleteCategory} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                        </div>
                    </div>
                    <div className=' rounded-[10px] bg-gray-800'>
                        <div className='flex justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                            <div className='flex basis-[50%] gap-6 items-center'>
                                <input onChange={handleAll} checked={selectAll} value={selectAll} type="checkbox" className='scale-140' />
                                <h3 className='text-gray-300 w-[10%] uppercase text-[13px] font-medium'>Sr.No</h3>
                                <h3 className='text-gray-300 w-[35%] uppercase text-[13px] font-medium'>Name</h3>
                            </div>
                            <div className='flex basis-[50%] justify-between items-center uppercase text-gray-300 font-medium text-[13px]'>
                                <h2 className='text-left basis-[10%]  '>Image </h2>
                                <h2 className='text-left basis-[10%]  '>Order </h2>
                                <h2 className='text-left basis-[10%]  '>status</h2>
                                <h2 className='text-left basis-[10%]  '>action</h2>
                            </div>
                        </div>

                        {categoryList.length >= 1
                            ?
                            categoryList.map((items, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center px-[20px] py-[15px]'>
                                        <div className='flex basis-[50%] gap-6 items-center '>
                                            <input onChange={getCheckedValue} checked={ids.includes(items._id)} type="checkbox" value={items._id} className='scale-140' />
                                            <h3 className='text-gray-300 w-[10%] uppercase text-[13px] font-medium'>{(currentPage-1)*4+index+1}</h3>
                                            <h3 className='text-gray-300 w-[35%] uppercase text-[13px] font-medium'>{items.categoryName}</h3>
                                        </div>
                                        <div className='flex basis-[50%] justify-between  items-center text-gray-300 font-medium text-[13px]'>
                                            <div className='text-left basis-[12%]'>
                                                <img src={staticPath + items.categoryImage} alt="" className='w-[50px] h-[45px] ' />
                                            </div>
                                            <h2 className='text-center basis-[10%] '>{items.categoryOrder} </h2>
                                            <div className='text-left basis-[10%] '>
                                                {items.categoryStatus
                                                    ?
                                                    <button className='bg-green-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                                    :
                                                    <button className='bg-red-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                                }
                                            </div>
                                            <div className='text-left basis-[10%]'>
                                                <Link to={`/category/edit/${items._id}`}>
                                                    <button className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className='px-[20px] py-[15px] text-white'> No Category List Found</div>
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
