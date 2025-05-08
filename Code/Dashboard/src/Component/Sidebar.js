import React, { useState } from "react";

export default function Sidebar() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  // console.log(auth);

  return (
    <>
      <div>
        {auth.userStatus === "0" && (
          <div className="sidebar pe-4 pb-3 mt-5">
            <nav className="navbar bg-secondary navbar-dark">
              <a href="/" className="navbar-brand mx-4 mb-3">
                <h3 className="text-primary">
                  <i className="fa fa-user-edit me-2"></i>HarvestHub
                </h3>
              </a>

              <div className="d-flex align-items-center ms-4 mb-4">
                <div className="position-relative">
                  {auth && auth.image ? (
                    <img
                      className="rounded-circle me-lg-2"
                      src={`http://localhost:5000${auth.image}`}
                      alt="Profile"
                      style={{ width: "40px", height: "40px" }}
                    />
                  ) : (
                    <img
                      className="rounded-circle me-lg-2"
                      src="img/default-avatar.jpg"
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
                <a href="/dealerlist" className="nav-item nav-link">
                  <i className="fa fa-keyboard me-2"></i>Dealers List
                </a>
                <a href="/bankerlist" className="nav-item nav-link">
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
              

                <div className="nav-item dropdown mb-5">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle bg-secondary"
                    id="financeDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-fax me-2"></i>Reports
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="financeDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/bankReport">
                        <i className="fa fa-university me-2"></i> Banks Report
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/farmerReport">
                        <i className="fa fa-money me-2"></i> Farmers Report
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/dealerReport">
                        <i className="fa fa-money me-2"></i> Dealers Report
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/userReport">
                        <i className="fa fa-money me-2"></i> Users Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        )}

        {auth.userStatus === "1" && (
          <div className="sidebar pe-4 pb-3 mt-5">
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
                <a href="/farmEssentials" className="nav-item nav-link">
                  <i className="fas fa-chart-area fa-fw me-2"></i>Farm
                  Essentials
                </a>
                <a href="/techSupport" className="nav-item nav-link">
                  <i className="fas fa-chart-area fa-fw me-2"></i>TechSupport
                  Hub
                </a>
                <a href="/salereport" className="nav-item nav-link">
                  <i className="fa fa-fax me-2"></i>Sale History
                </a>
                {/* <a href="/finance" className="nav-item nav-link">
                  <i className="fa fa-fax me-2"></i>Farm Finance
                </a> */}

                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    id="financeDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-fax me-2"></i>Farm Finance
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="financeDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/finance">
                        <i className="fa fa-university me-2"></i> Banks
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/loanStatus">
                        <i className="fa fa-money me-2"></i> Loans
                      </a>
                    </li>
                  </ul>
                </div>

                <a href="/techdata" className="nav-item nav-link">
                  <i className="fa fa-star me-2"></i>Tech
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

        {/*.......... Dealer */}

        {auth.userStatus === "3" && (
          <div className="sidebar pe-4 pb-3 mt-5">
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
                  <span>Dealer</span>
                </div>
              </div>
              <div className="navbar-nav w-100">
                <a href="/" className="nav-item nav-link active">
                  <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                </a>
                <a href="/agri_inputs" className="nav-item nav-link">
                  <i className="fa fa-eye me-2"></i>Agricultural inputs
                </a>
                <a href="/technical" className="nav-item nav-link">
                  <i className="fa fa-square me-2"></i>Advisory and technical
                  support
                </a>
                <a className="nav-item nav-link">
                  <i className="fa fa-dot-circle me-2"></i>Logistics and
                  delivery
                </a>

                {/* <a href="/viewcultivation" className="nav-item nav-link">
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
                </a> */}
              </div>
            </nav>
          </div>
        )}

        {/* -------Banker ------------------ - */}

        {auth.userStatus === "4" && (
          <div className="sidebar pe-4 pb-3 mt-5">
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
                  <span>Banker</span>
                </div>
              </div>
              <div className="navbar-nav w-100">
                <a href="/" className="nav-item nav-link active mb-2">
                  <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                </a>
                <a
                  href="/loandetails"
                  className="nav-item nav-link active mb-2"
                >
                  <i className="fa fa-tachometer-alt me-2"></i>Add Loan details
                </a>
                <a
                  href="/loanrequests"
                  className="nav-item nav-link active mb-2"
                >
                  <i className="fa fa-tachometer-alt me-2"></i>Loan Requests
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
