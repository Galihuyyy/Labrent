import React, { useEffect } from 'react'
import NavbarClient, { Profile } from '../../../components/fragments/NavbarClient'
import { Card } from '../Keranjang'
import WithLoading from '../../../components/Layout/WithLoading'
import { Link } from 'react-router-dom'
import { usePeminjaman } from '../../../hooks/HookPeminjaman'
import no_data from "../../../assets/images/no-data-2.png"
import Button from '../../../components/elements/Button'
import { Key } from '@mui/icons-material'

const Transaksi = () => {
	// Variables
	const positiveStatus = ["dipinjam", "dikembalikan", 'ditolak', "expired"];

	// State
	const { loading, dataPeminjaman, getPeminjaman } = usePeminjaman()
	const pendingData = dataPeminjaman?.filter(item => item.status === 'pending')
	const successData = dataPeminjaman?.filter(item => positiveStatus.includes(item.status))

	// Mounted
	useEffect(() => {
		getPeminjaman(true)
	}, [])

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

					<WithLoading loading={loading}>
						<div className="min-h-64">
							{pendingData?.length > 0 &&
								<HistoryLayout title='Pending'>
									{pendingData.map(item => (
										<HistoryList to={`/peminjaman/${item.id}`} key={item.id} totalItem={item.transaksi_details?.length || 0} tanggal={item.tanggal_pinjam} status={item.status} />
									))}
								</HistoryLayout>
							}
							{successData?.length > 0 &&
								<HistoryLayout title='Riwayat' type='secondary'>
									{successData.map(item => (
										<HistoryList to={`/peminjaman/${item.id}`} key={item.id} totalItem={item.transaksi_details?.length || 0} tanggal={item.tanggal_pinjam} status={item.status} />
									))}
								</HistoryLayout>
							}
							{(!loading && !dataPeminjaman || dataPeminjaman?.length === 0) &&
								<div className="w-full grid place-items-center mt-12">
									<img src={no_data} alt="tidak ada data" width={360} className='opacity-50' />
									<p className='text-sm text-zinc-700 font-medium !mt-6 mb-0'>Ups! tidak ada riwayat transaksi.</p>
									<p className='text-sm text-zinc-500 font-light'>Mulailah melakukan peminjaman untuk dapat melihat riwayat peminjaman!</p>
									<Link to={'/'}>
										<Button variant="secondary !bg-zinc-200 !w-fit !text-xs !text-zinc-700 hover:!bg-zinc-300 duration-200">Mulai Meminjam</Button>
									</Link>
								</div>
							}
						</div>

					</WithLoading>
				</div>
			</div>
		</>

	)
}

export default Transaksi


export const HistoryLayout = ({ children, title = '', type = 'pending' }) => {
	const typeClassname = type == 'pending' ? '!text-yellow-700' : type == 'success' ? '!text-green-700' : '!text-gray-700'
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
export const HistoryList = ({ totalItem, tanggal, status, to = "" }) => {
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
		case 'expired':
			statusClassname = "!text-red-800"
			break;
		case 'pending':
			statusClassname = "!text-yellow-700"
			break;
		default:
			statusClassname = "!text-gray-700"
			break;
	}

	return (
		<Link to={to} className="w-full flex items-center justify-content-between duration-150 hover:bg-black/5 p-3 rounded">
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