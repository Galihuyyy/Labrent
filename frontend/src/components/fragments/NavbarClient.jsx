import React from 'react'
import logo from '../../assets/images/logo.png'
import { Search } from '@mui/icons-material'


const NavbarClient = ({ withSearch = false }) => {
	const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))

	return (
		<nav className='w-full bg-neutral-100 fixed-top flex items-center justify-content-between gap-x-6 px-12 h-18'>
			<div className="w-full flex items-center justify-content-between border-r border-r-zinc-400 pr-6 gap-x-12">
				<div className="icon">
					<img src={logo} alt="labrent logo" width={144} />
				</div>
				<div className={`search-field flex items-center rounded outline outline-zinc-400 gap-x-2 px-2 py-1 w-full ${!withSearch ? 'opacity-0' : ''}`}>
					<Search sx={{ fontSize: '24px' }} />
					<input type="text" className='focus:outline-0 w-full' />
				</div>
			</div>
			<div className="profile flex align-items-center gap-x-2">
				<div className="profile-picture bg-indigo-800 border border-neutral-400 text-white w-8 h-8 rounded-full grid place-items-center text-lg">
					{users?.profile.name.charAt(0)}
				</div>
				<div className="detail text-sm">
					<h6 className='m-0'>{users?.profile.name}</h6>
					<p className='m-0 text-xs'>{users?.email}</p>
				</div>
			</div>
		</nav>
	)
}

export default NavbarClient