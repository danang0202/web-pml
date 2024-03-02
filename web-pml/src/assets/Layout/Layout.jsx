import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { urlCentral } from '../config/util'
import Footer from '../components/Footer'

function Layout() {

    useEffect(() => {
        if (!Cookies.get("token") || !Cookies.get("email")) {
            localStorage.clear();
            window.location.href = `${urlCentral}/logout`;
        }
    }, [])


    return (
        <>
            <div className="d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
                <div className="">
                    <Navbar />
                    <div className="box w-100 p-0">
                        <Outlet />
                    </div>
                </div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout