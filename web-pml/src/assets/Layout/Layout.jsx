import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Layout() {
    return (
        <>
            <div className="position-fixed top-0 w-100" style={{ height:'4rem', zIndex:'10'}}>
                <Navbar />
            </div>
            <div className="box w-100 p-0" style={{ marginTop:'4rem' }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout