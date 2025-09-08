import React from 'react'
import ProductDetailArea from '../productDetailComponents/ProductDetailArea'
import ProductDetailTop from '../productDetailComponents/ProductDetailTop'

export default function ProductDetails() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <ProductDetailTop/>
      <ProductDetailArea/>
    </div>
  )
}

