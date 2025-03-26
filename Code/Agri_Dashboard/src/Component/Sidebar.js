import React, { useState } from "react";

export default function Sidebar() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  // console.log(auth);

  return (
    <>
      {auth.userStatus === "0" && (
        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-secondary navbar-dark">
            <a href="/" className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary">
                <i className="fa fa-user-edit me-2"></i>HarvestHub
              </h3>
            </a>
            <div className="d-flex align-items-center ms-4 mb-4">
              <div className="position-relative">
                {/* <img className="rounded-circle" 
                src="img/user.jpg" 
                alt="" style={{ width: '40px', height: '40px' }} /> */}

                {auth && auth.image ? (
                  <img
                    className="rounded-circle me-lg-2"
                    src={`http://localhost:5000${auth.image}`} // Ensure the image URL is correct
                    alt="Profile"
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <img
                    className="rounded-circle me-lg-2"
                    src="img/default-avatar.jpg" // Default avatar if no image is found
                    alt="Default Avatar"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0">{auth.name}</h6>
                <span>Admin</span>
              </div>
            </div>
            <div className="navbar-nav w-100">
              <a href="/" className="nav-item nav-link active">
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </a>
              <a href="/newfarmer" className="nav-item nav-link">
                <i className="fa fa-th me-2"></i>New Farmers
              </a>
              <a href="/newdealer" className="nav-item nav-link">
                <i className="fa fa-th me-2"></i>New Dealers
              </a>
              <a href="/newbankers" className="nav-item nav-link">
                <i className="fa fa-th me-2"></i>New Bankers
              </a>
              <a href="/farmerlist" className="nav-item nav-link">
                <i className="fa fa-keyboard me-2"></i>Farmer List
              </a>
              <a href="/dealerlist " className="nav-item nav-link">
                <i className="fa fa-keyboard me-2"></i>
                Dealers List
              </a>
              <a href="/bankerlist " className="nav-item nav-link">
                <i className="fa fa-keyboard me-2"></i>Bankers List
              </a>

              <a href="/profile" className="nav-item nav-link">
                <i className="fa fa-eye me-2"></i>Profile
              </a>
              <a href="/viewcategory" className="nav-item nav-link">
                <i className="fa fa-square me-2"></i>Category
              </a>
              <a href="/products" className="nav-item nav-link">
                <i className="fa fa-dot-circle me-2"></i>Product
              </a>
              <a href="/salelist" className="nav-item nav-link">
                <i className="fa fa-fax me-2"></i>Order List
              </a>
              <a href="/complaints" className="nav-item nav-link">
                <i className="fa fa-comment me-2"></i>Complaints
              </a>
            </div>
          </nav>
        </div>
      )}

      {auth.userStatus === "1" && (
        <div className="sidebar pe-4 pb-3">
          <nav className="navbar bg-secondary navbar-dark">
            <a href="index.html" className="navbar-brand mx-4 mb-3">
              <h3 className="text-primary">
                <i className="fa fa-user-edit me-2"></i>HarvestHub
              </h3>
            </a>
            <div className="d-flex align-items-center ms-4 mb-4">
              <div className="position-relative">
                {/* <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: '40px', height: '40px' }} /> */}
                {auth && auth.image ? (
                  <img
                    className="rounded-circle me-lg-2"
                    src={`http://localhost:5000${auth.image}`} // Ensure the image URL is correct
                    alt="Profile"
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <img
                    className="rounded-circle me-lg-2"
                    src="img/default-avatar.jpg" // Default avatar if no image is found
                    alt="Default Avatar"
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
              </div>
              <div className="ms-3">
                <h6 className="mb-0">{auth.name}</h6>
                <span>Farmer</span>
              </div>
            </div>
            <div className="navbar-nav w-100">
              <a href="/" className="nav-item nav-link active">
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </a>
              <a href="/profile" className="nav-item nav-link">
                <i className="fa fa-eye me-2"></i>Profile
              </a>
              <a href="/category" className="nav-item nav-link">
                <i className="fa fa-square me-2"></i>Category
              </a>
              <a href="/viewproducts" className="nav-item nav-link">
                <i className="fa fa-dot-circle me-2"></i>Product
              </a>
              <a href="/viewcultivation" className="nav-item nav-link">
                <i className="fas fa-chart-area fa-fw me-2"></i>Cultivation
              </a>
              <a href="/salereport" className="nav-item nav-link">
                <i className="fa fa-fax me-2"></i>Sale History
              </a>
              <a href="/viewrating" className="nav-item nav-link">
                <i className="fa fa-star me-2"></i>Rating
              </a>
              <a href="/viewfeedback" className="nav-item nav-link">
                <i className="fa fa-comment me-2"></i>feedback
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
