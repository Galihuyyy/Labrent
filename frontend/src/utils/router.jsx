import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/auth/Login"
import Auth from "../middleware/Auth"
import { DetailProduct } from "../pages/public/alat/DetailProduct"
import Admin from "../pages/private/Admin/Admin"
import Peminjaman from "../pages/private/Peminjaman/Peminjaman"
import { Home } from "../pages/Home"
import Keranjang from "../pages/public/Keranjang"
import Checkout from "../pages/public/keranjang/Checkout"
import { DetailKeranjang } from "../pages/public/keranjang/DetailKeranjang"
import { Invoice } from "../pages/public/transaksi/Invoice"
import Transaksi from "../pages/public/transaksi/Transaksi"
import CheckoutAlat from "../pages/public/alat/CheckoutAlat"
import NotFound from "../pages/404"

const router = createBrowserRouter([
    {
        path : '*',
        element : <NotFound/>
    },
    {
        path : '/auth',
        element : <Auth auth={false}> <Login/> </Auth>
    },
    {
        path : '/',
        element : <Auth auth={true}> <Home/> </Auth>
    },
    {
        path : '/detail/:id',
        children : [
            {
                path : '',
                element : <Auth auth={true}> <DetailProduct/> </Auth>
            },
            {
                path : 'checkout',
                element : <Auth auth={true}> <CheckoutAlat/> </Auth>
            }, 
        ]
    },
    {
        path : '/admin',
        element : <Auth auth={true} adminOnly="true"> <Admin/> </Auth>
    },
    {
        path : '/peminjaman',
        children : [
            {
                path : '',
                element : <Auth auth={true}> <Peminjaman/> </Auth>
            },
            {
                path : ':id',
                element : <Auth auth={true}> <Invoice/> </Auth>
            },
        ]
    },
    {
        path : '/keranjang',
        children : [
            {
                path : '',
                element : <Auth auth={true}> <Keranjang/> </Auth>,
            },
            {
                path : ':id',
                element : <Auth auth={true}> <DetailKeranjang/> </Auth>,
            },
            {
                path : 'checkout',
                element : <Auth auth={true}> <Checkout/> </Auth>
            }
        ]
    },
])

export default router