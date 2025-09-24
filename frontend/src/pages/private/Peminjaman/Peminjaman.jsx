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
import Transaksi from '../../public/transaksi/Transaksi'
import { usePeminjaman } from '../../../hooks/HookPeminjaman'
import useUser from '../../../hooks/HookUser'
import Spinner from '../../../components/elements/Spinner'

function Peminjaman() {

    const {fixRole, getUser} = useUser()
    const token = getToken()
    const apiUrl = config.API_URL

    const [openModal, setOpenModal] = useState(false)
    const [mode, setMode] = useState(false)

    const { dataPeminjaman, getPeminjaman } = usePeminjaman()

    useEffect(() => {
        const fetchUser = async () => {
            await getUser();
        };
        fetchUser()
    }, []);

    useEffect(() => {
        getPeminjaman(false)
    }, [])

    const openModalFn = (mode) => {
        setOpenModal(true)
        setMode(mode)
    }

    if (!fixRole) {
        return (
            <div className="w-full min-h-svh grid place-items-center">
                <Spinner/>
            </div>
        )
    }

    if (fixRole === 'siswa') {
        return <Transaksi />;
    } else {
        return (
            <AdminPage>
                <div className="pt-4">
                    <CardHeader title="Manajemen Peminjaman">
                        <div className='flex items-center gap-x-3'>
                            <Button variant="outline-primary" className="!w-fit btn-sm !bg-blue-100 hover:!bg-blue-500 hover:!text-white" onClick={() => { openModalFn("confirm") }}>
                                <Check />
                                Setujui Permintaan
                            </Button>
                            <Button variant="outline-primary" className="!w-fit btn-sm !bg-blue-100 hover:!bg-blue-500 hover:!text-white" onClick={() => { openModalFn("return") }}>
                                <Check />
                                Peminjaman Dikembalikan
                            </Button>
                        </div>
                    </CardHeader>
                    <Table data={dataPeminjaman}></Table>
                </div>
                <ModalForm open={openModal} setOpenModal={setOpenModal} getPeminjaman={() => { getPeminjaman() }} mode={mode} />
            </AdminPage>
        )
    }
}

export default Peminjaman