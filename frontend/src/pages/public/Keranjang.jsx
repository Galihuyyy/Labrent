import React, { useEffect, useState } from 'react'
import NavbarClient from '../../components/fragments/NavbarClient'
import WithLoading from '../../components/Layout/WithLoading'
import { config } from '../../config'
import { Token } from '@mui/icons-material'
import { getToken } from '../../utils/getToken'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Keranjang = () => {
	const {
		keranjang,
		selectedIds,
		selectAll,
		toggleSelect,
		toggleSelectAll,
		loading,
		checkout,
		getKeranjang,
		setSelectedIds,
		updateQuantity
	} = useKeranjang(config.API_URL, getToken());

	const handleDelete = async () => {
		console.log(selectedIds);
		try {
			await axios.delete(`${config.API_URL}/keranjang/delete`, {
				params: { ids: selectedIds },
				headers: { Authorization: `Bearer ${getToken()}` },
			});


			getKeranjang();
			setSelectedIds([]);
			toast.success("Keranjang berhasil dihapus");
		} catch (error) {
			toast.error("Gagal hapus keranjang");
		}
	};

	// Handler untuk perubahan quantity
	const handleQtyChange = (id, newQty) => {
		updateQuantity(id, newQty);
	};

	return (
		<>
			<NavbarClient withSearch={false} />
			<div className="w-11/12 sm:w-9/12 py-24 mx-auto font-[poppins] text-neutral-800">
				{/* Breadcrumb */}
				<div className="flex items-center text-gray-600 text-sm mb-3">
					<span className="cursor-pointer hover:text-indigo-500 transition" onClick={() => { window.location.href = "/" }}>
						Home
					</span>
					<span className="mx-2">{'>'}</span>
					<span className="text-gray-400">keranjang</span>
				</div>

				<div>
					<h2>Keranjang Saya</h2>
					<div className="flex flex-column gap-y-6">
						{/* Select All Card */}
						<Card>
							<div className="w-full flex items-center justify-between">
								<label className="!flex items-center gap-3 cursor-pointer select-none">
									<input
										type="checkbox"
										checked={selectAll}
										onChange={toggleSelectAll}
										className="peer hidden"
									/>
									<span className="w-5 h-5 rounded-[4px] border border-zinc-800 grid place-content-center peer-checked:bg-zinc-800 peer-checked:border-zinc-800 peer-checked:!text-white transition">
										<i className="bi bi-check text-white"></i>
									</span>
									<span className="text-sm font-medium text-zinc-800">
										Select All ({selectedIds.length} terpilih)
									</span>
								</label>

								<button
									type="button"
									className={`${selectedIds.length > 0 ? 'opacity-100' : 'opacity-0'} px-2 py-1 lg:!px-4 lg:!py-2 rounded-pill bg-zinc-800 text-white hover:bg-zinc-700 active:bg-zinc-900 transition !text-sm font-medium`}
									onClick={() => { handleDelete() }}
									disabled={selectedIds.length === 0}
								>
									Delete ({selectedIds.length})
								</button>
							</div>
						</Card>

						{/* List Keranjang */}
						<WithLoading loading={loading}>
							<div className="list-keranjang grid grid-cols-1 gap-4">
								{keranjang?.map(item => (
									<Card key={item.id} className="p-4 border border-zinc-200 rounded-md shadow-sm">
										<div className="flex items-start gap-3">
											{/* Checkbox Item */}
											<label className="inline-flex items-center gap-2 mt-6 cursor-pointer select-none">
												<input
													type="checkbox"
													checked={selectedIds.includes(item.id)}
													onChange={() => toggleSelect(item.id)}
													className="peer hidden"
												/>
												<span className="w-5 h-5 rounded-[4px] border border-zinc-800 grid place-content-center peer-checked:bg-zinc-800 peer-checked:border-zinc-800 transition">
													<i className="bi bi-check text-white"></i>
												</span>
											</label>

											{/* Konten Produk */}
											<div className="flex flex-1 gap-x-3">
												<Link to={`/keranjang/${item.id}`}>
													<img
														src={item.alat_foto}
														alt="produk"
														className="w-20 h-20 object-cover rounded-md"
													/>
												</Link>
												<div className="flex flex-col justify-center flex-1">
													<Link to={`/keranjang/${item.id}`}>
														<h4 className="!text-sm font-medium text-zinc-800 line-clamp-1 mb-0">
															{item.alat_name}
														</h4>
														<p className="!text-xs text-zinc-600 line-clamp-1 !mb-2">
															{item.alat_deskripsi}
														</p>
													</Link>
													<Counter
														value={item.qty} // Nilai default dari database
														onChange={(newQty) => handleQtyChange(item.id, newQty)}
														className='!my-0'
													/>
												</div>
											</div>
										</div>
									</Card>
								))}
							</div>
						</WithLoading>

						{/* Checkout Button */}
						<footer className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t border-zinc-400 shadow-lg">
							<div className="w-11/12 sm:w-9/12 mx-auto flex justify-end">
								<button
									disabled={selectedIds.length <= 0}
									onClick={checkout}
									className="max-w-fit py-2 px-3 !rounded-sm text-white !text-sm bg-indigo-600 duration-200 not-disabled:hover:bg-indigo-500 transition disabled:opacity-75 disabled:cursor-not-allowed"
								>
									Checkout ({selectedIds.length} items)
								</button>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</>
	);
};
export default Keranjang


