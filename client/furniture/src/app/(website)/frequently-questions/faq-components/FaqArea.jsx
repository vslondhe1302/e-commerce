"use client"
import React, { useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { questions } from '../questions/Questions';

export default function FaqArea() {

    let [currentQuesId, setCurrentQuesId] = useState(1)

    return (

        <div className='w-[100%] lg:pb-[70px] pb-[40px]'>
            <div className='max-w-[1320px] mx-auto'>
                <div className='faq-area'>

                    {questions.map((items, index) => {
                        return (
                            <div className='lg:mb-[10px] mb-[7px] '>
                                <div onClick={() => setCurrentQuesId(currentQuesId == items.id ? 0 : items.id)} 
                                className={`${currentQuesId == items.id ? "border-[0.1px] border-[var(--border_color)]" : "border-[0.1px] border-gray-50"} flex items-center justify-between bg-[var(--lg_bg_color)] lg:py-[6px] py-[4px] lg:px-[14px] px-[8px] rounded-[4px] cursor-pointer`}>
                                    <h3 className={`${currentQuesId == items.id ? "text-[var(--secondary_text_color)]" : "text-[var(--primary_text_color)]"} duration-300 ease-in-out lg:text-[14px] text-[12px] lg:leading-[38px] leading-[28px] font-[700] font-[font-playfair] `}>
                                        {items.question}
                                    </h3>

                                    {currentQuesId == items.id ?
                                        <HiMinus className='lg:text-[18px] text-[14px] text-[var(--gray_text_color)] lg:leading-[33px] leading-[28px]' />
                                        :
                                        <HiPlus className='lg:text-[18px] text-[14px] text-[var(--gray_text_color)] lg:leading-[33px] leading-[28px]' />
                                    }
                                </div>

                                <div className={` ${currentQuesId == items.id ? ' border-[0px_0.1px_0.1px_0.1px] border-[var(--border_color)] max-h-[200px]'
                                     : 'max-h-[0px] opacity-0 border-none'} overflow-hidden duration-300 ease-in-out `}>
                                    <p className={`lg:p-[16px] p-[10px] lg:text-[14px] text-[11px] lg:leading-[24px] leading-[18px] text-[var(--gray_text_color)]`}>
                                        {items.answer}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>

    )
}
