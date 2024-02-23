import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { urlCentral } from '../config/util'

function Layout() {

    useEffect(() => {
        if (!Cookies.get("token") || !Cookies.get("email")) {
            window.location.href = `${urlCentral}/logout`;
        }
    }, [])


    return (
        <>
            <div className="position-fixed top-0 w-100" style={{ height: '4rem', zIndex: '10' }}>
                <Navbar />
            </div>
            <div className="box w-100 p-0" style={{ marginTop: '4rem' }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout