import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken } from '../utils/getToken'
import { config } from '../config'

export default function useAlat() {
  const token = getToken()
  const apiUrl = config.API_URL
  const [loading, setLoading] = useState(false)
  const [alatTersedia, setAlatTersedia] = useState([])
  const [alatTidakTersedia, setAlatTidakTersedia] = useState([])

  // 🔹state detail alat
  const [detailAlat, setDetailAlat] = useState([])
  
  // 🔹get alat
  const getDataAlat = (search = '') => {
    setLoading(true)
    axios.get(`${apiUrl}/home/alat`, {
      params: { search }, 
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setAlatTersedia(res.data.data.alat_tersedia)
      setAlatTidakTersedia(res.data.data.alat_tidak_tersedia)
    })
    .catch((err) => {
      toast.error('Gagal mengambil data alat!')
      console.error(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getDataAlat()
  }, [])

  // 🔹detail alat
  async function getDetailAlat(id) {
    setLoading(true)
    try {
      const res = await axios.get(`${apiUrl}/home/alat/${id}`, { headers: { Authorization: `Bearer ${token}` }})
      setDetailAlat(res.data.data)
    } catch (error) {
      toast.error('Gagal mengambil detail alat!')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,

    alatTersedia, alatTidakTersedia, getDataAlat,
    detailAlat, getDetailAlat
  }
}
