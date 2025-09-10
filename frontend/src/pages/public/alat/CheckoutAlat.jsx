import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../../utils/getToken'
import { Link } from 'react-router-dom'
import Input from '../../../components/elements/Input'
import WithLoading from '../../../components/Layout/WithLoading'
import { Card, Counter, useKeranjang } from '../Keranjang'
import { config } from '../../../config'
import { Key } from '@mui/icons-material'
import Badge from '../../../components/elements/Badge'

const CheckoutAlat = () => {
	const [detailSelectedAlat, setDetailSelectedAlat] = useState([])
	const [loading, setLoading] = useState(false)
	const selectedAlat = JSON.parse(sessionStorage.getItem('selectedIdAlat'))
	const { updateQuantity } = useKeranjang(config.API_URL, getToken());

	const now = new Date()
	now.setDate(now.getDate() + 3);
	const formattedNow = now.toLocaleDateString('id-ID', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).replace(/\//g, '-');

	useEffect(() => {
		if (!selectedAlat.id) {
			window.location.href = '/'
		}
	}, [])

	function detailAlat(id) {
		axios.get(`${config.API_URL}/home/alat/${id}`, {
			headers: { Authorization: `Bearer ${getToken()}` }
		})
			.then(res => {
				setDetailSelectedAlat(res.data.data);
				console.log(res.data.data);
			})
			.catch(err => console.error("API error:", err));
	}


	useEffect(() => {
		if (selectedAlat.id) {
			detailAlat(selectedAlat.id);
		}
	}, [selectedAlat.id]);



	const handleQtyChange = (id, newQty) => {
		updateQuantity(id, newQty);
	};

	return (
		<div className="w-11/12 sm:w-9/12 py-24 mx-auto font-[poppins] text-neutral-800">
			<div className="flex items-center text-gray-600 text-sm mb-3">
				<Link to={'/'} className="cursor-pointer text-decoration-none !text-zinc-800 hover:text-indigo-500 transition">
					Home
				</Link>
				<span className="mx-2">{'>'}</span>
				<Link to={`/detail/${detailSelectedAlat.id}`} className="cursor-pointer text-decoration-none !text-zinc-800 hover:text-indigo-500 transition">
					{detailSelectedAlat.name}
				</Link>
				<span className="mx-2">{'>'}</span>
				<span className="text-gray-400">Checkout</span>
			</div>

			<div>
				<h2>Checkout {detailSelectedAlat.name}</h2>
				<div className="border-t border-t-zinc-400">
					<WithLoading loading={loading}>
						<div className="list-keranjang grid grid-cols-1 gap-4 py-12">
							<div className="text-sm flex items-center">
								<p className='m-0'>Tanggal Kembali <span className='mx-2'>:</span></p>
								<Badge variant={'warning'} className="m-0 !mt-0">{formattedNow}</Badge>
							</div>
							<div>
								<Card className="p-4 border border-zinc-200 rounded-md shadow-sm">
									<div className="flex items-start gap-3">
										{/* Konten Produk */}
										<div className="flex flex-1 gap-x-3">
											<img
												src={detailSelectedAlat.foto_alat}
												alt="produk"
												className="w-20 h-20 object-cover rounded-md"
											/>
											<div className="flex flex-col justify-center flex-1">
												<h4 className="!text-sm font-medium text-zinc-800 line-clamp-1 mb-0">
													{detailSelectedAlat.name}
												</h4>
												<p className="!text-xs text-zinc-600 line-clamp-1 !mb-2">
													{detailSelectedAlat.deskripsi}
												</p>
												<p className='text-zinc-500 ms-2 font-medium text-sm'>{`${selectedAlat.qty} x`}</p>
											</div>
										</div>
									</div>
								</Card>
							</div>
						</div>
					</WithLoading>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-zinc-400 shadow-lg">
				<div className="w-11/12 sm:w-9/12 mx-auto flex justify-end">
					<button
						onClick={() => { }}
						className="max-w-fit py-2 px-3 !rounded-sm text-white !text-sm bg-indigo-600 hover:bg-indigo-500 duration-200"
					>
						Pinjam Sekarang
					</button>
				</div>
			</footer>
		</div>
	)
}

export default CheckoutAlat