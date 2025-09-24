import React from 'react'
import logo from '../../src/assets/images/logo.png'
import Button from '../components/elements/Button'

const NotFound = () => {
  return (
	<main className='w-full min-h-svh flex flex-col gap-3 max-md:items-center justify-center px-3 font-montserrat'>
		<img src={logo} alt="labrent logo" width={134} />
		<h1 className='!font-semibold max-md:text-center !text-gray-700 md:!max-w-3/4'>
			<span className='!font-bolder text-black/50 mr-3'>#404</span>
			Waduh, nyasar! Halaman ini nggak ada. Mungkin salah ketik URL? Yuk kembali ke beranda biar nggak nyasar lagi.
		</h1>
		<Button onClick={() => window.location.href = "/"} variant="outline-secondary" className="!w-fit !bg-gray-200 !text-gray-800 hover:!bg-gray-300">Kembali ke jalan yang benar</Button>
	</main>
  )
}

export default NotFound