import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Search } from '@mui/icons-material'
import useAlat from '../../hooks/HookAlat'


const NavbarClient = ({ withSearch = false, onInputSearch, onClickSearch }) => {
	const [openSearch, setOpenSearch] = useState(false)
	const inputSearchRef = useRef(null)
	const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))

	useEffect(() => {
		if (openSearch && inputSearchRef.current) {
			inputSearchRef.current.focus();
		}
	}, [openSearch]);

	return (
		<nav className="w-full bg-white fixed top-0 left-0 z-10 flex items-center justify-between px-6 md:px-12 h-16 md:h-18 shadow">
			<div className="w-full flex items-center justify-between sm:border-r border-r-zinc-400 sm:pr-6 sm:mr-6 gap-x-12 ">
				<div className="icon">
					<img src={logo} alt="labrent logo" className="w-26 sm:w-46" />
				</div>
				<div
					className={`search-field flex items-center rounded sm:outline sm:outline-zinc-400 gap-x-2 px-2 py-1 sm:w-full ${!withSearch ? "opacity-0" : ""
						}`}
				>
					<Search
						onClick={() => { setOpenSearch(!openSearch) }}
						sx={{ fontSize: "24px" }}
						className="sm:!hidden cursor-pointer"
					/>
					<div
						className={`max-sm:bg-white max-sm:absolute duration-200 top-full ${openSearch
								? "h-fit"
								: "max-sm:h-0 max-sm:!py-0 max-sm:overflow-hidden"
							} left-0 w-full max-sm:px-6 max-sm:py-3 z-0`}
					>
						<div className="max-sm:outline max-sm:outline-zinc-400 w-full h-fit flex items-center rounded pr-2">
							<input
								ref={inputSearchRef}
								id='search'
								onChange={(e) => {onInputSearch(e.target.value)}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										setOpenSearch(false)
										inputSearchRef.current.blur()
										onClickSearch();
									}
								}}
								type="text"
								className="focus:outline-0 rounded w-full px-3 max-sm:py-1 sm:order-2"
							/>
							<Search sx={{ fontSize: "24px" }} onClick={() => {onClickSearch()}} />
							<button type='button' className='hidden sm:block sm:order-3' onClick={() => {onClickSearch()}}>cari</button>
						</div>
					</div>
				</div>
			</div>

			<div className="profile flex items-center gap-x-2">
				<div className="profile-picture bg-indigo-800 border border-neutral-400 text-white w-9 h-9 rounded-full grid place-items-center text-lg">
					{users?.profile.name.charAt(0)}
				</div>
				<div className="detail text-sm hidden md:block">
					<h6 className="m-0">{users?.profile.name}</h6>
					<p className="m-0 text-xs">{users?.email}</p>
				</div>
			</div>
		</nav>

	)
}

export default NavbarClient