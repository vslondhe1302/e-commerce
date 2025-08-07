import React from 'react'
import WelcomeMonsta from './about-components/WelcomeMonsta'
import WhychooseUs from './about-components/WhychooseUs'
import AboutGallery from './about-components/AboutGallery'
import Testimonial from './about-components/Testimonial'
import AboutTop from './about-components/AboutTop'

export default function AboutUs() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <AboutTop/>
      <WelcomeMonsta/>
      <WhychooseUs/>
      <AboutGallery/>
      <Testimonial/>
     
    </div>
  )
}

