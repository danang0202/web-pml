import { useState } from "react";
import Cookies from "js-cookie";
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
      const response = await apiCentral.post("/v1/sessions", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        const responseData = await response.data;
        Cookies.set("token", responseData.token, { expires: 1 });
        Cookies.set("csrf", responseData.csrf, { expires: 1 });
        sessionStorage.setItem("notif-login", "success");
        navigate("/");
      }
    } catch (error) {
      setNotifLogin("false");
    } finally {
      setTimeout(() => {
        setNotifLogin("");
      }, 500);
      setLoading(false);
    }
  };

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
                  <h1 className="poppins fs-2 text-center fw-bold text-blue-1">
                    Silahkan login dengan akun PML !
                  </h1>
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
                
                <form onSubmit={handleSubmit} className="form-floating">
                <div className="form-floating mb-3 mx-sm-5">
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className="form-control poppins border-blue-1"
                      aria-label="Email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}/>
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
                  {/* <div className="mb-3 mx-sm-5 form-floating">
                    <label htmlFor="email" className="poppins text-blue-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control poppins border-blue-1"
                      aria-label="Email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 mx-sm-5">
                    <label htmlFor="password" className="poppins text-blue-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control poppins border-blue-1"
                      aria-label="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="btn bg-grad-1 w-max fw-bold mt-3 text-light mx-auto d-block px-5"
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
