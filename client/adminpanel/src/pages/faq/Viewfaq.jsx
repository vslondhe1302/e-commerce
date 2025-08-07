import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidPencil } from "react-icons/bi";
import { Link } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';

export default function Viewfaq() {
  let [faqData, setFaqData] = useState([])
  let [ids, setIds] = useState([])
  let [selectAll, setSelectAll] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [totalPages, setTotalPages] = useState(null)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  let getFaqList = () => {
    axios.get(`${apiBaseUrl}faq/view`,{
      params : {
        currentPage
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        setFaqData(finalRes.faqRes);
        setTotalPages(finalRes.pages)
      })
  }
  useEffect(() => {
    getFaqList()
  }, [currentPage])

  let getCheckedValue = (event) => {
    if(event.target.checked && !ids.includes(event.target.value)) {
      setIds([...ids, event.target.value])
    }
    else {
      setIds(ids.filter((v) => v!=event.target.value))
    }
  }

  let deleteFaq = () => {
    axios.post(`${apiBaseUrl}faq/delete`,{ ids })
      .then((res) => res.data)
      .then((finalRes) => {
        getFaqList()
        setIds([])
      })
  }

  let changeStatus = () => {
    axios.post(`${apiBaseUrl}faq/change-status`,{ids})
      .then((res) => res.data)
      .then((finalRes) => {
        getFaqList()
        setIds([])
      })
  }
  useEffect(() => {
    console.log(ids);
  },[ids])

  let handleAll = (event) =>{
    if(event.target.checked){
      let allIds = faqData.map((items)=>items._id)
      setIds(allIds);
    }
    else{
      setIds([])
    }
  }

  useEffect(()=>{
    if(faqData.length>=1){
      if(faqData.length == ids.length){
         setSelectAll(true)
      }
      else{
        setSelectAll(false)
      }
    }
  },[ids])

  return (
    <div>
      <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
        <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ FAQ /</span>
          <span className='text-gray-800'> View</span>
        </div>
      </div>
      <div className='px-[20px] py-[20px]'>
        <div className=' border-[0.1px] border-gray-300 rounded-[8px] mb-7'>
          <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] border-b-gray-300 bg-gray-100'>
            <h2 className='text-[22px] font-medium'>View FAQ</h2>
            <div className='flex gap-[10px]'>
              <button onClick={changeStatus} className='h-[40px] px-[10px] flex justify-center items-center bg-green-600 hover:bg-green-700 text-[18px] rounded-[8px] text-white'>Change Status</button>
              <button onClick={deleteFaq} className='h-[40px] px-[10px] flex justify-center items-center bg-red-600 hover:bg-red-700 text-[18px] rounded-[8px] text-white'>Delete</button>
            </div>
          </div>
          <div className=' rounded-[10px] bg-gray-800'>
            <div className='grid grid-cols-[40%_60%] justify-between items-center gap-2 bg-gray-700 p-[20px] rounded-[10px_10px_0px_0px]'>
              <div className='flex gap-6 items-center'>
                <input onChange={handleAll} checked={selectAll} type="checkbox" value={selectAll} className='scale-140 accent-blue-500' />
                <h3 className='text-gray-300 uppercase text-[13px] font-medium'>Question</h3>
              </div>
              <div className='grid grid-cols-6 uppercase text-gray-300 font-medium text-[13px]'>
                <h2 className='text-left  col-span-3'>Answer </h2>
                <h2 className='text-center  col-span-1'>Order </h2>
                <h2 className='text-center  col-span-1'>status</h2>
                <h2 className='text-center  col-span-1'>action</h2>
              </div>
            </div>

            {faqData.length >= 1
              ?
              faqData.map((items, index) => {
                return (
                  <div key={index} className='grid grid-cols-[40%_60%] justify-between items-center p-[20px] gap-2'>
                    <div className='flex gap-6 items-center'>
                      <input onChange={getCheckedValue} value={items._id} checked={ids.includes(items._id)} type="checkbox" className='scale-140 accent-blue-500' />
                      <h3 className='text-gray-300 text-[13px] uppercase font-medium'>{items.question}</h3>
                    </div>
                    <div className='grid  grid-cols-6 items-center text-gray-300 font-normal text-[14px]'>
                      <p className='text-left col-span-3 text-gray-400'>{items.answer}</p>
                      <h2 className='text-center col-span-1'>{items.order}</h2>
                      <div className='text-center col-span-1'>
                        {items.status
                          ?
                          <button className='bg-gradient-to-br from-green-400 to-green-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Active</button>
                          :
                          <button className='bg-gradient-to-br from-red-400 to-red-600 hover:bg-gradient-to-tl text-white text-[14px] h-[30px] px-[20px] rounded-[8px]'>Deactive</button>
                        }

                      </div>
                      <div className='text-center col-span-1 mx-auto'>
                        <Link to={`/faq/edit/${items._id}`}>
                        <button className='w-[40px] h-[40px] bg-blue-500 hover:bg-blue-700 flex justify-center items-center text-[18px] rounded-[50%]'><BiSolidPencil /></button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div className='grid grid-cols-1 justify-between items-center p-[20px] text-white'>No FAQ's List Found</div>

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
  )
}
