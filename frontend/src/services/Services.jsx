import React from 'react'

export const useServices = () => {

	function getClassnameByStatus(status) {
		switch (status) {
			case "pending":
				return 'text-yellow-700 bg-yellow-200'
			case "ditolak":
				return 'text-red-700 bg-red-200'
			case "expired":
				return 'text-red-700 bg-red-200'
			case "dipinjam":
				return 'text-blue-700 bg-blue-200'
			case "dikembalikan":
				return 'text-green-700 bg-green-200'
		}
	}

	function getVariantByKeterangan(keterangan) {
		switch (keterangan) {
			case "Maintenance":
				return 'warning'
			case "Rusak":
				return 'danger'
			case "Aman":
				return 'success'
		}
	}

	function getVariantByStatus(status) {
		switch (status) {
			case "pending":
				return 'warning'
			case "ditolak":
				return 'danger'
			case "expired":
				return 'danger'
			case "dipinjam":
				return 'primary'
			case "dikembalikan":
				return 'success'
		}
	}

	return {
		getClassnameByStatus, getVariantByStatus, getVariantByKeterangan
	}
}
