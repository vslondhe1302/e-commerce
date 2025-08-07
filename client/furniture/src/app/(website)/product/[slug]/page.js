import React from 'react'
import ProductDetailTop from '../productDetailComponents.jsx/ProductDetailTop'
import ProductDetailArea from '../productDetailComponents.jsx/ProductDetailArea'

export default function ProductDetails() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <ProductDetailTop/>
      <ProductDetailArea/>
    </div>
  )
}

