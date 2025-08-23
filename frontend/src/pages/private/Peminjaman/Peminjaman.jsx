import React, { useEffect, useState } from 'react'
import AdminPage from '../../../components/Layout/AdminPage'
import { getToken } from '../../../utils/getToken'
import { config } from '../../../config'
import axios from 'axios'
import Button from '../../../components/elements/Button'
import { Add, Check } from '@mui/icons-material'
import Table from './resource/Table'
import CardHeader from '../../../components/fragments/CardHeader'
import ModalForm from './resource/ModalForm'

function Peminjaman() {

    const token = getToken()
    const apiUrl = config.API_URL

    const [openModal, setOpenModal] = useState(false)
    const [mode, setMode] = useState(false)

    const [dataPeminjaman, setDataPeminjaman] = useState([{
        peminjaman: {
            peminjam: {
                profile: {}
            }
        }
    }])

    const getPeminjaman = () => {
        axios.get(`${apiUrl}/transaksi/get`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data.data)
                setDataPeminjaman(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const openModalFn = (mode) => {
        setOpenModal(true)
        setMode(mode)
    }

    const hapusTrx = (id) => {

        const yakin = confirm(`yakin ingin hapus transaksi id ${id} ? `)

        if (!yakin) {
            return
        }

        axios.delete(`${apiUrl}/admin/transaksi/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPeminjaman()
    }, [])

    return (
        <AdminPage>
            <div className="pt-4">
                <CardHeader title="Manajemen Peminjaman">
                    <div className='flex items-center gap-x-3'>
                        <Button variant="primary" className="!w-fit" onClick={() => { openModalFn("confirm") }}>
                            <Check />
                            Setujui Permintaan
                        </Button>
                        <Button variant="primary" className="!w-fit" onClick={() => { openModalFn("return") }}>
                            <Check />
                            Peminjaman Dikembalikan
                        </Button>
                    </div>
                </CardHeader>
                <Table data={dataPeminjaman}></Table>
            </div>
            <ModalForm open={openModal} setOpenModal={setOpenModal} getPeminjaman={() => {getPeminjaman()}} mode={mode}/>
        </AdminPage>
    )
}

export default Peminjaman