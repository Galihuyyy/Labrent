import React from 'react'
import logo from '../../../src/assets/images/logo.png'
import { SupervisorAccountOutlined, HardwareOutlined, InboxOutlined } from '@mui/icons-material';
import { Link, NavLink } from 'react-router-dom'
import SidebarLink from '../elements/SidebarLink';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	return (
		<div>
			{/* BACKDROP */}
			{sidebarOpen && (
				<div
					className="bg-black/50 fixed inset-0 z-40"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* SIDEBAR */}
			<aside
				className={`sidebar font-montserrat fixed top-0 z-50 ${sidebarOpen ? "max-lg:left-0" : "max-lg:-left-full"
					} duration-400 ease-in-out border shadow-sm w-64 h-svh bg-white rounded-r-md rounded-b-md`}
			>
				<header className="logo grid place-items-center py-3">
					<img src={logo} className="w-24 md:w-42 h-auto" alt="" />
				</header>
				<ul className="px-3 h-fit flex flex-col py-3 gap-2 items-start">
					<li className="text-gray-400 text-sm mt-7 mb-1 ml-4">MASTER DATA</li>
					<SidebarLink to="/" icon={<HardwareOutlined fontSize="small" />}>
						Alat
					</SidebarLink>
					<SidebarLink to="/admin" icon={<SupervisorAccountOutlined fontSize="small" />}>
						Admin
					</SidebarLink>
					<SidebarLink to="/peminjaman" icon={<InboxOutlined fontSize="small" />}>
						Peminjaman
					</SidebarLink>
				</ul>

				{/* TOGGLE BTN */}
				<div
					onClick={() => setSidebarOpen(false)}
					className="p-2 absolute sm:hidden rounded-full top-3 left-[90%] bg-indigo-600 cursor-pointer"
				>
					<i className={`bi bi-caret-left text-white`}></i>
				</div>
			</aside>
		</div>

	)

}

export default Sidebar