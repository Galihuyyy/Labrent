import React, { useEffect, useState } from 'react'
import banner from '../../../assets/images/banner-client.png'
import NavbarClient from '../../../components/fragments/NavbarClient'
import useAlat from '../../../hooks/HookAlat'
import WithLoading from '../../../components/Layout/WithLoading'

export const ProductList = () => {
  const { loading, alatTersedia, alatTidakTersedia, getDataAlat } = useAlat()

	const [searchValue, setSearchValue] = useState("")
  
	function handleSearch () {
		getDataAlat(searchValue)
	}

  useEffect(() => {
    if (searchValue === '' || !searchValue ){
      getDataAlat()
    }
  }, [searchValue])

  return (
    <div className="w-full py-14 lg:py-20 mx-auto text-neutral-800 relative px-6 md:px-12">
      <NavbarClient withSearch="true" onInputSearch={(value) => {setSearchValue(value)}} onClickSearch={() => {handleSearch()}}></NavbarClient>

      <div className="w-full mx-auto mt-6 mb-12 max-lg:mb-6">
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-[10/4] md:aspect-[10/2.5]">
          <img  
            src={banner}
            alt="Banner Ecommerce"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>


      <main className='grid grid-cols-1 md:grid-cols-[1fr_.5fr] gap-6'>
        <div className="right-side">
          <h5 className='text-start !text-blue-900 relative max-w-fit !mb-6 h-fit !text-sm md:!text-md lg:!text-lg'>Alat Tersedia <span className='absolute -bottom-2 left-0 md:left-1/2 md:translate-middle-x w-50 h-1 rounded bg-blue-800'></span></h5>
          <WithLoading loading={loading}>
            <div className="product-card grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 min-h-24">
              {alatTersedia.map((alat, i) => (
                <div key={i} onClick={() => { window.location.href = `/detail/${alat.id}` }} className="bg-white h-fit min-h-48 rounded shadow-sm border-neutral-200 border-[1px] duration-100 hover:border-indigo-500 cursor-pointer align-middle flex flex-col w-full">
                  <div className='w-full h-30 mb-1 overflow-hidden rounded-t flex items-center justify-center'>
                    <img src={alat.foto_alat} width={120} className='w-full object-cover' />
                  </div>
                  <div className="px-2 flex flex-col h-full">
                    <p className="mb-2 text-xs sm:text-sm line-clamp-2 text-zinc-700">
                      {alat.name}
                    </p>
                    <p className="text-zinc-500 font-medium text-[11px] sm:text-xs text-end mt-auto">
                      {alat.stok} Tersedia
                    </p>
                  </div>

                </div>
              ))}
              {alatTidakTersedia.length > 0 &&
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
            </div>
          </WithLoading>

        </div>
        <div className="border rounded shadow-sm p-4 right-12 w-full bg-white">
          <h5>Pusat Informasi</h5>
          <div>
            <div className="flex border-b items-center gap-2 border-neutral-500 py-2">
              <p className='mb-0 px-2 text-xs rounded-pill bg-indigo-600 text-white w-fit'>Info</p>
              <p className="mb-0 text-sm text-neutral-600">Informasi System</p>
            </div>
            <div className='p-2 text-xs'>
              <p className='mb-0 text-neutral-600'>
                Selamat datang di sistem peminjaman alat laboratorium!
                Di sini, kamu bisa meminjam berbagai alat penunjang praktikum dengan mudah dan cepat.
              </p>
            
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


            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
