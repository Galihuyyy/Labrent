import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/auth/Login"
import Auth from "../middleware/Auth"
import { DetailProduct } from "../pages/public/DetailProduct"
import { Receipt } from "../pages/public/Receipt"
import Admin from "../pages/private/Admin/Admin"
import Peminjaman from "../pages/private/Peminjaman/Peminjaman"
import { Home } from "../pages/Home"
import Keranjang from "../pages/public/Keranjang"
import Checkout from "../pages/public/keranjang/Checkout"
import { DetailKeranjang } from "../pages/public/keranjang/DetailKeranjang"

const router = createBrowserRouter([
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
        element : <Auth auth={true}> <DetailProduct/> </Auth>
    },
    {
        path : '/transaksi-pending',
        element : <Auth auth={true}> <Receipt/> </Auth>
    },
    {
        path : '/admin',
        element : <Auth auth={true}> <Admin/> </Auth>
    },
    {
        path : '/peminjaman',
        element : <Auth auth={true}> <Peminjaman/> </Auth>
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