import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer className=' bottom-[0px] right-0 mt-[150px] w-[100%] py-[20px] px-[20px] border-t-[2px] border-t-gray-300'>
            <div className='flex justify-between '>
              <p className='text-[14px]'>&copy; 2025 <span className='hover:underline'>WsCube Tech™</span>. All Rights Reserved.</p>
              <h3 className='text-[14px] font-medium text-gray-600 hover:underline cursor-pointer'>Design By <span className='text-blue-400'>WsCube Tech</span></h3>
            </div>
          </footer>
    </div>
  )
}
