import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { url } from "../../../baseUrl";

function BankReport() {
  const [bankData, setbankData] = useState([]);

  useEffect(() => {
    getBankUsers();
  }, []);

  const getBankUsers = async () => {
    try {
      const res = await axios.get(`${url}/getbankUsers`);
      // console.log(res.data);
      setbankData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(bankData);

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="container mt-5">
            <h2 className="mb-4 text-center">Bank Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Bank Name</th>
                    <th>Address</th>
                    <th>Loan Details</th>
                    <th>No. of Loans Provided</th>
                  </tr>
                </thead>
                <tbody>
                  {bankData.map((bank, index) => (
                    <tr key={index}>
                      <td>{bank.name}</td>
                      <td>{bank.address}</td>
                      <td>
                        <table className="table table-sm table-bordered mb-0 nested-table">
                          <thead className="table-light">
                            <tr>
                              <th>Loan Name</th>
                              <th>Details</th>
                              <th>Amount</th>
                              <th>Interest (%)</th>
                              {/* <th>Duration</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {bank.loanDetails.map((loan, loanIndex) => (
                              <tr key={loanIndex}>
                                <td>{loan.category}</td>
                                <td>{loan.description}</td>
                                <td>{loan.amount}</td>
                                <td>{loan.interest}</td>
                                {/* <td>{loan.duration}</td> */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        {
                          bank.loans.filter(
                            (item, index) => item.loanStatus === "approved"
                          ).length
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankReport;
