import React, { useEffect, useState } from 'react'
import Navbar from '../components/fragments/Navbar'
import Alat from './private/Alat/Alat'
import { ProductList } from './public/alat/ProductList'

export const Home = () => {

  const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))
  const role = localStorage.getItem('role') || sessionStorage.getItem('role')
  
  return (
    <div className='font-[poppins] bg-neutral-100 min-h-svh'>
        {role == "siswa" &&
          <ProductList/>
        }
        
        {role == "admin" && 
          <Alat/>
        }
    </div>
  )
}
