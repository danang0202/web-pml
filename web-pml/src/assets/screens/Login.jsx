import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import NotifCenter from "../components/NotifCenter";
import apiCentral from "../config/axiosCentral";
import apiListing from "../config/axiosListing";
import apiCentralProject from "../config/axiosCentralProject";
import { useTimContext } from "../../context/TimContext";
import { useParams } from "react-router-dom";

function Login() {
    const { ref, tag, expiresAt } = useParams();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const [notifLogin, setNotifLogin] = useState();
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const [tim, setTim] = useState();
    const { dataTim, updateDataTim, updateDataWilayahKerjaTim } = useTimContext();

    useEffect(() => {
        setLoading(true);
        Cookies.set("token", ref, { expires: 1 });
        Cookies.set("email", tag, { expires: 1 });
        setToken(ref);
        setEmail(tag);
        localStorage.setItem('expiresAt', expiresAt)
    }, [])

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     const data = {
    //         email,
    //         password,
    //     };
    //     try {
    //         const response = await apiCentral.post("/v1/sessions", data, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         if (response.status == 200) {
    //             const responseData = await response.data;
    //             console.log(response);
    //             Cookies.set("token", responseData.token, { expires: 1 });
    //             Cookies.set("__Host-session", responseData.token, { expires: 1, secure: true, sameSite: 'strict' });
    //             Cookies.set("__csrf", responseData.csrf, { expires: 1 });
    //             localStorage.setItem('sessionExpires', responseData.expiresAt)
    //             Cookies.set("csrf", responseData.csrf, { expires: 1 });
    //             setLoginResponse(responseData);
    //             // Cookies.set("__Host-session", "NilaiToken", {
    //             //     expires: 1, // Cookie berakhir dalam 1 hari
    //             //     secure: true, // Hanya akan dikirimkan melalui HTTPS
    //             //     sameSite: "strict", // Hanya akan dikirimkan dalam permintaan yang sama dengan domain yang ditetapkan
    //             //     path: "/", // Berlaku untuk semua path dalam subdomain "central.pkl.stis.ac.id"
    //             //   });
    //         }
    //     } catch (error) {
    //         setNotifLogin("false");
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        const fetchDataTim = async () => {
            try {
                const data = { email };
                const response = await apiListing.post('get-data-tim', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setTim(response.data);
            } catch (error) {
                console.log("Terdapat error di halaman dashboard");
            }
        }
        if (token && email) {
            fetchDataTim();
        }
    }, [email, token])

    const getIdAkun = (anggotaTim, user) => {
        const akun = user.find(akun => akun.displayName == anggotaTim.nim);
        return akun ? akun.id : null;
    };

    const mergeTimAndAkun = (dataAkun) => {
        let akunId;
        tim.map((data) => {
            akunId = getIdAkun(data, dataAkun);
            if (akunId) {
                data.akunId = akunId;
            }
        })
        updateDataTim(tim);
    }


    useEffect(() => {
        const fetchAllAkunProjectCentral = async () => {
            try {
                const response = await apiCentralProject.get('app-users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.status == 200) {
                    mergeTimAndAkun(response.data);
                }

            } catch (error) {
                console.log("Terdapat error di halaman dashboard 2");
            }
        }
        if (tim && token) {
            fetchAllAkunProjectCentral();
        }
    }, [tim])

    useEffect(() => {
        const fetchDataWilayahKerja = async () => {
            try {
                let idTim = 0;
                idTim = tim[0].id_tim;
                const response = await apiListing.post(`get-bs-tim/${idTim}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (response.status == 200) {
                    updateDataWilayahKerjaTim(response.data);
                    sessionStorage.setItem("notif-login", "success");
                    navigate("/");
                }
            } catch (error) {
                console.log("Terdapat masalah pada get wilayah kerja tim");
            } finally {
                setTimeout(() => {
                    setNotifLogin("");
                }, 500);
                setLoading(false);
            }
        }
        if (tim) {
            fetchDataWilayahKerja();
        }
    }, [tim])

    return (
        <>
            {notifLogin && notifLogin == "false" && (
                <NotifCenter icon={"error"} text={"Login gagal"} />
            )}
            <div className="container d-flex justify-content-center align-items-center min-h-100">
                <div className="">
                    <div className="container-fluid d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-row shadow-lg rounded-4 justify-content-center">
                            <div className="form-container bg-clear p-lg-5 py-5 p-4 rounded-4">
                                <div className="logo-container mb-2 d-flex align-items-center flex-column gap-4 text-purple">
                                    <div className="d-flex align-items-center justify-content-center gap-4">
                                        <img
                                            src="images/login/ketupat.svg"
                                            alt="ketupat"
                                            className="rotate-90 w-18"
                                        />
                                        <img
                                            src="images/login/orang.svg"
                                            alt="Maskot"
                                            className="w-45"
                                        />
                                        <img
                                            src="images/login/ketupat.svg"
                                            alt="ketupat"
                                            className="w-18"
                                        />
                                    </div>
                                    <h1 className="fs-2 text-center fw-bold text-blue-1">
                                        Silahkan login dengan akun PML !
                                    </h1>
                                </div>
                                <form className="form-floating">
                                    <div className="form-floating mb-3 mx-sm-5">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control poppins border-blue-1"
                                            aria-label="Email"
                                            placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)} />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating mx-sm-5">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control poppins border-blue-1"
                                            aria-label="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn bg-grad-1 w-max fw-bold mt-3 text-light mx-auto d-block px-5 hover-op8"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </>
    );
}

export default Login;
