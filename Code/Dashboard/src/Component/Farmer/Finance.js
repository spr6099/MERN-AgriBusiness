import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";

function Finance() {
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/bankerlist")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setBanks(result);
      })
      .catch((error) => console.error("Error fetching:", error));
  }, []);
  // console.log(banks);

  return (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content">
            <div
              className="ordercards-container"
              style={{
                margin: "10px 10px",
                padding: "20px",
                border: "thin solid gray",
              }}
            >
              <h2 style={{ margin: "20px 20px 20px 100px" }}>Finance</h2>
            </div>

            <div>
              {banks.length > 0 ? (
                <div className="row">
                  {banks.map((item, index) => (
                    <div key={index} className="col-md-6 col-lg-4 ">
                      <div
                        className="card border-0 shadow-lg p-3 bg-white rounded"
                        style={{ transition: "0.3s", cursor: "pointer" }}
                        onClick={() => navigate(`/bankpage/${item._id}`)}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src="/img/bank.jpg"
                            alt="Bank Icon"
                            className="rounded-circle me-3"
                            style={{
                              height: "80px",
                              width: "80px",
                              objectFit: "cover",
                              border: "3px solid #007bff",
                            }}
                          />
                          <div>
                            <h5 className="fw-bold text-primary">
                              {item.register?.name || "No Name"}
                            </h5>
                            <p className="text-muted small">
                              Trusted banking partner since 2000.
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Link
                            // to={`/bankingpage/${item.register._id}`}
                            to={`/bankingpage/${item._id}`}
                            className="btn btn-outline-primary w-100"
                            onClick={(e) => e.stopPropagation()} // Prevents card click event
                          >
                            View Bank
                          </Link>
                          {/* This means when you click the "View Bank" button, the click event might be triggering the card's onClick first, which prevents the button from working correctly.
  🔹 Fix: Use event.stopPropagation() in the button’s click event to prevent the card’s onClick from interfering.
                         */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">No banks found...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Finance;
