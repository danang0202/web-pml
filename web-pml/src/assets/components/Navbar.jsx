import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { urlCentral } from "../config/util";
import Cookies from "js-cookie";

function Navbar() {

    const [navbarColor, setNavbarColor] = useState('bg-blue navbar-dark');
    const [fontColor, setFontColor] = useState('text-light');
    const [logBtnColor, setLogBtnColor] = useState('bg-light text-blue')
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                setNavbarColor('bg-clear shadow navbar-light');
                setFontColor('text-dark');
                setLogBtnColor('bg-grad-2 text-light hover-grad-1')
            } else {
                setNavbarColor('bg-blue navbar-dark');
                setFontColor('text-light');
                setLogBtnColor('bg-light text-blue h-w-o')
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
        localStorage.clear(); // menghapus semua local storage
        window.open(`${urlCentral}/logout`, 'blank');
    }
    

    return (
        <>
            <nav className={`navbar navbar-expand-lg sticky-top ${location.pathname == ('/') ? navbarColor : 'bg-clear shadow bavbar-light'} w-100  px-md-5 px-3 transition-colors `}>
                <div className="container-fluid px-0">
                    <div className="logo-text d-flex flex-row align-items-center pe-5">
                        <div className="logo-container text-end mb-1">
                            <img src="/images/logo/Logo Full.svg" alt="" style={{ width: '3.5rem' }} />
                        </div>
                        <div className="text px-2">
                            <p className={` fw-bold mb-0 ${fontColor}`} >PKL POLSTAT STIS</p>
                            <p className={` fw-bold mb-0 ${fontColor} fs-7`}>T.A. 20323 / 2024</p>
                        </div>

                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="d-flex flex-lg-row flex-column justify-content-between w-100">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className={`nav-link h-w-o ${location.pathname == ('/') ? fontColor + ' active' : 'text-dark'}`} aria-current="page" href="/">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link h-w-o  ${location.pathname == ('/') ? fontColor : 'text-dark'} ${location.pathname == '/submissions' ? 'active text-blue' : ''} `} href="/submissions">Submissions</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link h-w-o ${location.pathname == ('/') ? fontColor : 'text-dark'} ${location.pathname == '/team' ? 'active text-blue' : ''}`} href="/team">Data Team</a>
                                </li>
                            </ul>
                            <div className={`d-flex flex-row gap-2 align-items-center px-2 rounded  ${location.pathname == ('/') ? logBtnColor : 'bg-grad-2 text-light hover-grad-1'}`} onClick={() => logout()} style={{ cursor: 'pointer' }}>
                                <p className={`mb-0 fw-semibold`}>Logout</p>
                                <FontAwesomeIcon icon={faRightFromBracket} color={`${location.pathname == ('/') ? logBtnColor : 'bg-grad-2 text-light '}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar