import { useState } from "react"
import { config } from "../config"
import { getToken } from "../utils/getToken"
import axios from "axios"

export const usePeminjaman = () => {
	// Fix Data
	const token = getToken()
	const apiUrl = config.API_URL
	
	// State
	const [dataPeminjaman, setDataPeminjaman] = useState()
	const [detailPeminjaman, setDetailPeminjaman] = useState()
	const [loading, setLoading] = useState(false)
	
	// Function
	const getPeminjaman = (peminjaman_user = false) => {

		const params = {}
  		if (peminjaman_user) params.transaksi_user = true
		
		setLoading(true)
        axios.get(`${apiUrl}/transaksi/get`, { headers: { Authorization: `Bearer ${token}` }, params })
		.then(res => {
			setDataPeminjaman(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			setLoading(false)
		})
    }

	const showPeminjaman = (id) => {
		setLoading(true)
        axios.get(`${apiUrl}/transaksi/${id}`, { headers: { Authorization: `Bearer ${token}` } })
		.then(res => {
			setDetailPeminjaman(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			setLoading(false)
		})
    }

	// Return export
	return {
		loading,
		dataPeminjaman, getPeminjaman,
		detailPeminjaman, showPeminjaman,
	}
}