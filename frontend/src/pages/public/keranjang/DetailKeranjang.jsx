import React, { useState, useEffect } from 'react'
import { data, Link, useParams } from 'react-router-dom'
import { config } from '../../../config'
import axios from 'axios'
import { getToken } from '../../../utils/getToken'
import { toast, ToastContainer } from 'react-toastify'
import useAlat from '../../../hooks/HookAlat'
import WithLoading from '../../../components/Layout/WithLoading'
import Spinner from '../../../components/elements/Spinner'
import Badge from '../../../components/elements/Badge'
import NavbarClient from '../../../components/fragments/NavbarClient'


export const DetailKeranjang = () => {
    const { id } = useParams()
    const apiUrl = config.API_URL
    const token = getToken()
    const { loading, detailAlat, getDetailAlat } = useAlat();

    useEffect(() => {
        getDetailAlat(id)
    }, [id])

    return (
        <div className=''>
            <NavbarClient withSearch={false}></NavbarClient>
            <div className="w-11/12 sm:w-9/12 py-24 mx-auto font-[poppins] text-neutral-800">
                <ToastContainer
                    position='top-center'
                    theme='colored'
                />
                <div className="flex items-center text-gray-600 text-sm mb-3">
					<Link to="/" className='hover:!text-indigo-500 transition'>Home</Link>
                    <span className="mx-2">{'>'}</span>
					<Link to="/keranjang" className='hover:!text-indigo-500 transition'>Keranjang</Link>
                    <span className="mx-2">{'>'}</span>
                    <span className="text-gray-400">{detailAlat?.name}</span>
                </div>

                <WithLoading loading={loading}>
                    <div className="rounded-sm w-full shadow-sm border p-3 sm:px-12 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-12">
                        <div className="max-w-sm">
                            <img className='w-full object-cover' src={detailAlat?.foto_alat} />
                        </div>
                        <div className='flex flex-column py-3'>
                            <h3>{detailAlat?.name}</h3>
                            <div className="deskripsi sm:pe-24 bg-neutral-50 sm:ps-6">
                                <label htmlFor="deskripsi" className='mb-2 text-black/75 font-medium text-sm'>Deskripsi</label>
                                <p id='deskripsi' className='text-black/50 text-sm'>{detailAlat?.deskripsi ?? 'No Description'}</p>
                            </div>
                        </div>

                    </div>
                </WithLoading>
            </div>
        </div>
    )
}