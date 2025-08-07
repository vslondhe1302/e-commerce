import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'

export default function Addfaq() {
    let {id} = useParams()
    
    let navigate = useNavigate()
    let [faqData, setFaqData] = useState(
        {
        question : '',
        answer : '',
        order : ''
        })

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    let saveFaq = (event) =>{

        if(id){
            axios.put(`${apiBaseUrl}faq/update/${id}`,faqData)
            .then((res)=>res.data)
            .then((finalRes)=>{
                if(finalRes.status){
                toast.success(finalRes.msg)
                setFaqData({
                    question:'',
                    answer:'',
                    order:''
                })
                setTimeout(()=>{
                    navigate('/faq/view')
                },2000)
            }
            })
        }
        else{
            axios.post(`${apiBaseUrl}faq/add`,faqData)
        .then((res)=>res.data)
        .then((finalRes)=>{
            if(finalRes.status){
                toast.success(finalRes.msg)
                setFaqData({
                    question:'',
                    answer:'',
                    order:''
                })
                setTimeout(()=>{
                    navigate('/faq/view')
                },2000)
            }
        })
        }
    
        event.preventDefault()
    }

    useEffect(()=>{
        setFaqData({
            question:'',
            answer:'',
            order:''
        })
        if(id){
            axios.get(`${apiBaseUrl}faq/single-faq/${id}`)
            .then((res)=>res.data)
            .then((finalRes)=>{
                console.log(finalRes.singleRes);
                setFaqData({
                    question:finalRes.singleRes.question,
                    answer:finalRes.singleRes.answer,
                    order:finalRes.singleRes.order
                })
            })
        }
    },[id])
  return (
    <div>
        <ToastContainer/>
    <div className='flex px-[20px] py-[12px] border-b-[2.2px] border-b-gray-200'>
              <div className='font-medium text-gray-600'>Home <span className='text-gray-600'>/ FAQ /</span>
                  <span className='text-gray-800'> {id ? 'Edit' : 'Add'}</span>
              </div>
          </div>
          <div className='px-[20px] py-[20px]'>
              <div className=' border-[0.1px] border-gray-300 rounded-[8px]'>
                  <div className='flex justify-between border-b-[0.1px] py-[12px] px-[20px] bg-gray-200 rounded-[8px] border-b-gray-300'>
                      <h2 className='text-[22px] font-medium'>{id ? 'Edit':'Add'} FAQ</h2>
                  </div>

                  <form onSubmit={saveFaq} className='py-[20px] px-[15px] items-center gap-4 rounded-[10px]'>
                      <div className='mb-[20px]'>
                          <label htmlFor="" className='pb-[6px] block font-medium'>Question</label>
                          <input onChange={(e)=>{
                            let obj = {...faqData}
                            obj['question'] = e.target.value
                            setFaqData(obj)
                          }} type="text" placeholder='Question' value={faqData.question} name="question" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                      </div>
                      <div className='mb-[20px]'>
                          <label htmlFor="" className='pb-[6px] block font-medium'>Answer</label>
                          <textarea onChange={(e)=>{
                            let obj = {...faqData}
                            obj['answer'] = e.target.value
                            setFaqData(obj)
                          }} type="text" placeholder='Answer' value={faqData.answer} name="answer" id="" className='px-[12px] w-[100%] h-[120px] rounded-[6px] text-gray-800 border-2 border-gray-300' >
                          </textarea>
                      </div>
                      <div className='mb-[50px]'>
                          <label htmlFor="" className='pb-[6px] block font-medium'>Order</label>
                          <input onChange={(e)=>{
                            let obj = {...faqData}
                            obj['order'] = e.target.value
                            setFaqData(obj)
                          }} type="text" placeholder='Order' value={faqData.order} name="order" id="" className='px-[12px] w-[100%] h-[45px] rounded-[6px] text-gray-800 border-2 border-gray-300' />
                      </div>
                      <div className='mb-[20px]'>
                          <button type='submit' className='bg-violet-600 text-white font-medium h-[40px] px-[12px] rounded-[10px]'>
                            {id ? 'Update' : 'Add'} FAQ
                        </button>
                      </div>
                  </form>
              </div>
          </div>
  </div>
  )
}
