import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Addsliders() {
    let defaultPreview = '/images/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg'
    let [preview, setPreview] = useState(defaultPreview)

    let navigate = useNavigate()
    let { id } = useParams()

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let [formdata, setFormdata] = useState({
        sliderTitle: '',
        sliderOrder: '',
    })

    let saveSlider = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)

        if (id) {
            axios.put(`${apiBaseUrl}slider/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setPreview(defaultPreview)
                        setFormdata({ sliderTitle: '', sliderOrder: '' })
                        setTimeout(() => {
                            navigate('/slider/view')
                        }, [2000])
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {
            axios.post(`${apiBaseUrl}slider/add`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setPreview(defaultPreview)
                        setFormdata({ sliderTitle: '', sliderOrder: '' })
                        setTimeout(() => {
                            navigate('/slider/view')
                        }, [2000])
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
    }

    useEffect(() => {
        setFormdata({
            sliderTitle: '',
            sliderOrder: '',
        }
        )
        if (id) {
            axios.get(`${apiBaseUrl}slider/single-data/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes);
                    setFormdata({
                        sliderTitle: finalRes.data.sliderTitle,
                        sliderOrder: finalRes.data.sliderOrder,
                    })
                    setPreview(finalRes.staticPath + finalRes.data.sliderImage)

                })
        }
    }, [id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Slider /</span>
                    <span className='text-gray-800'> {id ? "Edit" : "Add"}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-50'>
                        <h2 className='text-[22px] font-medium'>{id ? "Edit" : "Add"} Slider</h2>
                    </div>

                    <form onSubmit={saveSlider} className='py-[20px] px-[20px] grid grid-cols-[35%_65%] gap-6 rounded-[5px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Choose Image</label>
                            <div className='border-2 border-gray-200 rounded-[6px] overflow-hidden'>
                                <img src={preview} alt="" className='w-[100%] h-[300px] rounded-[5px]' />
                                <input onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} type="file" name='sliderImage' className="p-2" />
                            </div>
                        </div>
                        <div className='pr-[20px]'>
                            <div className='mb-[20px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Title</label>
                                <input onChange={(e) => {
                                    let obj = { ...formdata }
                                    obj['sliderTitle'] = e.target.value
                                    setFormdata(obj)
                                }} type="text" name='sliderTitle' value={formdata.sliderTitle} placeholder='Title' className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                            <div className='mb-[70px]'>
                                <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                                <input onChange={(e) => {
                                    let obj = { ...formdata }
                                    obj['sliderOrder'] = e.target.value
                                    setFormdata(obj)
                                }} type="text" placeholder='Enter Order' value={formdata.sliderOrder} name="sliderOrder" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                            </div>
                        </div>

                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                                {id ? "Edit" : "Add"} Slider
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
