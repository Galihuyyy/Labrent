import React from 'react'
import NavbarClient, { Profile } from '../../../components/fragments/NavbarClient'
import { Card } from '../Keranjang'
import WithLoading from '../../../components/Layout/WithLoading'
import { Link } from 'react-router-dom'

const Transaksi = () => {
	return (
		<>
			<NavbarClient withSearch={false} />
			<div className="w-11/12 sm:w-9/12 py-24 mx-auto font-[poppins] text-neutral-800">
				<div className="flex items-center text-gray-600 text-sm mb-3">
					<span className="cursor-pointer hover:text-indigo-500 transition" onClick={() => { window.location.href = "/" }}>
						Home
					</span>
					<span className="mx-2">{'>'}</span>
					<span className="text-gray-400">Peminjaman</span>
				</div>

				<div>
					<div className="!mb-6">
						<h4 className='!mb-0'>Peminjaman Saya</h4>
						<p className='text-xs text-zinc-600'>Menampilkan semua riwayat peminjaman</p>
					</div>

					<WithLoading loading={false}>
						<HistoryLayout title='Pending'>
							<HistoryList totalItem={1} tanggal={'20-4-2025'}>
							</HistoryList>	
						</HistoryLayout>	
						<HistoryLayout title='Success' type='success'>
							<HistoryList totalItem={1} tanggal={'20-4-2025'} status={"dikembalikan"}></HistoryList>	
							<HistoryList totalItem={1} tanggal={'20-4-2025'} status={"dipinjam"}></HistoryList>	
							<HistoryList totalItem={1} tanggal={'20-4-2025'} status={"ditolak"}></HistoryList>	
						</HistoryLayout>	

					</WithLoading>
				</div>
			</div>
		</>

	)
}

export default Transaksi


export const HistoryLayout = ({ children, title = '', type = 'pending'  }) => {
	const typeClassname = type == 'pending' ? '!text-yellow-700' : '!text-green-700'
	return (
		<div className="mb-6">
			<h6 className={`${typeClassname}`}>{title}</h6>
			<div className="flex flex-column gap-y-6">
				<Card className='flex-column'>
					{children}
				</Card>
			</div>
		</div>
	)
}
export const HistoryList = ({ totalItem, tanggal, status }) => {
	let statusClassname = ""

	switch (status) {
		case 'dipinjam':
			statusClassname = "!text-blue-900"
			break;
		case 'dikembalikan':
			statusClassname = "!text-green-900"
			break;
		case 'ditolak':
			statusClassname = "!text-red-800"
			break;
		default:
			statusClassname = "!text-yellow-700"
			break;
	}
	
	return (
		<Link className="w-full flex items-center justify-content-between duration-150 hover:bg-black/5 p-3 rounded">
			<div className='w-full flex items-center gap-x-3'>
				<Profile className={`!bg-transparent ${statusClassname} font-medium`} abjad={`${totalItem}`} />
				<div>
					<h1 className={`mb-0 !text-sm ${statusClassname}`}>{totalItem} Item</h1>
					<p className='mb-0 text-xs'>{tanggal}</p>
				</div>
			</div>
			<h4 className={`!text-sm mb-0 ${statusClassname}`}>{status}</h4>
		</Link>
	)
}