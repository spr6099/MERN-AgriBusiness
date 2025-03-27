import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
   const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 100);
      };
    return (
        <>
            <div className="container-fluid px-5 d-none d-lg-block">
                <div className="row gx-5 py-3 align-items-center">
                    <div className="col-lg-3">
                        <div className="d-flex align-items-center justify-content-start">
                            <i className="bi bi-phone-vibrate fs-1 text-primary me-2"></i>
                            <h2 className="mb-0">+91 93455 67895</h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center justify-content-center">
                            <a href="/" className="navbar-brand ms-lg-5">
                                <h1 className="m-0 display-4 text-primary"><span className="text-secondary">Harvest</span>Hub</h1>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="d-flex align-items-center justify-content-end">
                            <a className="btn btn-success btn-square rounded-circle me-2" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-success btn-square rounded-circle me-2" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-success btn-square rounded-circle me-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-success btn-square rounded-circle" href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {  auth== null && (

            <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-5">
                <a href="/" className="navbar-brand d-flex d-lg-none">
                    <h1 className="m-0 display-4 text-secondary"><span className="text-white">Farm</span>Fresh</h1>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto py-0">
                        <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="/about" className="nav-item nav-link">About</a>
                        <a href="/service" className="nav-item nav-link">Service</a>
                        <a href="/feature" className="nav-item nav-link">Feature</a>
                        <a href="/register" className="nav-item nav-link">Register</a>
                        <a href="/login" className="nav-item nav-link">Login</a>
                    </div>
                </div>
            </nav>
            )}

            { auth && auth.userStatus === "2" && (
                <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm py-3 py-lg-0 px-3 px-lg-5">
                    <a href="/" className="navbar-brand d-flex d-lg-none">
                        <h1 className="m-0 display-4 text-secondary"><span className="text-white">Farm</span>Fresh</h1>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav mx-auto py-0">
                            <a href="/" className="nav-item nav-link active">Home</a>
                            <a href="/profiles" className="nav-item nav-link">Profile</a>
                            <a href="/cart" className="nav-item nav-link">Cart</a>
                            <a href="/order" className="nav-item nav-link">Order</a>
                            <a href="/complaint" className="nav-item nav-link">Complaint</a>
                            <a href="/" className="nav-item nav-link" onClick={logout}>Logout</a>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}
