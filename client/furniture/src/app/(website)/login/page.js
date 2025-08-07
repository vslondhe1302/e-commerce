import React from 'react'
import LogInTop from './login-components/LogInTop'
import LogInArea from './login-components/LogInArea'

export default function Login() {
  return (
    <div className='lg:pb-[65px] lg:px-0 px-[10px] border-b-[0.1px] border-gray-200'>
      <LogInTop/>
      <LogInArea/>
    </div>
  )
}

