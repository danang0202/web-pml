import { useState } from "react"
import Cookies from 'js-cookie';
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import NotifCenter from "../components/NotifCenter";
import apiCentral from "../config/axiosCentral";


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState();
    const [notifLogin, setNotifLogin] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            email,
            password,
        };
        try {
            const response = await apiCentral.post('/v1/sessions', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200) {
                const responseData = await response.data;
                Cookies.set('token', responseData.token, { expires: 1 });
                Cookies.set('csrf', responseData.csrf, { expires: 1 });
                Cookies.set('email', email, { expires: 1 });
                sessionStorage.setItem('notif-login', 'success');
                navigate('/');
            }
        } catch (error) {
            setNotifLogin('false');
        } finally {
            setTimeout(() => {
                setNotifLogin('');
            }, 500);
            setLoading(false);
        }
    };

    return (
        <>
            {notifLogin && notifLogin == 'false' && (
                <NotifCenter icon={'error'} text={'Login gagal'} />
            )}
            <div className="container d-flex justify-content-center d-flex align-items-center">
                <div className=''>
                    <div className="container-fluid d-flex justify-content-center">
                        <div className='d-flex flex-row col-lg-7 col-12 shadow-lg'>
                            <div className="form-container bg-clear col-lg-8 col-md-8 col-12 p-lg-5 p-3 py-5">
                                <div className="logo-container mb-2 d-flex align-items-center flex-column gap-4 text-purple">
                                    <img src="/images/metalab-logo.png" alt="Fail image ..." style={{ width: '10rem' }} />
                                    <p>Silahkan login dengan akun PML !</p>
                                </div>
                                {/* {notif == 'success' && (
                                    <div className="smooth-transition alert alert-success d-flex align-items-center gap-3 my-2" role="alert">
                                        <i className="fa-solid fa-circle-check"></i>
                                        <div>
                                            Email activation successful, please log in!
                                        </div>
                                    </div>
                                )}
                                {resetPassStatus != '' && (
                                    <div className=" smooth-transition alert alert-success d-flex align-items-center gap-3 my-2" role="alert">
                                        <i className="fa-solid fa-circle-check"></i>
                                        <div>
                                            A link to reset password has been sent to your email, please check your email
                                        </div>
                                    </div>
                                )}
                                {fail !== '' && (
                                    <div className="smooth-transition alert alert-warning d-flex align-items-center gap-3" role="alert">
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                        <div>
                                            {fail}
                                        </div>
                                    </div>
                                )} */}
                                <form onSubmit={handleSubmit} >
                                    <div className="mb-3">
                                        <input type="email" name='email' className="form-control" aria-label='Email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" name='password' className="form-control" aria-label='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-warning w-100 fw-bold mt-3 text-light">Login</button>
                                </form>
                            </div>
                            <div className="box-container bg-blue d-flex flex-column w-100 pt-5 gap-3">
                                <div className="d-none d-md-block h-100">
                                    <div className="img-container d-flex flex-row gap-4 justify-content-center px-4">
                                        <img src="/images/metalab-logo-clear.png" className='' alt="..." style={{ width: '10rem' }} />
                                    </div>
                                    <div className='d-flex flex-column align-items-center text-light h-100 w-100'>
                                        <img src="/images/login-component.png" alt="" style={{ width: '100%', height: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {loading && (
                <Loading />
            )}
        </>
    )
}

export default Login