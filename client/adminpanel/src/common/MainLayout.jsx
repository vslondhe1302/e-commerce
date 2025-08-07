import React from 'react'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div>
      <Dashboard/>
      <Outlet/>
    </div>
  )
}
