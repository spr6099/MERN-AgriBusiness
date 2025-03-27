import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);
  };

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

  // console.log(auth);

  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0" >
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars"></i>
      </a>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            {auth && auth.image ? (
              <img
                className="rounded-circle me-lg-2"
                src={`http://localhost:5000${auth.image}`} // Ensure the image URL is correct
                alt="Profile"
                style={{ width: '40px', height: '40px' }}
              />
            ) : (
              <img
                className="rounded-circle me-lg-2"
                src="img/default-avatar.jpg" // Default avatar if no image is found
                alt="Default Avatar"
                style={{ width: '40px', height: '40px' }}
              />
            )}
            <span className="d-none d-lg-inline-flex">{auth && auth.name}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="/profile" className="dropdown-item text-white">My Profile</a>
            <a href="/" className="dropdown-item text-white" onClick={logout}>Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
