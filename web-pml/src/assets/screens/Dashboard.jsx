import { useEffect, useState } from "react"
import NotifCenter from "../components/NotifCenter";
import Cookies from 'js-cookie';
import apiListing from "../config/axiosListing";
import { useTimContext } from "../../context/TimContext";


function Dashboard() {
    const [notifLogin, setNotifLogin] = useState();
    const email = Cookies.get('email');
    const { dataTim, updateDataTim } = useTimContext();
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
        console.log(dataTim);
    }, [dataTim])

    useEffect(() => {
        const fetchDataTim = async () => {
            try {
                const data = { email };
                const response = await apiListing.post('/get-data-tim', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                updateDataTim(response.data);
            } catch (error) {
                console.log("Terdapat error di halaman dashboard");
            }
        }
        fetchDataTim();
    }, [])



    return (
        <>
            {notifLogin && (
                <NotifCenter icon={'success'} text={"Login berhasil !"} />
            )}
            <h1></h1>
        </>
    )
}

export default Dashboard