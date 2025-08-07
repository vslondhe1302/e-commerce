import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

export default function Subsubcategory() {

    let [parentCategory, setParentCategory] = useState([])
    let [subCategory, setSubCategory] = useState([])

    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)

    let { id } = useParams()
    let navigate = useNavigate()

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let getParentCategory = () => {
        axios.get(`${apiBaseUrl}sub-sub-category/parent-category`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCategory(finalRes.parentData)
            })
    }
    useEffect(() => {
        getParentCategory()
    }, [])

    let getSubCategory = (id) => {
        axios.get(`${apiBaseUrl}sub-sub-category/sub-category/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCategory(finalRes.data);
            })
    }

    let [formData, setFormData] = useState({
        parentCategory: '',
        parentCategoryId: '',
        subCategory: '',
        subCategoryId: '',
        subSubCategoryName: '',
        subSubCategoryOrder: '',
        subSubCategoryImage: ''
    })

    let saveSubSubCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)

        if (id) {
            axios.put(`${apiBaseUrl}sub-sub-category/edit/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setPreview(defaultPreview)
                        setFormData({
                            subSubCategoryName: '',
                            subSubCategoryOrder: '',
                        })
                        setTimeout(() => {
                            navigate('/sub-sub-category/view')
                        }, [2000])

                        e.target.reset()
                    }
                    else {
                        toast.error(finalRes.error)
                    }
                })
        }
        else {

            axios.post(`${apiBaseUrl}sub-sub-category/add`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg);
                        e.target.reset()
                        setFormData({
                            subSubCategoryName: '',
                            subSubCategoryOrder: '',
                        })
                        setPreview(defaultPreview)
                        setTimeout(() => {
                            navigate('/sub-sub-category/view')
                        }, [2000])
                    }
                    else {
                        toast.error(finalRes.msg);
                    }
                })
        }
    }

    useEffect(() => {
        setFormData({
            parentCategory: '',
            parentCategoryId: '',
            subCategory: '',
            subSubCategoryName: '',
            subSubCategoryId: '',
            subSubCategoryOrder: '',
            subSubCategoryImage: ''
        })
        setPreview(defaultPreview)

        if (id) {
            axios.get(`${apiBaseUrl}sub-sub-category/view/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    getSubCategory(finalRes.data.parentCategory._id)
                    setFormData({
                        parentCategory: finalRes.data.parentCategory.categoryName,
                        parentCategoryId: finalRes.data.parentCategory._id,
                        subCategory: finalRes.data.subCategory.subCategoryName,
                        subCategoryId: finalRes.data.subCategory._id,
                        subSubCategoryName: finalRes.data.subSubCategoryName,
                        subSubCategoryOrder: finalRes.data.subSubCategoryOrder,
                        subSubCategoryImage: finalRes.data.subSubCategoryImage,
                    })
                    setPreview(finalRes.staticPath + finalRes.data.subSubCategoryImage)
                })
        }
    }, [id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Sub Sub Category /</span>
                    <span className='text-gray-800'> {id ? "Edit" : "Add"}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>{id ? "Edit" : "Add"} Sub Sub Category</h2>
                    </div>

                    <form onSubmit={saveSubSubCategory} className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-4 rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Category Image</label>
                            <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                <img src={preview} alt="preview" className='w-full h-[300px]' />
                                <input onChange={(e) => { setPreview(URL.createObjectURL(e.target.files[0])) }} type="file" name='subSubCategoryImage' className="p-2" />
                            </div>
                        </div>
                        <div className='px-[20px]'>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Parent Category Name</label>
                                <select onChange={(e) => getSubCategory(e.target.value)} name="parentCategory" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>

                                    <option value="Select Category">Select Parent Category</option>

                                    {
                                        parentCategory.map((items, index) => {
                                            return (
                                                <option key={index} selected={items._id == formData.parentCategoryId} value={items._id}>
                                                    {items.categoryName}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Sub Category Name</label>

                                <select onChange={(e) => {
                                    let obj = { ...formData }
                                    obj['subCategoryName'] = e.target.value
                                    setFormData(obj)

                                }} name="subCategory" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>

                                    <option value="Select Category">Select Sub Category</option>

                                    {
                                        subCategory.map((items, index) => {

                                            return (
                                                <option key={index} selected={items._id == formData.subCategoryId} value={items._id}>
                                                    {items.subCategoryName}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Category Name</label>
                                <input onChange={(e) => {
                                    let obj = { ...formData }
                                    obj['subSubCategoryName'] = e.target.value
                                    setFormData(obj)
                                }} type="text" name='subSubCategoryName' value={formData.subSubCategoryName} placeholder='Category Name' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input onChange={(e) => {
                                    let obj = { ...formData }
                                    obj['subSubCategoryOrder'] = e.target.value
                                    setFormData(obj)
                                }} type="text" value={formData.subSubCategoryOrder} placeholder='Enter Order' name="subSubCategoryOrder" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>
                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                                {id ? "Edit" : "Add"} Sub Sub Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
