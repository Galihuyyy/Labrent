import React from 'react'

const PopUpLogout = ({show, setShow, onLogout}) => {
	return (
		<div className={`${show ? "" : "hidden"} absolute z-50 top-0 left-0 bg-[rgba(0,0,0,.4)] w-full h-screen flex items-center justify-center`}>
			<div className=" px-6 py-5 bg-white rounded border">
				<p className="mb-0 text-xl text-neutral-700">Kamu yakin mau log out?</p>
				<div className="flex items-center justify-around mt-3">
					<button className="btn btn-outline-secondary" onClick={() => { setShow(false) }}>Engga</button>
					<button className="btn btn-outline-danger" onClick={onLogout}>Yakin ko</button>
				</div>
			</div>
		</div>
	)
}

export default PopUpLogout