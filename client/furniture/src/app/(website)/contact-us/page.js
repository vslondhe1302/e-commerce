import React from 'react'
import ContactTop from './contact-components/ContactTop'
import ContactMap from './contact-components/ContactMap'
import ContactArea from './contact-components/ContactArea'

export default function Contact() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <ContactTop/>
      <ContactMap/>
      <ContactArea/>
    </div>
  )
}

