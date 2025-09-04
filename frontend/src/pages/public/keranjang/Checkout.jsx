import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../../utils/getToken'
import { Link } from 'react-router-dom'
import Input from '../../../components/elements/Input'
import WithLoading from '../../../components/Layout/WithLoading'
import { Card, Counter, useKeranjang } from '../Keranjang'
import { config } from '../../../config'
import { Key } from '@mui/icons-material'

const Checkout = () => {
	const [detailSelectedkeranjang, setDetailSelectedKeranjang] = useState([])
	const [loading, setLoading] = useState(false)
	const keranjangId = JSON.parse(sessionStorage.getItem('selectedIdKeranjang'))
	const { updateQuantity } = useKeranjang(config.API_URL, getToken());

	const now = new Date()
	now.setDate(now.getDate() + 3);
	const formattedNow = now.toLocaleDateString('id-ID', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).replace(/\//g, '-');

	useEffect(() => {
		if (!keranjangId) {
			window.location.href = '/keranjang'
		}
	}, [])

	function detailKeranjang(id) {
		axios.get(`${config.API_URL}/keranjang/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } })
			.then(res => setDetailSelectedKeranjang(prev => [...prev, res.data]))
			.catch(err => console.log(err))
	}

	useEffect(() => {
		async function fetchKeranjang() {
			setLoading(true)
			try {
				const responses = await Promise.all(
					keranjangId.map(id =>
						axios.get(`${config.API_URL}/keranjang/${id}`, {
							headers: { Authorization: `Bearer ${getToken()}` }
						})
					)
				);

				const data = responses.map(res => res.data.data);
				setDetailSelectedKeranjang(data);
				setLoading(false)
			} catch (err) {
				console.log(err);
			}
		}

		if (keranjangId?.length) {
			fetchKeranjang();
		}
	}, []);



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
				<Link to={'/keranjang'} className="cursor-pointer text-decoration-none !text-zinc-800 hover:text-indigo-500 transition">
					Keranjang
				</Link>
				<span className="mx-2">{'>'}</span>
				<span className="text-gray-400">Checkout</span>
			</div>

			<div>
				<h2>Checkout Keranjang Saya</h2>
				<div className="border-t border-t-zinc-400">
					<WithLoading loading={loading}>
						<div className="list-keranjang grid grid-cols-1 gap-4 py-12">
							<Input className="!rounded-lg border !py-1 text-zinc-500 !bg-zinc-200" value={formattedNow} type="text" disabled="true">Tanggal kembali</Input>
							{detailSelectedkeranjang?.map(item => (
								<div key={item.id}>
									<Card className="p-4 border border-zinc-200 rounded-md shadow-sm">
										<div className="flex items-start gap-3">
											{/* Konten Produk */}
											<div className="flex flex-1 gap-x-3">
												<img
													src={item.alat_foto}
													alt="produk"
													className="w-20 h-20 object-cover rounded-md"
												/>
												<div className="flex flex-col justify-center flex-1">
													<h4 className="!text-sm font-medium text-zinc-800 line-clamp-1 mb-0">
														{item.alat_name}
													</h4>
													<p className="!text-xs text-zinc-600 line-clamp-1 !mb-2">
														{item.alat_deskripsi}
													</p>
													<Counter
														value={item.qty}
														onChange={(newQty) => handleQtyChange(item.id, newQty)}
														className='!my-0'
													/>
												</div>
											</div>
										</div>
									</Card>
								</div>
							))}
						</div>
					</WithLoading>
				</div>
			</div>
			<footer className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-zinc-400 shadow-lg">
				<div className="w-11/12 sm:w-9/12 mx-auto flex justify-end">
					<button
						onClick={() => {}}
						className="max-w-fit py-2 px-3 !rounded-sm text-white !text-sm bg-indigo-600 hover:bg-indigo-500 duration-200"
					>
						Pinjam Sekarang
					</button>
				</div>
			</footer>
		</div>
	)
}

export default Checkout