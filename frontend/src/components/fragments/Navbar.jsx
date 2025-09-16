import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { toast, ToastContainer } from 'react-toastify'
import { List, ListAlt, Menu } from '@mui/icons-material'
import ListItem from '@mui/material/ListItem'
import PopUpLogout from './PopUpLogout'

const Navbar = ({ setSidebarOpen }) => {

    const token = getToken()
    const apiUrl = config.API_URL
    const role = localStorage.getItem('role') || sessionStorage.getItem('role')
    const profil = document.getElementById('profil');
    const [profileHover, setProfileHover] = useState(false)
    const [logoutOn, setLogoutOn] = useState(false)

    const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))

    const logout = () => {
        const toastLogoutId = toast.loading("Melakukan logout...");
    
        axios.post(`${apiUrl}/auth/logout`, {}, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            localStorage.clear();
            sessionStorage.clear(); 
            toast.update(toastLogoutId, {
                type : 'success',
                render : res.data?.message || 'Berhasil logout!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })
            setTimeout(function() {
                window.location.reload()
            }, 1000);
        })
        .catch(err => {console.log(err);})
    }

    
    return (
        <>
        <ToastContainer
            position='top-center'
            theme='colored'
        />
        <div className='max-md:px-4 md:px-12 fixed top-0 right-0 bg-white font-[poppins] w-full h-16 md:h-20 shadow-md border-b border-b-neutral-200 flex items-center justify-between'>
            <Menu onClick={() => setSidebarOpen(true)}></Menu>
            <ul className=" mb-0 flex items-center gap-3 md:gap-6" style={{padding:0}}>
                <li id='profil' onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} className='relative bg-indigo-500 w-8 h-8 md:w-10 md:h-10 rounded-full grid place-items-center font-medium text-lg md:text-2xl text-white border-2 border-indigo-600 duration-300 hover:border-indigo-900 cursor-pointer'>{users.profile.name.charAt(0)}
                    <div onClick={() => {setLogoutOn(true)}} className={`absolute top-[100%] ${profileHover == false ? "hidden" : ""} bg-white rounded border px-2 py-1 shadow-sm flex items-center justify-center gap-x-2`}>
                        <i className="bi bi-box-arrow-right text-red-800"></i>
                        <p className="text-lg text-danger mb-0">Logout</p>
                    </div>
                </li>
            </ul>

            <PopUpLogout show={logoutOn} setShow={setLogoutOn} onLogout={() => {logout()}} />
        </div>
        </>

    )
}


export default Navbar