export const useKeranjang = (apiUrl, token) => {
	const [loading, setLoading] = useState(false);
	const [keranjang, setKeranjang] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);

	const selectAll = selectedIds.length > 0 && selectedIds.length === keranjang.length;

	const getKeranjang = async () => {
		try {
			setLoading(true);
			const res = await axios.get(`${apiUrl}/keranjang`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setKeranjang(res.data.data);
		} catch (error) {
			console.error("Gagal ambil keranjang:", error);
		} finally {
			setLoading(false);
		}
	};

	const toggleSelect = (id) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const toggleSelectAll = () => {
		if (selectAll) {
			setSelectedIds([]);
		} else {
			setSelectedIds(keranjang.map(item => item.id));
		}
	};

	// Fungsi untuk update quantity di server
	const updateQuantity = async (id, newQty) => {
		try {
			await axios.post(
				`${apiUrl}/keranjang/update-qty`,
				{ id, qty: newQty },
				{ headers: { Authorization: `Bearer ${token}` } }
			);

			// Update state lokal
			setKeranjang(prev => prev.map(item =>
				item.id === id ? { ...item, qty: newQty } : item
			));

		} catch (error) {
			console.error("Gagal update quantity:", error);
			// Optional: Tampilkan error ke user
		}
	};

	const checkout = async () => {
		try {
			setLoading(true);
			sessionStorage.getItem('selectedIdKeranjang') ? sessionStorage.removeItem('selectedIdKeranjang') : ''
			sessionStorage.setItem('selectedIdKeranjang', JSON.stringify(selectedIds))
		} catch (error) {
			console.error("Gagal checkout:", error);
		} finally {
			setLoading(false);
			setTimeout(function () {
				window.location.href = '/keranjang/checkout'
			}, 500);
		}
	};

	useEffect(() => {
		getKeranjang();
	}, []);

	return {
		loading,
		keranjang,
		selectedIds,
		selectAll,
		toggleSelect,
		toggleSelectAll,
		updateQuantity,
		getKeranjang,
		checkout,
		setSelectedIds
	};
};

// Counter component dengan loading state dan error handling
export const Counter = ({ value, onChange, className, max = 99, min = 1 }) => {
	const [loading, setLoading] = useState(false);
	const [localValue, setLocalValue] = useState(value);

	// Sync dengan value dari parent
	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = async (newValue) => {
		// Validasi range
		const validatedValue = Math.max(min, Math.min(max, newValue));

		setLocalValue(validatedValue);

		try {
			setLoading(true);
			await onChange(validatedValue);
		} catch (error) {
			// Rollback ke nilai sebelumnya jika gagal
			setLocalValue(value);
			console.error("Gagal mengupdate quantity:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleIncrement = () => handleChange(localValue + 1);
	const handleDecrement = () => handleChange(localValue - 1);

	const handleInputChange = (e) => {
		const inputValue = parseInt(e.target.value) || min;
		handleChange(inputValue);
	};

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<button
				onClick={handleDecrement}
				disabled={loading || localValue <= min}
				className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
			>
				-
			</button>

			<input
				type="number"
				value={localValue}
				onChange={handleInputChange}
				min={min}
				max={max}
				disabled={loading}
				className="w-12 text-center border rounded py-1 px-2 disabled:opacity-50"
			/>

			<button
				onClick={handleIncrement}
				disabled={loading || localValue >= max}
				className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
			>
				+
			</button>

			{loading && (
				<div className="ml-2">
					<i className="bi bi-arrow-repeat animate-spin"></i>
				</div>
			)}
		</div>
	);
};

export const Card = ({ children }) => {
	return (<div className="rounded-sm w-full border p-3 sm:px-12 flex items-center justify-between">{children}</div>)
}