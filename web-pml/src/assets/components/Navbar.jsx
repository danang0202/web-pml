import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { urlCentral } from "../config/util";
import Cookies from "js-cookie";

function Navbar() {

    const [navbarColor, setNavbarColor] = useState('bg-blue');
    const [fontColor, setFontColor] = useState('text-light');
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                setNavbarColor('bg-clear shadow');
                setFontColor('text-dark');
            } else {
                setNavbarColor('bg-blue');
                setFontColor('text-light');
            }

        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('email');
        // localStorage.removeItem('expiresAt')
        localStorage.clear(); // menghapus semua local storage
        window.open(`${urlCentral}/logout`, 'blank');
        // window.location.href = `${urlCentral}/logout`;
    }

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${location.pathname == ('/') ? navbarColor : 'bg-clear shadow'} w-100  px-5 transition-colors `} style={{ height: '4rem' }}>
                <div className="container-fluid">
                    <div className="logo-container text-end px-5 mb-1">
                        <img src="/images/logo/Logo Full.svg" alt="" style={{ width: '3.5rem' }} />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className={`nav-link active ${location.pathname == ('/') ? fontColor : 'text-dark'}`} aria-current="page" href="/">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link  ${location.pathname == ('/') ? fontColor : 'text-dark'}`} href="/submissions">Submissions</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname == ('/') ? fontColor : 'text-dark'}`} href="/team">Data Team</a>
                            </li>
                        </ul>
                    </div>
                    <div className={`d-flex flex-row gap-2 align-items-center text-light ${location.pathname == ('/') ? fontColor : 'text-dark'}`} onClick={() => logout()} style={{ cursor:'pointer' }}>
                        <p className="mb-0 fw-semibold">Logout</p>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar