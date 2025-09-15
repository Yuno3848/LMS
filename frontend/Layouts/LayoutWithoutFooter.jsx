import React from 'react'
import { Outlet } from 'react-router'

const LayoutWithoutFooter = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default LayoutWithoutFooter
