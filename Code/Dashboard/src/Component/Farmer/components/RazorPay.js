import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../baseUrl";

function PaymentComponent({ loan, id }) {
  const [loanAmount, setLoanAmount] = useState("");

  const totalPaid = (loan.loanRepay ?? []).reduce(
    (total, repay) => total + Number(repay.paidAmount),
    0
  );
  const remainingBalance = loan.loanAmount - totalPaid;

  const HandleSubmit = async (paymentId) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("loan[status]", "paid");
      formData.append("transactionId", paymentId);

      if (loanAmount > 0 && loanAmount <= remainingBalance) {
        formData.append("loan[amount]", loanAmount);
      } else {
        alert("Invalid payment amount.");
        return;
      }

      const res = await axios.post(`${url}/updateLoanAmount`, formData);

      if (res.status === 200) {
        alert("Loan repayment recorded successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating loan amount:", error);
      alert("Failed to update loan amount. Please try again.");
    }
  };

  const handlePayment = async () => {
    const amount = parseFloat(loanAmount);

    if (!amount || isNaN(amount) || amount <= 0 || amount > remainingBalance) {
      alert("Please enter a valid amount within the remaining balance.");
      return;
    }

    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay script not loaded!");
      return;
    }

    const options = {
      key: "rzp_test_4Ex6Tyjkp79GFy",
      amount: amount * 100,
      currency: "INR",
      name: "Your Company Name",
      description: "Loan Repayment",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        HandleSubmit(response.razorpay_payment_id);
      },
      prefill: {
        id: id,
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Some address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="card p-4 shadow-sm border rounded">
      <h5 className="text-primary mb-3">Loan Repayment</h5>
      <p className="fw-bold text-secondary">Remaining Balance: ₹{remainingBalance}</p>
      <div className="mb-3">
        <label className="form-label fw-bold">Enter Amount to Pay</label>
        <input
          type="number"
          className="form-control"
          name="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter amount in ₹"
        />
      </div>
      <button
        className="btn btn-success w-100"
        onClick={handlePayment}
        disabled={!loanAmount || loanAmount <= 0 || loanAmount > remainingBalance}
      >
        Pay Now
      </button>
    </div>
  );
}

export default PaymentComponent;
