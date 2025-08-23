import React from 'react'
import logo from '../../../src/assets/images/logo.png'
import { SupervisorAccountOutlined, HardwareOutlined, InboxOutlined } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom'
import SidebarLink from '../elements/SidebarLink';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	return (
		<aside className={`sidebar font-montserrat h-full fixed-top ${sidebarOpen == true ? "max-sm:left-0" : "max-sm:-left-48"}  transition-all duration-200 ease-in-out border shadow-sm w-64 h-[calc(100vh-5rem)] bg-white rounded-r-md rounded-b-md`}>
			<header className="logo grid place-items-center py-3">
                <img src={logo} className='w-24 md:w-42 h-auto' alt="" />
            </header>
			<ul className='px-3 h-fit flex flex-col py-3 gap-2 items-start'>
				<li className='text-gray-400 text-sm mt-7 mb-1 ml-4'>MASTER DATA</li>
				<SidebarLink to="/" icon={<HardwareOutlined fontSize='small'/>}>Alat</SidebarLink>
				<SidebarLink to="/admin" icon={<SupervisorAccountOutlined fontSize='small'/>}>Admin</SidebarLink>
				<SidebarLink to="/peminjaman" icon={<InboxOutlined fontSize='small'/>}>Peminjaman</SidebarLink>
			</ul>
			<div onClick={() => {setSidebarOpen(!!!sidebarOpen)}} className="p-2 absolute sm:hidden rounded-pill top-3 left-[90%] bg-indigo-600">
				<i className={`bi bi-caret-${sidebarOpen ? "left" : "right"} text-white`}></i>
			</div>
		</aside>
	)

}

export default Sidebar