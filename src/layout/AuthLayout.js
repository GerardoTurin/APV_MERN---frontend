import React from 'react'
import { Outlet } from 'react-router-dom'
const authLayout = () => {
  return (
    <>
    <main className='container mx-auto row row-cols-md-2 mt-xl-5'>
      <Outlet />
    </main>
    </>
  )
}

export default authLayout