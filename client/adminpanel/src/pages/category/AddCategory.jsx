import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';

export default function AddCategory() {
    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)

    let navigate = useNavigate()
    let {id} = useParams()
    
    let [formData, setFormData] = useState({
        categoryName:'',
        categoryOrder:'',
    })
    
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let saveCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)  //form tag

        if(id){
            axios.put(`${apiBaseUrl}category/update/${id}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.msg)
                    setFormData({categoryName:'',categoryOrder:''})
                    setPreview(defaultPreview)
                    setTimeout(() => {
                        navigate('/category/view')
                    }, [2000])

                }
                else {
                    toast.error(finalRes.msg)
                }
            })
        }
        else{

        axios.post(`${apiBaseUrl}category/add`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.msg)
                    setFormData({categoryName:'',categoryOrder:''})
                    setPreview(defaultPreview)
                    setTimeout(() => {
                        navigate('/category/view')
                    }, [2000])

                }
                else {
                    toast.error(finalRes.msg)
                }
            })
        }
    }

    useEffect(()=>{
        setFormData({
            categoryName :'',
            categoryOrder :'',
        })
        setPreview(defaultPreview)
        
        if(id){
           axios.get(`${apiBaseUrl}category/single-data/${id}`)
           .then((res)=>res.data)
           .then((finalRes)=>{
            setFormData({                
                categoryName:finalRes.categorydata.categoryName,
                categoryOrder:finalRes.categorydata.categoryOrder,
            });
            setPreview(finalRes.staticPath+finalRes.categorydata.categoryImage)

           })
        }
        
    },[id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Category /</span>
                    <span className='text-gray-800'> {id ? "Edit" : "Add"}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>{id ? 'Edit' : "Add"} Category</h2>
                    </div>

                    <form onSubmit={saveCategory} className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-4 rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Category Image</label>
                            <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                <img src={preview} alt="" className='w-[100%] h-[300px] rounded-[5px]' />
                                <input onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} type="file" name='categoryImage' className="p-2" />
                            </div>
                        </div>
                        <div className='px-[10px]'>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Category Name</label>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj["categoryName"] = e.target.value
                                    setFormData(obj)
                                }} type="text" placeholder='Enter Name' name='categoryName' value={formData.categoryName} className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[70px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input onChange={(e)=>{
                                    let obj = {...formData}
                                    obj["categoryOrder"]=e.target.value
                                    setFormData(obj)
                                }} type="text" placeholder='Enter Order' name="categoryOrder" value={formData.categoryOrder} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>

                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>{id ? "Update" : "Add"} Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
