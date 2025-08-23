import React, { useState } from 'react'
import Button from '../../../../components/elements/Button'
import { config } from '../../../../config'
import { getToken } from '../../../../utils/getToken'
import { Close } from '@mui/icons-material'
import Loader from '../../../../components/elements/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'

const ModalForm = ({ mode, open, setOpenModal, getPeminjaman }) => {
	const [trxId, setTrxId] = useState('')
	const apiUrl = config.API_URL
	const token = getToken()

	const [loading, setLoading] = useState(false)
	const title = mode == "confirm" ? "Konfirmasi" : "Kembalikan"

	async function handleOnclick() {
		if (trxId == null || trxId == "") return
		await mode == "confirm" ? actionConfirm() : actionReturn()
		getPeminjaman()
	}

	async function actionConfirm() {
		setLoading(true)
		try {
			await axios.put(`${apiUrl}/admin/transaksi/konfirmasi/${'TRX'+trxId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
			toast.success("Peminjaman di " + title)
			setTrxId("")
			setOpenModal(false)
		} catch ( error ) {
			const message = error?.response?.data?.message;
			toast.error(message)
		}
		setLoading(false)
	}

	async function actionReturn() {
		setLoading(true)
		try {
			await axios.put(`${apiUrl}/admin/transaksi/kembali/${'TRX'+trxId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
			toast.success("Peminjaman di " + title)
			setTrxId("")
			setOpenModal(false)
		} catch (error) {
			const message = error?.response?.data?.message;
			toast.error(message)
		}
		setLoading(false)
	}

	return (
		<div className={`${!open ? "hidden" : ""} w-full min-h-svh bg-black/50 fixed-top grid place-items-center`}>
			<div className="w-full max-w-md bg-white text-gray-800 rounded shadow-md border-[1px] border-gray-400 py-6 px-3">
				<header className='relative'>
					<h1 className='!text-2xl mb-3'>{mode == "confirm" ? "Konfirmasi" : "Kembalikan"} Peminjaman</h1>
					<i onClick={() => { setOpenModal(false);setTrxId("") }} className='text-gray-400 hover:text-gray-600 duration-300 cursor-pointer absolute top-0 right-0'><Close /></i>
				</header>
				<main className='flex flex-col items-start mt-6'>
					<label htmlFor="trx_id">Masukkan TRX ID</label>
					<div className='w-full mt-1 mb-6 flex items-center justify-center border rounded px-3 focus-within:ring-2 focus-within:ring-indigo-500'>
						<p className='m-0'>TRX</p>
						<input
							type="text"
							value={trxId}
							id='trx_id'
							name='trx_id'
							onChange={(e) => { setTrxId(e.target.value) }}
							className="w-full px-3 py-2 rounded-md focus:outline-none"
							placeholder="12345678****"
							autoComplete="trx_id"
						/>
					</div>
					<Button onClick={() => { handleOnclick() }}>
						{loading ? "Loading..." : "Submit"}
					</Button>
				</main>
			</div>
		</div>
	)
}

export default ModalForm