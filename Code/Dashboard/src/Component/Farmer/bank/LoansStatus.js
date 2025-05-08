import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { url } from "../../../baseUrl";
import PaymentComponent from "../components/RazorPay";

function LoansStatus() {
  const [auth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    getLoanReqDetails();
  }, []);

  const getLoanReqDetails = async () => {
    try {
      const response = await axios.post(`${url}/getLoanReqDetails`, {
        userId: auth?._id,
        user: "userId",
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  return (
    <div className="container-fluid d-flex p-0 bg-light min-vh-100">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content mt-4 px-4">
          <h3 className="fw-bold text-primary">Loan Details</h3>
          <div className="row">
            {["pending", "approved", "rejected"].map((status) => (
              <LoanSection
                key={status}
                data={data}
                filterStatus={status}
                onShowModal={setSelectedLoan}
                setShowModal={setShowModal}
              />
            ))}
          </div>
        </div>
        {showModal && (
          <PaymentModal
            loan={selectedLoan}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

const LoanSection = ({ data, filterStatus, onShowModal, setShowModal }) => (
  <div className="card shadow-sm p-4 mb-4 rounded border">
    <h5 className="fw-bold mb-3 text-capitalize text-dark">
      {filterStatus} Loans
    </h5>
    {data.some((loan) => loan.loanStatus === filterStatus) ? (
      <TableComponent
        data={data}
        filterStatus={filterStatus}
        onShowModal={(loan) => {
          onShowModal(loan);
          setShowModal(true);
        }}
      />
    ) : (
      <p className="text-center text-muted">No {filterStatus} loan requests.</p>
    )}
  </div>
);

const TableComponent = ({ data, filterStatus, onShowModal }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover text-center border rounded">
      <thead className="bg-dark text-white">
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Loan Amount</th>
          {filterStatus === "approved" && <th>Balance Amt.</th>}
          <th>Duration (months)</th>
          <th>Account Number</th>
          <th>Status</th>
          {filterStatus === "approved" && <th>Payment</th>}
        </tr>
      </thead>
      <tbody>
        {data
          .filter((loan) => loan.loanStatus === filterStatus)
          .map((loan, index) => {
            const totalPaid = (loan.loanRepay ?? []).reduce(
              (total, repay) => total + Number(repay.paidAmount),
              0
            );
            const isFullyPaid = totalPaid >= loan.loanAmount; // Check if fully paid

            return (
              <tr key={loan._id} className="align-middle">
                <td>{index + 1}</td>
                <td>{loan.userName}</td>
                <td className="text-success fw-bold">₹{loan.loanAmount}</td>
                {filterStatus === "approved" && (
                  <td className="text-primary fw-bold">
                    ₹{loan.loanAmount - totalPaid}
                  </td>
                )}
                <td>{loan.loanDuration}</td>
                <td>{loan.accountNumber}</td>
                <td>
                  <span
                    className={`badge bg-${
                      filterStatus === "pending"
                        ? "warning"
                        : filterStatus === "approved"
                        ? "success"
                        : "danger"
                    }`}
                  >
                    {loan.loanStatus}
                  </span>
                </td>
                {filterStatus === "approved" && (
                  <td>
                    <button
                      className={`btn btn-sm ${
                        isFullyPaid ? "btn-success" : "btn-outline-primary"
                      }`}
                      onClick={() => !isFullyPaid && onShowModal(loan)}
                      disabled={isFullyPaid}
                    >
                      {isFullyPaid ? "completed" : "Pay Now"}
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
);

const LoanRepaySummary = ({ loan }) => {
  const totalPaid = (loan.loanRepay ?? []).reduce(
    (total, repay) => total + Number(repay.paidAmount),
    0
  );
  return (
    <div className="p-3 border rounded bg-light">
      <p className="fw-bold text-danger">Total Amount: ₹{loan.loanAmount}</p>

      <h5 className="text-dark">Repayment Summary</h5>
      <ul className="list-group mb-3">
        {loan?.loanRepay?.map((repay, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            <span>
              ₹{repay.paidAmount} - {repay.transactionId}
            </span>
            <span className="text-muted">
              ({new Date(repay.updatedAt).toLocaleDateString()})
            </span>
          </li>
        ))}
      </ul>
      <p className="fw-bold text-success">Total Paid: ₹{totalPaid}</p>
      <p className="fw-bold text-primary">
        Remaining Loan: ₹{loan.loanAmount - totalPaid}
      </p>
      {totalPaid > loan.loanAmount && (
        <p className="fw-bold text-danger">
          Overpaid by: ₹{totalPaid - loan.loanAmount}
        </p>
      )}
    </div>
  );
};

const PaymentModal = ({ loan, onClose }) => (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ background: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-primary">Loan Payment</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div
          className="modal-body"
          style={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          <LoanRepaySummary loan={loan} />
          <PaymentComponent loan={loan} id={loan._id} />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-success">Confirm Payment</button>
        </div>
      </div>
    </div>
  </div>
);

export default LoansStatus;
