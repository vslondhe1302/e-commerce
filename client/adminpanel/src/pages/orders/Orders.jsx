import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function Orders() {
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let [orderData, setOrderData] = useState([])
    let [ids, setIds] = useState([])

    let getOrdersData = () => {
        axios.get(`${apiBaseUrl}orders/view-orders`)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes);
                    setOrderData(finalRes.data)
                }

            })
    }

    useEffect(() => {
        getOrdersData()
    },[])

    let getCheckedValue = (e) =>{
        if(e.target.checked && !ids.includes(e.target.value)){
            setIds([...ids, e.target.value])
        }
        else{
            setIds(ids.filter((v)=>!v.includes(e.target.value)))
        }
    }
    console.log(ids);
    

    let deleteOrder = () =>{
        axios.post(`${apiBaseUrl}orders/delete`,{ids})
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
            console.log(finalRes);
            toast.success(finalRes.msg)
            getOrdersData()
            }
            else{
                toast.error(finalRes.msg)
            }
        })
    }
    return (
        <div>
            <ToastContainer/>
            <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
                <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ Orders </span>
                </div>
            </div>
            <div className='px-[20px] py-[20px]'>
                <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                    <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-100'>
                        <h2 className='text-[26px] font-medium'>Order's List</h2>
                    </div>
                    <div className=' rounded-[10px]'>
                        <div className='w-[100%] grid grid-cols-11 justify-between items-center  p-[15px] rounded-[10px_10px_0px_0px] uppercase text-gray-800 font-bold text-[15px] text-center bg-gray-50'>
                            <button onClick={deleteOrder} className=' col-span-1 w-[70px] h-[35px] text-white bg-blue-400 mx-auto rounded-[4px]'>Delete</button>
                            <h2 className=' col-span-1'>sr. no </h2>
                            <h2 className=' col-span-2'>order id </h2>
                            <h2 className=' col-span-2'>name </h2>
                            <h2 className=' col-span-1'>quantity</h2>
                            <h2 className=' col-span-1'>price</h2>
                            <h2 className=' col-span-1'>date</h2>
                            <h2 className=' col-span-1'>status</h2>
                            <h2 className=' col-span-1'>view</h2>
                        </div>
                        <div>
                            {orderData!=0 &&
                             orderData.map((items,index)=>{
                                return(

                            <div key={index} className='w-[100%] grid grid-cols-11 justify-between items-center p-[15px] rounded-[10px_10px_0px_0px] text-gray-500 font-medium text-[15px] text-center'>
                                <div className='col-span-1'>
                                    <input onChange={getCheckedValue} checked={ids.includes(items._id)} type="checkbox" value={items._id} className='scale-140' />
                                </div>
                                <h2 className=' col-span-1'>{index+1}</h2>
                                <h2 className=' col-span-2 overflow-hidden truncate'>{items.productId}</h2>
                                <h2 className=' col-span-2'>{items.shippingAddress.name}</h2>
                                <h2 className=' col-span-1'>{items.orderQty}</h2>
                                <h2 className=' col-span-1'>&#8377; {items.orderAmount}</h2>
                                <h2 className='col-span-1'>10/08/2025</h2>
                                <h2 className=' col-span-1'>{items.orderStatus}</h2>
                                <div className='col-span-1 border-[0.1px] mx-auto border-gray-300 w-[70px] py-1.5 rounded-[24px]'>
                                     Active
                                </div>
                            </div>
                             )
                             })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
