// src/components/fragments/NavbarClient.jsx
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { ChevronRightOutlined, Receipt, Search, ShoppingCartOutlined } from '@mui/icons-material';

const NavbarClient = ({ withSearch = false, onInputSearch, onClickSearch }) => {
  const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
  const [openSearch, setOpenSearch] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const inputSearchRef = useRef(null);
  const profileRef = useRef(null);
  const toggleProfileRef = useRef(null);

  useEffect(() => {
    if (openSearch && inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, [openSearch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target) && toggleProfileRef.current && !toggleProfileRef.current.contains(e.target)) {
        setProfileClick(false);
      }
    }

    if (profileClick) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, [profileClick]);

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-10 flex items-center justify-between px-6 md:px-12 h-16 md:h-18 shadow">
      <div className="w-full flex items-center justify-between sm:border-r border-r-zinc-400 sm:pr-6 sm:mr-6 gap-x-12 ">
        <div className="icon">
          <img src={logo} alt="labrent logo" className={`${withSearch ? 'w-22 sm:w-46' : 'w-22 sm:w-34'}`} />
        </div>
        <div className={`search-field flex items-center rounded sm:outline sm:outline-zinc-400 gap-x-2 px-2 py-1 sm:w-full ${!withSearch ? "hidden" : "block"}`}>
          <Search onClick={() => { setOpenSearch(!openSearch) }} sx={{ fontSize: "24px" }} className="sm:!hidden cursor-pointer" />
          <div className={`max-sm:bg-white max-sm:absolute duration-200 top-full ${openSearch ? "h-fit" : "max-sm:h-0 max-sm:!py-0 max-sm:overflow-hidden"} left-0 w-full max-sm:px-6 max-sm:py-3 z-0`}>
            <div className="max-sm:outline max-sm:outline-zinc-400 w-full h-fit flex items-center rounded pr-2">
              <input
                ref={inputSearchRef}
                id='search'
                onChange={(e) => { onInputSearch?.(e.target.value) }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setOpenSearch(false);
                    inputSearchRef.current.blur();
                    onClickSearch?.();
                  }
                }}
                type="text"
                className="focus:outline-0 rounded w-full px-3 max-sm:py-1 sm:order-2"
              />
              <Search sx={{ fontSize: "24px" }} onClick={() => { onClickSearch?.() }} />
              <button type='button' className='hidden sm:block sm:order-3' onClick={() => { onClickSearch?.() }}>cari</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center cursor-pointer relative" onClick={() => { setProfileClick(!profileClick) }} ref={toggleProfileRef}>
        <Profile abjad={users?.profile?.name} />
        <ChevronRightOutlined className='text-black/75 rotate-90' />

        <div ref={profileRef} className={`bg-white rounded-sm border border-black/50 absolute duration-200 ${profileClick ? 'top-[130%] opacity-100 pointer-events-auto' : 'top-[100%] opacity-0 pointer-events-none'} right-0 w-52 sm:w-60 shadow-sm`}>
          <div className="header p-3 border-b border-b-black/50 flex flex-column items-center">
            <Profile abjad={users?.profile?.name} />
            <p className='m-0 text-sm font-medium'>{users?.profile?.name}</p>
            <p className='m-0 text-xs'>{users?.email}</p>
          </div>
          <div className="body flex items-start flex-column">
            <a href='/keranjang' className='text-sm !no-underline !text-black/75 hover:bg-neutral-100 w-full px-3 py-2.5'>
              <ShoppingCartOutlined sx={{ fontSize:'22px' }}/>
              <span className="ml-2">Keranjang Saya</span>
            </a>
            <a className='text-sm !no-underline !text-black/75 hover:bg-neutral-100 w-full px-3 py-2.5'><Receipt sx={{ fontSize:'22px' }}/> <span className="ml-2">Peminjaman Saya</span></a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarClient

export const Profile = ({ abjad }) => (
  <div className="profile-picture bg-indigo-800 border border-neutral-400 text-white w-9 h-9 rounded-full text-lg flex items-center justify-content-center">
    <p className='m-0'>{abjad?.charAt(0)}</p>
  </div>
);
