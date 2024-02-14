import { useEffect, useState } from "react"
import NotifCenter from "../components/NotifCenter";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [notifLogin, setNotifLogin] = useState();
    useEffect(() => {
        if (sessionStorage.getItem('notif-login')) {
            setNotifLogin(true);
        }
        setTimeout(() => {
            sessionStorage.removeItem('notif-login');
            setNotifLogin('');
        }, 500);
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