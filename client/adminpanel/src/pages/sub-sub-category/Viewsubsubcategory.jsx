import React, { useEffect, useState } from 'react'
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { BiSolidPencil } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewsubsubcategory() {
    let [search, setSearch] = useState(false)

    let [subSubCategoryList, setSubSubCategoryList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)
    let [subSubCategoryName,setSubSubCategoryName] = useState('')

    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(null)
        
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getSubSubCategoryList = () => {
        axios.get(`${apiBaseUrl}sub-sub-category/view`,{
            params : {
                subSubCategoryName,
                currentPage
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                
                setSubSubCategoryList(finalRes.data);
                setStaticPath(finalRes.staticPath)
                setTotalPages(finalRes.pages)
            })
    }

    useEffect(() => {
        getSubSubCategoryList()
    }, [subSubCategoryName,currentPage])

    let getCheckedValue = (event) =>{
        if(event.target.checked && !ids.includes(event.target.value)){
            setIds([...ids,event.target.value])
        }
        else{
            setIds(ids.filter((v)=>!v.includes(event.target.value)))
        }
    }

    let deleteList = () =>{ 
        axios.post(`${apiBaseUrl}sub-sub-category/delete`,{ids})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                getSubSubCategoryList()
                setIds([])
                toast.success(finalRes.msg);
            }
        })
    }

    let statusChange = () =>{
        axios.post(`${apiBaseUrl}sub-sub-category/status-change`,{ids})
        .then((res)=>res.data)
        .then((finalRes)=>{
            getSubSubCategoryList()
            setIds([])
            toast.success(finalRes.msg);
        })
    }

    let handleAllCheck = (e) =>{
        if(e.target.checked){
            let allIds = subSubCategoryList.map((items)=>items._id)
            setIds(allIds);
        }
        else{
            setIds([])
        }
    }
    useEffect(()=>{
        if(subSubCategoryList.length>=1){
            if(subSubCategoryList.length == ids.length){
                setSelectAll(true)
            }
            else{
                setSelectAll(false)
            }
        }
    },[ids])

    return (
        <div>
            <ToastContainer/>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Sub Sub Category /</span>
                    <span className='text-gray-800'> View</span>
                </div>
            </div>
            <div>
                <div className={`${search ? 'max-h-[200px]' : 'max-h-[0px]'} duration-120 ease-in-out m-[20px] overflow-hidden `}>
                    <div className='flex items-center gap-4 p-[20px] border-[0.1px] border-gray-300 rounded-[10px]'>
                        <input onChange={(e)=>setSubSubCategoryName(e.target.value)} type="text" placeholder='Search Name' value={subSubCategoryName} id="" className='px-[12px] w-[380px] h-[35px] rounded-[6px] bg-gray-700 text-gray-300 outline-[1px] outline-gray-800' />
                        <button className='px-[10px] h-[35px] rounded-[6px] bg-blue-500 hover:bg-blue-700 cursor-pointer'><MdSearch className='text-[22px] text-white ' /></button>
                    </div>
                </div>
                <div className='px-[20px] py-[20px]'>
                    <div className=' border-[0.1px] border-gray-300 rounded-[8px] mb-7'>
                        <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                            <h2 className='text-[22px] font-medium'>View Sub Sub Category</h2>
                            <div className='flex gap-[10px]'>
                                <button onClick={(e) => { setSearch(!search); e.preventDefault() }} className='h-[40px] px-[8px] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-[24px] rounded-[8px] text-white cursor-pointer'>
                                    {search ?
                                        <MdFilterAltOff />
                                        : <MdFilterAlt />}

                                </button>
                                <button onClick={statusChange} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Change Status</button>
                                <button onClick={deleteList} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white cursor-pointer'>Delete</button>
                            </div>
                        </div>
                        <div className=' rounded-[10px] bg-gray-800'>
                            <div className='flex justify-between items-center bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
                                <div className='flex basis-[50%] justify-between items-center'>
                                    <input onChange={handleAllCheck} checked={selectAll} value={selectAll} type="checkbox" className='scale-140 text-left' />
                                    <h3 className='text-gray-300 basis-[30%] text-left uppercase text-[13px] font-medium'>parent category</h3>
                                    <h2 className='text-gray-300 basis-[30%] text-left uppercase text-[13px] font-medium'>sub category </h2>
                                    <h2 className='text-gray-300 basis-[30%] text-left uppercase text-[13px] font-medium'>category name </h2>
                                </div>
                                <div className='flex basis-[40%] justify-between items-center uppercase text-gray-300 font-medium text-[13px]'>
                                    <h2 className='text-left'>Image </h2>
                                    <h2 className='text-left'>Order </h2>
                                    <h2 className='text-left'>status</h2>
                                    <h2 className='text-left'>action</h2>
                                </div>
                            </div>
                            {subSubCategoryList.length >= 1 ?
                                subSubCategoryList.map((items, index) => {                                    
                                    return (
                                        <div key={index} className='flex justify-between items-center px-[20px] py-[15px]'>
                                            <div className='flex basis-[50%] justify-between items-center'>
                                                <input onChange={getCheckedValue} checked={ids.includes(items._id)} value={items._id} type="checkbox" className='scale-140 text-left' />
                                                <h2 className='text-gray-300 basis-[30%] text-left font-medium text-[13px]'>{items.parentCategory.categoryName}</h2>
                                                <h3 className='text-gray-300 basis-[30%] text-left text-[13px] font-medium'>{items.subCategory.subCategoryName}</h3>
                                                <h3 className='text-gray-300 basis-[30%] text-left text-[13px] font-medium'>{items.subSubCategoryName}</h3>
                                            </div>
                                            <div className='flex basis-[40%] justify-between items-center uppercase text-gray-300 font-medium text-[13px]'>
                                                <h2 className='text-left'>
                                                    <img src={staticPath+items.subSubCategoryImage} alt="" className=' w-[45px] ' />
                                                </h2>
                                                <h2 className='text-left'>{items.subSubCategoryOrder} </h2>
                                                <div className=''>
                                                    {items.subSubCategoryStatus
                                                    ? 
                                                    <button className='bg-green-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                                                    :
                                                    <button className='bg-red-400 text-white text-[14px] inset-shadow-[-10px_0px_40px_0px_rgb(0,0,0,0.5)] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                                                }
                                                </div>
                                                <div className='text-left'>
                                                    <Link to={`/sub-sub-category/edit/${items._id}`}>
                                                    <button className='w-[40px] h-[40px] bg-blue-500 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='flex items-center px-[20px] py-[15px] text-white'>No Sub-Sub-Category List Found</div>
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
