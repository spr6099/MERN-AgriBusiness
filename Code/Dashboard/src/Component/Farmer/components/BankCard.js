import React from "react";
import { Card, Button } from "react-bootstrap";

const BankCard = ({ bank }) => {
  return (
    <Card className="shadow-lg border-0 rounded-lg m-3 p-3">
      <Card.Body>
        <h4 className="text-primary fw-bold">{bank.name}</h4>
        <p className="text-muted mb-2">
          <i className="bi bi-geo-alt-fill"></i> {bank.address}
        </p>
        <p className="text-muted mb-2">
          <i className="bi bi-telephone-fill"></i> {bank.contact}
        </p>

        <hr />

        <h5 className="text-success fw-bold">Loan Information</h5>
        {bank.loans.map((loan, index) => (
          <div key={index} className="mb-3">
            <p className="fw-bold mb-1">{loan.type}</p>
            <p className="text-muted small">{loan.details}</p>
            <p className="fw-bold">Amount: ₹{loan.amount}</p>
          </div>
        ))}

        <Button variant="primary" className="w-100 mt-2">
          Apply for Loan
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BankCard;
