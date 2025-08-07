"use client"
import React from 'react'
import CartTop from './cart-components/CartTop'
import CartArea from './cart-components/CartArea'
import CartCouponArea from './cart-components/CartCouponArea'
import { useSelector } from 'react-redux'
import { store } from '@/app/store/store'

export default function Cart() {
  let cart = useSelector((store) => store.cart.cart)
  let imagePath = useSelector((store) => store.cart.imagePath)

  return (
    <div className='lg:pb-[65px] sm:pb-[45px] pb-[35px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <CartTop />
      {cart.length == 0
        ?
        <div>
          <figure>
            <img src="/images/my-Order.jpg" className='mx-auto lg:w-[324px] sm:w-[280px] w-[180px]' alt="" />
          </figure>
          <div className='lg:text-[14px] text-[12px] leading-[24px] font-[500] text-[var(--gray_text_color)] text-center'>
            Your shopping cart is empty!
          </div>
        </div>
        :
        <>
          <CartArea cartData={cart} imagePath={imagePath} />
          <CartCouponArea cartData={cart} />
        </>
      }
    </div>
  )
}

