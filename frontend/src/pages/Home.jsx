import React, { useEffect, useState } from 'react'
import Navbar from '../components/fragments/Navbar'
import Alat from './private/Alat/Alat'
import { ProductList } from './public/alat/ProductList'
import useUser from '../hooks/HookUser'

export const Home = () => {

  const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))
  const {fixRole, getUser} = useUser()
  useEffect(() => {
    getUser()
  }, [])
  
  return (
    <div className='font-[poppins] bg-neutral-100 min-h-svh'>
        {fixRole == "siswa" &&
          <ProductList/>
        }
        
        {fixRole == "admin" && 
          <Alat/>
        }
    </div>
  )
}
