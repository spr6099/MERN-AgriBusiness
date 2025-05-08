import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";
import { url } from "../../baseUrl";

function LoanRequests() {
  const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [data, setData] = useState([]);

  useEffect(() => {
    getLoanReqDetails();
  }, []);

  const getLoanReqDetails = async () => {
    const datas = {
      userId: auth?._id,
      user: "bankId",
    };
    try {
      const response = await axios.post(`${url}/getLoanReqDetails`, datas);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  const changeLoanStatus = async (id, status) => {
    try {
      const res = await axios.post(`${url}/changeLoanStatus`, { id, status });

      // Update state without reloading
      if (res.status === 200) {
        setData((prevData) =>
          prevData.map((loan) =>
            loan._id === id ? { ...loan, loanStatus: status } : loan
          )
        );
      }
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />

        {/* Pending Loans */}
        <div className="content p-4" style={{ minHeight: "30px" }}>
          <h3 className="fw-bold">New Loan Details</h3>

          <div className="container mt-4">
            <div className="row">
              {data?.some((loan) => loan.loanStatus === "pending") ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Loan Amount</th>
                        <th>Duration (months)</th>
                        <th>Interest Rate (%)</th>
                        <th>Account Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter((loan) => loan.loanStatus === "pending")
                        .map((loan, index) => (
                          <tr key={loan._id}>
                            <td>{index + 1}</td>
                            <td>{loan.userName}</td>
                            <td>{loan.email}</td>
                            <td>{loan.phone}</td>
                            <td>{loan.address}</td>
                            <td className="text-success fw-bold">
                              ${loan.loanAmount}
                            </td>
                            <td className="text-info fw-bold">
                              {loan.loanDuration}
                            </td>
                            <td className="text-danger fw-bold">
                              {loan.interest}
                            </td>
                            <td>{loan.accountNumber}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  changeLoanStatus(loan._id, "approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  changeLoanStatus(loan._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-primary">
                  No pending loan requests.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Approved Loans */}
        <div className="content p-4">
          <h3 className="fw-bold"> Loan Details</h3>

          <div className="container mt-4">
            <div className="row">
              {data?.some(
                (loan) =>
                  loan.loanStatus === "approved" ||
                  loan.loanStatus === "rejected"
              ) ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover shadow-sm">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Loan Amount</th>
                        <th>Duration (months)</th>
                        <th>Interest Rate (%)</th>
                        <th>Account Number</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(
                          (loan) =>
                            loan.loanStatus === "approved" ||
                            loan.loanStatus === "rejected"
                        )
                        .map((loan, index) => (
                          <tr key={loan._id}>
                            <td>{index + 1}</td>
                            <td>{loan.userName}</td>
                            <td>{loan.email}</td>
                            <td>{loan.phone}</td>
                            <td>{loan.address}</td>
                            <td className="text-success fw-bold">
                              ${loan.loanAmount}
                            </td>
                            <td className="text-info fw-bold">
                              {loan.loanDuration}
                            </td>
                            <td className="text-danger fw-bold">
                              {loan.interest}
                            </td>
                            <td>{loan.accountNumber}</td>
                            <td>{loan.loanStatus}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">
                  No approved loan details available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRequests;
