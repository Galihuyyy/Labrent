import React, { useEffect, useState } from 'react'
import { getRole, getToken } from '../../../utils/getToken'
import { config } from '../../../config'
import axios from 'axios'
import NavbarClient from '../../../components/fragments/NavbarClient'
import { ChevronLeft, Close } from '@mui/icons-material'
import { useParams, Link } from 'react-router-dom'
import { usePeminjaman } from '../../../hooks/HookPeminjaman'
import WithLoading from '../../../components/Layout/WithLoading'
import Badge from '../../../components/elements/Badge'
import { useServices } from '../../../services/Services'
import Navbar from '../../../components/fragments/Navbar'
import AdminPage from '../../../components/Layout/AdminPage'

export const Invoice = () => {
    const token = getToken()
    const apiUrl = config.API_URL

    const { id } = useParams()
    const { loading, detailPeminjaman, showPeminjaman } = usePeminjaman()
    const { getVariantByStatus } = useServices()

    let nb
    switch (detailPeminjaman?.status) {
        case "pending":
            nb = `Silakan datang ke admin dan konfirmasi kode transaksi Anda. Transaksi hanya berlaku 3 x 24 jam sejak dibuat.Jika tidak dikonfirmasi dalam batas waktu tersebut, transaksi akan otomatis dibatalkan.`
            break;
        case "ditolak":
            nb = 'Pengajuan peminjaman ini ditolak oleh admin. Untuk informasi lebih lanjut, silakan hubungi admin.'
            break;
        case "expired":
            nb = 'Pengajuan peminjaman ini expired karena anda tidak mengkonfirmasi selama 3x24 jam. Untuk informasi lebih lanjut, silakan hubungi admin.'
            break;
        case "dipinjam":
            nb = 'Barang sedang Anda pinjam. Mohon dijaga dengan baik dan pastikan dikembalikan sesuai jadwal yang telah ditentukan.'
            break;
        case "dikembalikan":
            nb = 'Barang telah dikembalikan. Terima kasih telah mengikuti prosedur peminjaman dengan baik.'
            break;
    }


    useEffect(() => {
        showPeminjaman(id)
    }, [])

    const content = (
        <>
            {getRole() !== 'admin' && <NavbarClient />}
            {
                !!detailPeminjaman &&
                <WithLoading loading={loading}>
                    <div className={`mx-auto border flex flex-col ${getRole() === 'admin' ? 'mt-6' : ''} gap-y-12 shadow !w-full sm:w-1/2 text-neutral-700`}>
                        <header className="flex flex-col gap-y-12 pb-12 bg-zinc-100 px-12">
                            <div className="h-28 flex">
                                <div className="h-full w-34 pb-1 bg-indigo-400 text-white flex items-end justify-content-center">
                                    <h5>INVOICE</h5>
                                </div>
                                <div className="w-full h-full pb-1 flex flex-col justify-between items-end pt-4">
                                    <Link to="/peminjaman">
                                        <Close />
                                    </Link>
                                    <p className='m-0 font-semibold text-xs text-zinc-400'>
                                        {new Date(detailPeminjaman.tanggal_pinjam).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                        <Badge variant={getVariantByStatus(detailPeminjaman.status)}>{detailPeminjaman.status}</Badge>
                                    </p>

                                </div>

                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between w-full mx-auto font-semibold text-xs text-indigo-600">
                                    <p className=" m-0">PREPARED FOR</p>

                                    {/* Line with dots */}
                                    <div className="flex items-center flex-1 mx-4">
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                                        <div className="flex-1 border-t-2 border-indigo-600"></div>
                                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                                    </div>

                                    <p className="m-0">PREPARED BY</p>
                                </div>
                                <div className="flex items-start pt-1.5 justify-between w-full mx-auto">
                                    <div className="text-start">
                                        <p className="text-md font-bold m-0">{detailPeminjaman.nama_peminjam}</p>
                                        <p className="text-sm m-0">{detailPeminjaman.email_peminjam}</p>
                                    </div>
                                    <div className="text-end">
                                        <p className="font-bold m-0">Labrent</p>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main className='py-12 px-12'>
                            <div className="w-auto overflow-x-auto">
                                <table className="table-auto min-w-[300px] w-full border-gray-200 text-sm text-left">
                                    <thead className="text-gray-400 uppercase !border-b">
                                        <tr className='font-medium text-xs [&>td]:pb-3'>
                                            <td>Alat</td>
                                            <td>Qty</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detailPeminjaman.transaksi_details?.map(i => (
                                            <tr className="text-xs [&>td]:py-3   text-zinc-400 font-medium">
                                                <td>{i.nama_alat}</td>
                                                <td className="ps-2">{i.jumlah}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                        {getRole() !== 'admin' &&
                            <footer className='px-12 pb-12'>
                                <p className='flex flex-col text-xs text-zinc-500'>
                                    <span className='font-medium'>NB</span>
                                    <span>
                                        {nb}
                                    </span>
                                </p>
                                {detailPeminjaman.status === 'pending' &&
                                    <button onClick={() => { hapusTrx(detailPeminjaman.id) }} className='w-full bg-red-600 rounded text-white border-[1px] border-black mt-3 py-1'>Batalkan</button>
                                }
                            </footer>
                        }
                    </div>
                </WithLoading>
            }
        </>
    )

    if (getRole() === 'admin') {
        return <AdminPage>{content}</AdminPage>
    } else {
        return (
            <div className="pb-20 px-4 pt-28">
                {content}
            </div >
        )
    }
}
