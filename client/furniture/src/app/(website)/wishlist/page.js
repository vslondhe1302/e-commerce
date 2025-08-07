import React from 'react'
import WishlistTop from './wishlist-components/WishlistTop'
import WishlistArea from './wishlist-components/WishlistArea'


export default function Wishlist() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <WishlistTop/>
      <WishlistArea/>
      
    </div>
  )
}

