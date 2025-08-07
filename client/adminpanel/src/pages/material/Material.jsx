import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Material() {
    let {id} = useParams()

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let navigate = useNavigate()

    let [formData, setFormData] = useState({
        materialName:'',
        materialOrder:''
    })

    let saveMaterial=(event)=>{
        
        if(id){
            axios.put(`${apiBaseUrl}material/update/${id}`,formData)
            .then((res)=>res.data)
            .then((finalRes)=>{
                 if(finalRes.status){
                toast.success(finalRes.msg)
                setFormData({materialName:'',materialOrder:''})
                setTimeout(()=>{
                    navigate('/material/view')
                },2000)
            }
            })

        }
        else{
            axios.post(`${apiBaseUrl}material/add`,formData)
        .then((res)=>res.data)
        .then((finalRes)=>{    
            if(finalRes.status){
                toast.success(finalRes.msg)
                setFormData({materialName:'',materialOrder:''})
                setTimeout(()=>{
                    navigate('/material/view')
                },2000)
            }
            else{
                toast.error(finalRes.msg)
            }
        })
        }
        event.preventDefault()
    }

    useEffect(()=>{
        setFormData({
            materialName:'',
            materialOrder:''
        })
        if(id){
            axios.get(`${apiBaseUrl}material/single-row/${id}`)
            .then((res)=>res.data)
            .then((finalRes)=>{
                console.log(finalRes.singleMaterialRes);
                setFormData({
                    materialName:finalRes.singleMaterialRes.materialName,
                    materialOrder:finalRes.singleMaterialRes.materialOrder
                })
                
            })
        }
    },[id])
  return (
    <div>
        <ToastContainer/>
      <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Material /</span>
                    <span className='text-gray-800'>{id ? 'Edit' : 'Add'}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                        <h2 className='text-[22px] font-medium'>{id ? 'Edit' : 'Add'} Material</h2>
                    </div>

                    <form onSubmit={saveMaterial} className='py-[20px] px-[15px] items-center gap-4 rounded-[10px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Material Name</label>
                            <input onChange={(e)=>{
                                let obj = {...formData}
                                obj["materialName"]=e.target.value
                                setFormData(obj)
                            }} 
                            type="text" placeholder='Material Name' name="material_name" value={formData.materialName} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                        </div>
                        <div className='mb-[50px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                            <input onChange={(e)=>{
                                let obj = {...formData}
                                obj['materialOrder'] = e.target.value
                                setFormData(obj)
                            }} type="text" placeholder='Order' name="material_order" value={formData.materialOrder} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                        </div>
                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                               {id ? 'Update' : 'Add'} Material
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}
