import React from 'react'
import FaqTop from './faq-components/FaqTop'
import FaqArea from './faq-components/FaqArea'

export default function FAQ() {
  return (
    <div className=' lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <FaqTop/>
      <FaqArea/>
    </div>
  )
}

