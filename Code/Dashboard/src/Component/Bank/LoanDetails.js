import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { url } from "../../baseUrl";

function LoanDetails() {
  const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [showModal, setShowModal] = useState(false);
  const [loan, setLoan] = useState({
    type: "",
    description: "",
    category: "",
    amount: "",
    interest: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const userid = auth?._id;
// console.log(userid);

  useEffect(() => {
    getLoanDetails();
  }, []);

  const getLoanDetails = async () => {
    try {
      const response = await axios.get(`${url}/getloandetails/${userid}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("userid", userid);
      formData.append("type", loan.type);
      formData.append("description", loan.description);
      formData.append("category", loan.category);
      formData.append("amount", loan.amount);
      formData.append("interest", loan.interest);
      if (file) {
        formData.append("file", file);
      }

      await axios.post(`${url}/addLoanData`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoan({ type: "", description: "", category: "", amount: "", interest: "" });
      setFile(null);
      setShowModal(false);
      getLoanDetails(); // Refresh data
    } catch (error) {
      setError("Failed to submit loan details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fw-bold">Loan Details</h3>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add Loan
            </button>
          </div>

          {/* Loan Details Cards */}
          <div className="container mt-4">
            <div className="row">
              {data.length > 0 ? (
                data.map((loan, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card border-0 shadow-lg p-3" style={{ borderRadius: "15px" }}>
                      <div className="card-body text-center">
                        <h4 className="card-title fw-bold text-primary">{loan.type}</h4>
                        <span className="badge bg-secondary px-3 py-1 mb-3">{loan.category}</span>
                        <p className="card-text text-muted">{loan.description}</p>

                        <div className="p-3 bg-light rounded">
                          <h6 className="text-dark mb-2">
                            <i className="bi bi-cash-stack text-success"></i> Amount: 
                            <span className="fw-bold text-success"> ${loan.amount}</span>
                          </h6>
                          <h6 className="text-dark">
                            <i className="bi bi-percent text-danger"></i> Interest Rate: 
                            <span className="fw-bold text-danger"> {loan.interest}%</span>
                          </h6>
                        </div>

                        <button className="btn btn-outline-primary mt-3">View More</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted">No loan details available.</p>
              )}
            </div>
          </div>

          {/* Add Loan Modal */}
          {showModal && (
            <>
              <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Loan</h5>
                      <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                        <div className="mb-3">
                          <label className="form-label">Loan Type</label>
                          <input type="text" name="type" className="form-control" placeholder="Enter loan type" value={loan.type} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <input type="text" name="description" className="form-control" placeholder="Enter description" value={loan.description} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select name="category" className="form-select" value={loan.category} onChange={handleChange} required>
                            <option value="">Select category</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Personal">Personal</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Upload File</label>
                          <input type="file" name="file" className="form-control" onChange={handleFileChange} />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Amount</label>
                          <input type="number" name="amount" className="form-control" placeholder="Enter amount" value={loan.amount} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Interest Rate (%)</label>
                          <input type="number" name="interest" className="form-control" placeholder="Enter interest rate" value={loan.interest} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                          {loading ? "Submitting..." : "Submit"}
                        </button>

                        {error && <p className="text-danger mt-2">{error}</p>}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop fade show"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
