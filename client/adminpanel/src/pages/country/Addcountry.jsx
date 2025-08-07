import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Addcountry() {
    let {id} = useParams()
    console.log(id);
    
    let navigate = useNavigate()
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let [countryData, setCountryData] = useState(
        {
            countryName : '',
            countryOrder : '' 
        }
    )

    let saveCountry=(event)=>{

        if(id){
            axios.put(`${apiBaseUrl}country/update/${id}`,countryData)
            .then((res)=>res.data)
            .then((finalRes)=>{
                if(finalRes.status){
                    toast.success(finalRes.msg)
                    setCountryData({countryName:'',countryOrder:''})
                    setTimeout(() => {
                        navigate('/country/view')
                    }, 2000);
                }
                else{
                    toast.error(finalRes.msg)
                }
            })
        }
        else{
           axios.post(`${apiBaseUrl}country/add`,countryData )
        .then((res)=>res.data)
        .then((finalres)=>{
            if(finalres.status){
                toast.success(finalres.msg)
                setCountryData({countryName:'',countryOrder:''})
                setTimeout(()=>{
                        navigate('/country/view')
                    },2000)
            }
            else{
                toast.error(finalres.msg)
            }
        })
        }

        
        event.preventDefault()
    }

    useEffect(()=>{
        setCountryData({
            countryName:'',
            countryOrder:''
        })
        if(id){
            axios.get(`${apiBaseUrl}country/single-row/${id}`)
            .then((res)=>res.data)
            .then((finalRes)=>{
                console.log(finalRes.singleRes);
                setCountryData({
                    countryName:finalRes.singleRes.countryName,
                    countryOrder:finalRes.singleRes.countryOrder
                })
            })
        }
    },[id])

    return (
        <div>
            <ToastContainer/>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Country /</span>
                    <span className='text-gray-800'> {id ? 'Edit' : 'Add'}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>{id ? 'Edit' : 'Add'} Country</h2>
                    </div>

                    <form onSubmit={saveCountry} className='py-[20px] px-[20px] rounded-[5px]'>
                        <div className=''>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Country Name</label>
                                <input onChange={(e)=>{
                                    let obj = {...countryData}
                                    obj['countryName'] = e.target.value
                                    setCountryData(obj)
                                }} 
                                type="text" name='country_name' value={countryData.countryName} placeholder='Country Name' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[70px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input onChange={(e)=>{
                                    let obj = {...countryData}
                                    obj['countryOrder'] = e.target.value
                                    setCountryData(obj)
                                }} type="text" placeholder='Order' name="order" value={countryData.countryOrder} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>
                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                                {id ? 'Update' : 'Add'} Country
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
