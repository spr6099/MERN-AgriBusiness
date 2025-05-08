import React, { useEffect, useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useParams } from "react-router-dom";
import "../../../App.css";
import { url } from "../../../baseUrl";
import axios from "axios";

function BankPage() {
  const { id } = useParams();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [profile, setProfile] = useState(null);
  const [loans, setLoans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [file, setfile] = useState(null);

  useEffect(() => {
    fetchProfileData();
    getLoanDetails();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${url}/profile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: id }),
      });
      const result = await response.json();
      setProfile(result);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const getLoanDetails = async () => {
    try {
      const res = await axios.get(`${url}/getloandetails/${id}`);
      setLoans(res?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Open Modal with Selected Loan Details
  const openApplyLoanModal = (loan) => {
    setSelectedLoan(loan);
    // console.log(loan);

    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedLoan(null);
  };

  const [formData, setFormData] = useState({
    userName: user?.name || "",
    email: user?.email || "",
    phone: "",
    accountNumber: "",
    loanAmount: "",
    loanDuration: "",
    address: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Loan Application Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    formDataObj.append("loanType", selectedLoan?.type);

    formDataObj.append("bankId", id);
    formDataObj.append("loanId", selectedLoan?._id);

    formDataObj.append("userId", user?._id);

    formDataObj.append("image", file);
    formDataObj.append("loanStatus", "pending");

    try {
      const response = await axios.post(`${url}/apply-loan`, formDataObj);
      alert("Loan application submitted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  // console.log("loanId", selectedLoan?._id);
  // console.log("BankId", id);

  return (
    <div className="container-fluid d-flex p-0 bg-dark text-light min-vh-100">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content mt-4 px-4">
          {profile ? (
            <div className="card bg-secondary text-light shadow-lg p-4 border-0 rounded-lg">
              <h3 className="text-warning fw-bold">{profile.name}</h3>
              <p>
                <i className="bi bi-geo-alt-fill text-light"></i>{" "}
                {profile.address}
              </p>
              <p>
                <i className="bi bi-telephone-fill text-light"></i> 9784512354
              </p>
              <p>
                <i className="bi bi-envelope-fill text-light"></i>{" "}
                {profile.name}@gmail.com
              </p>

              <hr className="border-light" />

              <h4 className="text-info fw-bold">Loan Information</h4>
              {loans.map((loan, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded text-dark"
                  style={{ backgroundColor: "#bcb8b1" }}
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <i
                        className="bi bi-cash-coin text-primary"
                        style={{ fontSize: "2rem" }}
                      ></i>
                    </div>
                    <div>
                      <h5 className="fw-bold text-dark mb-1">{loan.type}</h5>
                      <p className="text-muted small">{loan.category}</p>
                    </div>
                  </div>

                  <hr className="my-2" />

                  <p className="text-secondary">{loan.description}</p>
                  <p className="fw-bold text-success">
                    Loan Amount: ₹{loan.amount}
                  </p>
                  <p className="fw-bold text-success">
                    Loan Interest: {loan.interest}%
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-outline-primary">
                      <i className="bi bi-info-circle"></i> More Info
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => openApplyLoanModal(loan)}
                    >
                      <i className="bi bi-check-circle"></i> Apply Loan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Loading bank details...</p>
          )}
        </div>
      </div>

      {/* Apply Loan Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">
                  Apply for {selectedLoan?.type} Loan
                </h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                <p>
                  <strong>Loan Type:</strong> {selectedLoan?.type}
                </p>
                <p>
                  <strong>Category:</strong> {selectedLoan?.category}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{selectedLoan?.amount}
                </p>
                <p>
                  <strong>Interest Rate:</strong> {selectedLoan?.interest}%
                </p>

                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={user?.name}
                      name="userName"
                      className="form-control"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={user?.email}
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your phone number"
                      pattern="[0-9]{10}"
                      required
                    />
                    <small className="text-muted">
                      Enter a valid 10-digit number.
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Job</label>
                    <input
                      type="text"
                      value={user?.category}
                      className="form-control"
                      // placeholder="Enter your phone number"

                      required
                    />
                    <small className="text-muted">
                      Enter a valid 10-digit number.
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Bank Account Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="accountNumber"
                      placeholder="Enter your bank account number"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Loan Amount Requested (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="loanAmount"
                      placeholder="Enter loan amount"
                      min="1000"
                      max="10000000"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Loan Duration (Months/Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="loanDuration"
                      placeholder="Enter duration"
                      min="1"
                      max="30"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder="Enter your full address"
                      rows="3"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Upload Documents</label>
                    <input
                      type="file"
                      // name="documents"
                      className="form-control"
                      // accept="image/*,application/pdf"
                      // multiple
                      onChange={(e) => setfile(e.target.files[0])}
                      required
                    />
                    <small className="text-muted">
                      Upload ID proof, Income proof, etc. (PDF or Image)
                    </small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankPage;
