import React, { useState, useEffect } from 'react'
import { data, useParams } from 'react-router-dom'
import Navbar from '../../components/fragments/Navbar'
import { config } from '../../config'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import { toast, ToastContainer } from 'react-toastify'
import NavbarClient from '../../components/fragments/NavbarClient'
import useAlat from '../../hooks/HookAlat'
import WithLoading from '../../components/Layout/WithLoading'
import Spinner from '../../components/elements/Spinner'
import Badge from '../../components/elements/Badge'


export const DetailProduct = () => {
    const { id } = useParams()
    const apiUrl = config.API_URL
    const token = getToken()
    const { loading, detailAlat, getDetailAlat } = useAlat();
    const [alatImages, setAlatImages] = useState([])

    const [count, setCount] = useState(1)

    const [peminjaman, setPeminjaman] = useState([{
        peminjam: {
            profile: {}
        },
        ulasan: [
            {
                created_at: '',
                rating: 0,
                komentar: '',
            }
        ]
    }])

    const addCart = () => {
        const toastAddKeranjangId = toast.loading("Menambahkan ke keranjang...");

        axios.post(`${apiUrl}/peminjaman`, {/* data */}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                toast.update(toastAddKeranjangId, {
                    type: 'success',
                    render: res.data?.message || 'Berhasil ditambahkan ke keranjang!',
                    isLoading: false,
                    hideProgressBar: false,
                    autoClose: true,
                    closeButton: true
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const pinjamLangsung = () => {
        const toastPinjamLangsungId = toast.loading("Meminjam...");
        axios.post(`${apiUrl}/peminjaman/transaksi/add`, {/* Data */}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                toast.update(toastPinjamLangsungId, {
                    type: 'success',
                    render: res.data?.message || 'Berhasil melakukan peminjaman!',
                    isLoading: false,
                    hideProgressBar: false,
                    autoClose: true,
                    closeButton: true
                })

                setTimeout(function () {
                    window.location.href = '/transaksi-pending'
                }, 1000);
            })
            .catch(err => {
                console.log(err);
            })
    }


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
                    <span className="cursor-pointer hover:text-indigo-500 transition" onClick={() => { window.location.href = "/" }} >
                        Home
                    </span>
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
                            <Counter max={detailAlat?.stok} count={count} setCount={setCount}></Counter>
                            <Badge variant={'warning'}>
                                <i className="bi bi-info-circle-fill mr-1 text-[14px]"></i>
			                    terpinjam {peminjaman.length} kali
                            </Badge>
                            <div className="sm:flex items-center gap-x-3 hidden ms-6 mt-3">
                                <ButtonAddKeranjang qty={count}/>
                                <ButtonPinjamSekarang/>
                            </div>
                        </div>

                    </div>
                </WithLoading>
            </div>
            <footer className='fixed-bottom bg-white border shadow-sm w-full flex justify-center py-2 sm:hidden'>
                <div className="flex items-center justify-end w-11/12 sm:w-9/12  gap-x-2">
                    <ButtonAddKeranjang qty={count}/>
                    <ButtonPinjamSekarang/>
                </div>
            </footer>
        </div>
    )
}

export const Counter = ({ max = 10, count, setCount }) => {
  const handleDecrease = () => {
    setCount(prev => Math.max(1, prev - 1))
  }

  const handleIncrease = () => {
    setCount(prev => Math.min(max, prev + 1))
  }

  const handleChange = (e) => {
    const val = Number(e.target.value)
    if (!isNaN(val)) {
      setCount(Math.min(max, Math.max(1, val)))
    }
  }

  return (
    <div className="w-fit h-max flex items-center border border-neutral-200 rounded overflow-hidden sm:ms-6 my-2">
      <button onClick={handleDecrease}
        className="bg-neutral-100 text-neutral-400 px-2 h-full"
      >
        <i className="bi bi-dash text-xl"></i>
      </button>

      <input type="number" value={count} onChange={handleChange}
        className="w-12 h-full text-center !text-sm 
                  [appearance:textfield] 
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button onClick={handleIncrease}
        className="bg-neutral-100 text-neutral-400 px-2 h-full"
      >
        <i className="bi bi-plus text-xl"></i>
      </button>
    </div>
  )
}

export const ButtonAddKeranjang = ({ qty }) => {
    const { id } = useParams()
    const apiUrl = config.API_URL
    const token = getToken()
    const [loadingAddKeranjang, setLoadingAddKeranjang] = useState(false)

    async function handleAddKeranjang() {
        try {
            setLoadingAddKeranjang(true)
            const res = await axios.post(`${apiUrl}/keranjang`, {
                alat_id : id,
                qty : qty
            }, {headers : {Authorization : `Bearer ${token}`}})
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error)
        } finally {
            setLoadingAddKeranjang(false)
        }

    }
    
    return (
        <button
        className="relative max-w-fit py-2 px-3 !rounded-sm text-indigo-600 !text-sm bg-indigo-100 outline outline-indigo-600 hover:bg-indigo-50 duration-200"
        onClick={() => {handleAddKeranjang()}}
        >
            {loadingAddKeranjang && (
                <span className="absolute inset-0 flex items-center justify-center">
                <Spinner />
                </span>
            )}
            <span className={loadingAddKeranjang ? "opacity-0" : "opacity-100"}>
                Tambah Keranjang
            </span>
        </button>
    
    )
}

export const ButtonPinjamSekarang = () => {
    return (
        <button className='max-w-fit py-2 px-3 !rounded-sm text-white !text-sm bg-indigo-600 hover:bg-indigo-500 duration-200' onClick={() => { pinjamLangsung() }}>Pinjam Sekarang</button>
    )
}

