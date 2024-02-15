import { useEffect, useState } from "react"
import NotifCenter from "../components/NotifCenter";
import Cookies from 'js-cookie';
import { useTimContext } from "../../context/TimContext";
import apiCentralProject from "../config/axiosCentralProject";
import Card from "../components/Card";
import { formatDateAndTime } from "../config/kumpulanFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import TableRecent from "../components/TableRecent";


function Dashboard() {
    const [notifLogin, setNotifLogin] = useState();
    // const email = Cookies.get('email');
    const token = Cookies.get('token');
    const { dataTim, wilayahKerja, updateDataSubmissions, getSubmissions, setGetSubmission } = useTimContext();
    const [loading, setLoading] = useState();


    useEffect(() => {
        if (sessionStorage.getItem('notif-login')) {
            setNotifLogin(true);
        }
        setTimeout(() => {
            sessionStorage.removeItem('notif-login');
            setNotifLogin('');
        }, 500);
    }, [])

    useEffect(() => {
        const fetchDataSubmissions = async () => {
            setLoading(true);
            try {
                const response = await apiCentralProject.get('forms/MODUL2/submissions', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status == 200) {
                    updateDataSubmissions(response.data);
                }
            } catch (error) {
                console.log("Error saat melakukan fetch data submissions");
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setGetSubmission(false);
                }, 1000);
            }
        }
        if (getSubmissions) {
            fetchDataSubmissions()
        }
    }, [getSubmissions])

    return (
        <>
            {notifLogin && (
                <NotifCenter icon={'success'} text={"Login berhasil !"} />
            )}
            <div className="">
                <Card />
            </div>

            <div className="box mt-5 py-5">
                <div className="container px-5">
                    <div className="d-flex flex-row justify-content-between border-3 border-secondary border-bottom align-items-end pb-2">
                        <h5 className="fw-bold text-blue mb-0">Submissions Terbaru</h5>
                        <p className="mb-0"><span className="text-success fw-semibold">Last update</span> : {formatDateAndTime(localStorage.getItem('lastUpdate'))}</p>
                        <div className="d-flex flex-row gap-2">
                            <div className="rounded bg-grad-3 text-light d-block px-3 py-2 hover-grad-1 transition-colors d-flex flex-row gap-2 align-items-center" onClick={() => setGetSubmission(true)}>
                                <p className="mb-0">Refresh</p>
                                <FontAwesomeIcon icon={faArrowsRotate} style={{ color: '#fff' }} />
                            </div>
                            <div className="rounded bg-grad-1 text-light d-block px-3 py-2 hover-grad-1 transition-colors d-flex flex-row gap-2 align-items-center">
                                <p className="mb-0">Selengkapnya</p>
                                <FontAwesomeIcon icon={faArrowRight} style={{ color: '#fff' }} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container px-5 d-flex py-2 pb-3">
                </div>

                <div className="container table-container px-5">
                    <div className="bg-clear rounded-3 p-4">
                        <TableRecent />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard