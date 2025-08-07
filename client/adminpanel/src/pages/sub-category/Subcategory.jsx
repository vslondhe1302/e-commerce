import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function Subcategory() {
    let navigate = useNavigate()
    let {id} = useParams()    

    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)

    let [parentCategory, setParentCategory] = useState([])
    let [formData, setFormData] = useState({
        parentCategory : '',
        subCategoryName : '',
        subCategoryOrder : '',
    })
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL


    let getParentData = () => {
        axios.get(`${apiBaseUrl}sub-category/parent-category`)
            .then((res) => res.data)
            .then((finalRes) => {                
                setParentCategory(finalRes.parentData);

            })
    }
    useEffect(() => {
        getParentData()
    }, [])

    let saveSubCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)

        if(id){
          axios.put(`${apiBaseUrl}sub-category/update/${id}`,formValue)
          .then((res)=>res.data)
          .then((finalRes)=>{
            if(finalRes.status){
            toast.success(finalRes.msg)
            setFormData({subCategoryName:'',subCategoryOrder :''})
            setPreview(defaultPreview)
            setTimeout(() => {
                    navigate('/sub-category/view')
                    }, [2000])
                    e.target.reset()
                }
                else {
                    toast.error(finalRes.msg)
                }
            })
        }
        else{
          axios.post(`${apiBaseUrl}sub-category/add`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.msg)
                    setFormData({subCategoryName:'',subCategoryOrder :''})
                    setPreview(defaultPreview)
                    setTimeout(() => {
                        navigate('/sub-category/view')
                    }, [2000])
                    e.target.reset()
                    
                }
                else {
                    toast.error(finalRes.msg)
                    console.log(finalRes.msg);
                }

            })
        }

    }
    
    useEffect(()=>{
        setFormData({
            parentCategory : '',
            subCategoryOrder : '',
            subCategoryName : '',
        })
        setPreview(defaultPreview)

        if(id){
            axios.get(`${apiBaseUrl}sub-category/single-data/${id}`)
            .then((res)=>res.data)
            .then((finalRes)=>{   
                setFormData({
                    parentCategory : finalRes.singleData.parentCategory.categoryName,
                    subCategoryName : finalRes.singleData.subCategoryName,
                    subCategoryOrder : finalRes.singleData.subCategoryOrder,
                })
                setPreview(finalRes.staticPath+finalRes.singleData.subCategoryImage)
            })
        }
    },[id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/  Sub Category /</span>
                    <span className='text-gray-800'> {id ? "Edit" : "Add"}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>{id ? "Edit" : "Add"} Sub Category</h2>
                    </div>
                    <form onSubmit={saveSubCategory} className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-4 rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Category Image</label>
                            <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                 <img src={preview} alt="" className='w-[100%] h-[300px] rounded-[5px]' />
                                <input onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} type="file" name='subCategoryImage' className="p-2" />
                            </div>
                        </div>
                        <div className='px-[20px]'>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Parent Category Name</label>
                                <select onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['parentCategory'] = e.target.value
                                    setFormData(obj)
                                }} name="parentCategory" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300'>

                                    <option value="Select Category">Select Category</option>
                                    {
                                    parentCategory.map((items, index) => <option key={index} value={items._id}>
                                        {items.categoryName}
                                    </option>)
                                    }
                                </select>
                            </div>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Category Name</label>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['subCategoryName'] = e.target.value
                                    setFormData(obj)
                                }} type="text" name='subCategoryName' value={formData.subCategoryName} placeholder='Category Name' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[25px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj['subCategoryOrder'] = e.target.value
                                    setFormData(obj)
                                }} type="text" placeholder='Enter Order' value={formData.subCategoryOrder} name="subCategoryOrder" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>

                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>{id ? "Update" : "Add"} Sub Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
