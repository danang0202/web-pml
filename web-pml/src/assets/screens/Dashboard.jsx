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
import Loading from "../components/Loading";
import { xmlFormId } from "../config/util";


function Dashboard() {
    const [notifLogin, setNotifLogin] = useState();
    const token = Cookies.get('token');
    const { updateDataSubmissions, getSubmissions, setGetSubmission } = useTimContext();
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
                const response = await apiCentralProject.get(`forms/${xmlFormId}/submissions`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status == 200) {
                    updateDataSubmissions(response.data, true);
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

            <div className="mt-lg-5 pt-5 pb-3 mt-3">
                <div className="container px-lg-5 px-md-0 px-3">
                    <div className="d-flex flex-row justify-content-between border-3 border-secondary border-bottom align-items-center pb-2">
                        <div className="d-flex flex-md-row flex-column gap-lg-5 gap-md-4 gap-2">
                            <h5 className="fw-bold text-blue mb-0 d-none d-lg-inline">Submissions Terbaru</h5>
                            <h6 className="fw-bold text-blue mb-0 d-inline d-lg-none">Submissions Terbaru</h6>
                            <p className="mb-0 d-none d-lg-inline"><span className="text-success fw-semibold">Last update</span> : {formatDateAndTime(localStorage.getItem('lastUpdate'))}</p>
                            <p className="mb-0 fs-7 d-inline d-lg-none text-center"><span className="text-success fw-semibold fs-7 d-none d-md-inline">Last update :</span> {formatDateAndTime(localStorage.getItem('lastUpdate'))}</p>
                        </div>
                        <div className="d-flex flex-row gap-lg-2 gap-1">
                            <div className="rounded bg-grad-3 text-light d-block px-lg-3 py-lg-2 px-2 py-2 hover-grad-1 transition-colors d-flex flex-row gap-2 align-items-center" onClick={() => setGetSubmission(true)}>
                                <p className="mb-0 fs-btn">Refresh <FontAwesomeIcon icon={faArrowsRotate} style={{ color: '#fff' }} /></p>
                            </div>
                            <div className="d-none d-md-inline">
                                <div className="rounded bg-grad-1 text-light d-block px-lg-3 py-lg-2 px-2 py-2 hover-grad-1 transition-colors d-flex flex-row gap-2 align-items-center">
                                    <p className="mb-0 fs-btn">Selengkapnya <FontAwesomeIcon icon={faArrowRight} style={{ color: '#fff' }} /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container px-lg-5 px-md-0 px-3 d-flex py-2 pb-3">
                </div>

                <div className="container table-container px-lg-5 px-md-0 px-3">
                    <div className="bg-clear rounded-3 p-lg-4 p-3 table-container">
                        <TableRecent setLoading={setLoading} />
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </>
    )
}

export default Dashboard