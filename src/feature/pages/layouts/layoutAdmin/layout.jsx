import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../../../components/sidebar/sidebarAdmin'

export const Layout = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  )
}


