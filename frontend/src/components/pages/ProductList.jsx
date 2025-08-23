import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import banner from '../../assets/images/banner-client.png'
import NavbarClient from '../fragments/NavbarClient'

export const ProductList = () => {

  const token = getToken()
  const apiUrl = config.API_URL
  const [dataAlatTersedia, setDataAlatTersedia] = useState([])
  const [dataAlatTidakTersedia, setDataAlatTidakTersedia] = useState([])


  const getDataAlat = () => {
    axios.get(`${apiUrl}/home/alat`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setDataAlatTersedia(res.data.data.alat_tersedia);
        setDataAlatTidakTersedia(res.data.data.alat_tidak_tersedia);


      })
      .catch(err => {
        console.log(err.response.data);

      })
  }

  const rating = (rating) => {
    const star = []
    let i
    let tempRating = rating

    while (tempRating >= 1 && i < 5) {
      star.push('bi-star-fill')
      tempRating -= 1
      i++
    }

    if (tempRating >= 0.25 && tempRating < 0.75 && i < 5) {
      star.push('bi-star-half')
      i++
    }

    while (i < 5) {
      star.push('bi-star')
      i++
    }

  }

  useEffect(() => {
    getDataAlat()
  }, [])


  return (
    <div className="w-full pt-20 mx-auto text-neutral-800 relative">
      <NavbarClient withSearch="true"></NavbarClient>
      <main className='grid md:grid-cols-[1fr_.5fr] gap-6 max-sm:grid-cols-1 px-12'>
        <div className="banner w-full h-52 rounded-md shadow-sm overflow-hidden col-span-2">
          <img src={banner} alt="banner" className='w-full object-cover -mt-38' />
        </div>
        <div className="content grid grid-cols-2 md:grid-cols-3 gap-4 relative">
          <h5 className='text-start !text-blue-900 relative max-w-fit col-span-2 md:col-span-4 h-fit'>Alat Tersedia <span className='absolute -bottom-2 left-1/2 translate-middle-x w-50 h-1 rounded bg-blue-800'></span></h5>
          {dataAlatTersedia.map((alat, i) => (
            <div key={i} onClick={() => { window.location.href = `/detail/${alat.id}` }} className="bg-white h-fit rounded shadow-sm border-neutral-200 border-[1px] duration-100 hover:border-indigo-500 cursor-pointer align-middle flex flex-col w-full sm:px-4 max-sm:px-2 py-3">
              <div className='w-full h-30 mb-3 overflow-hidden flex items-center justify-center'>
                <img src={alat.foto_alat} width={120} className=' object-contain' />
              </div>
              <p className='mb-0 text-lg line-clamp-2 text-neutral-600'>{alat.name}</p>
              <div>
                {[1, 2, 3, 4, 5].map(i => (
                  <i key={i} className="bi bi-star-fill text-yellow-400 text-xs md:text-sm"></i>

                ))}
              </div>
              <p className='text-neutral-600 font-medium text-xs flex-1 text-end mb-0 mt-2'>{alat.stok} Tersedia</p>
            </div>
          ))}

          {dataAlatTidakTersedia.length > 0 &&
            <>
              <h5 className='text-center col-span-2 md:col-span-4'>Alat Tidak Tersedia</h5>
              {dataAlatTidakTersedia.map((alat, i) => (
                <div key={i} className="relative bg-white rounded shadow-sm border-neutral-200 border-[1px] duration-100 hover:border-indigo-500 cursor-pointer align-middle flex flex-col w-full sm:px-4 max-sm:px-2 py-3">
                  <div className='w-full h-30 mb-3 overflow-hidden flex items-center justify-center'>
                    <img src={alat.foto_alat[0].foto} width={120} className=' object-contain' />
                  </div>
                  <p className='mb-0 text-lg line-clamp-2 text-neutral-600'>{alat.name}</p>
                  <div>
                    {[1, 2, 3, 4, 5].map(i => (
                      <i key={i} className="bi bi-star-fill text-yellow-400 text-xs md:text-sm"></i>

                    ))}
                  </div>
                  <p className='text-neutral-600 font-medium text-xs flex-1 text-end mb-0 mt-2'>{alat.stok} Tersedia</p>

                  <div className="absolute top-0 left-0 w-full h-full opacity-50 rounded bg-black">

                  </div>
                </div>
              ))}
            </>
          }
          <div className="border rounded shadow-sm p-4 fixed right-12 max-w-md">
            <h5>Pusat Informasi</h5>
            <div>
              <div className="flex border-b items-center gap-2 border-neutral-500 py-2">
                <p className='mb-0 px-2 text-xs rounded-pill bg-indigo-600 text-white w-fit'>Info</p>
                <p className="mb-0 text-sm text-neutral-600">Informasi System</p>
              </div>
              <div className='p-2'>
                <p className='mb-0 text-xs text-neutral-600'>
                  Selamat datang di sistem peminjaman alat laboratorium!
                  Di sini, kamu bisa meminjam berbagai alat penunjang praktikum dengan mudah dan cepat.
                  <br />
                  📌 Hal yang perlu kamu tahu:
                  <ul className='list-disc'>
                    <li>✅ Pilih alat yang ingin dipinjam melalui halaman katalog.</li>
                    <li>🛒 Klik alat, lalu lakukan checkout.</li>
                    <li>⏳ Setelah checkout, status peminjaman kamu akan menjadi pending dan menunggu konfirmasi dari petugas.</li>
                    <li>🧪 Datang ke lab untuk konfirmasi dan pengambilan alat.</li>
                    <li>⏰ Jangan lupa kembalikan alat tepat waktu dan dalam kondisi baik.</li>
                  </ul>
                  <br />
                  Jika ada pertanyaan atau butuh bantuan, langsung aja hubungi petugas lab atau admin sistem, ya!


                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
