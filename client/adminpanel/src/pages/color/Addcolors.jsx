import axios from 'axios'
import { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function AddColors() {
    let { id } = useParams()

    let navigate = useNavigate()
    let [color, setColor] = useState("")

    let [colorData, setColorData] = useState(
        {
            colorName: '',
            colorCode: '',
            colorOrder: ''
        }
    )
    let handleColor = (newColor) => {
        setColor(newColor.hex)
        let obj = { ...colorData }
        obj['colorCode'] = newColor.hex
        setColorData(obj)
    }

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let saveColor = (event) => {

        if (id) {
            axios.put(`${apiBaseUrl}color/update/${id}`,colorData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setColorData({
                            colorName: '', colorCode: '', colorOrder: ''
                        })
                        setTimeout(() => {
                            navigate('/color/view')
                        }, 2000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {
            axios.post(`${apiBaseUrl}color/add`, colorData)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status == 1) {
                        toast.success(finalRes.msg)
                        setColorData({
                            colorName: '', colorCode: '', colorOrder: ''
                        })
                        setTimeout(() => {
                            navigate('/color/view')
                        }, 2000)
                    }
                    else if (finalRes.status == (-1)) {
                        toast.error(finalRes.msg)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        event.preventDefault()
    }

    useEffect(() => {
        setColorData({
            colorName: '',
            colorCode: '',
            colorOrder: ''
        })
        if (id) {
            axios.get(`${apiBaseUrl}color/sigle-color-view/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes.singleColor);
                    setColorData({
                        colorName: finalRes.singleColor.colorName,
                        colorCode: finalRes.singleColor.colorCode,
                        colorOrder: finalRes.singleColor.colorOrder
                    })

                })
        }
    }, [id])

    return (
        <div>
            <ToastContainer />
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Color /</span>
                    <span className='text-gray-800'> {id ? 'Edit' : 'Add'}</span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300'>
                        <h2 className='text-[22px] font-medium'>{id ? 'Edit' : 'Add'} Color</h2>
                    </div>

                    <form onSubmit={saveColor} className='py-[20px] px-[15px] items-center gap-4 rounded-[10px]'>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Color Name</label>
                            <input onChange={(e) => {
                                let obj = { ...colorData }
                                obj['colorName'] = e.target.value
                                setColorData(obj)
                            }} type="text" placeholder='Enter Color Name' name="color_name" required value={colorData.colorName} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                        </div>
                        <div className='mb-[20px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Color Picker</label>
                            <div className='flex gap-10 items-center'>
                                {/* { <ChromePicker color={color} >} onChange={(newColor)=>{setColor(`rgba(${newColor.rgb.r},${newColor.rgb.g},${newColor.rgb.b},${newColor.rgb.a})`)}} */
                                    <ChromePicker color={color} onChange={handleColor} required />
                                }

                                <div style={{ backgroundColor: color, borderColor: color }} className={`border-2 w-[55px] h-[34px] rounded-[4px]`}>

                                </div>
                            </div>
                        </div>
                        <div className='mb-[50px]'>
                            <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                            <input onChange={(e) => {
                                let obj = { ...colorData }
                                obj['colorOrder'] = e.target.value
                                setColorData(obj)
                            }} type="number" placeholder='Enter Order' min={1} max={1000} name="color_order" required value={colorData.colorOrder} id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                        </div>
                        <div className='mb-[20px]'>
                            <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                                {id ? 'Update' : 'Add'} Color
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
