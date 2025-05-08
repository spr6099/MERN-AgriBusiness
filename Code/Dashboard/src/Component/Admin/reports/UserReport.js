import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { url } from "../../../baseUrl";

function UserReport() {
  const bankData = [
    {
      bankName: "Agri Bank",
      address: "123 Farm Lane",
      loanDetails: [
        {
          name: "Crop Loan",
          details: "For purchasing seeds and fertilizers",
          category: "Agriculture",
          amount: "₹50,000",
          interest: "7%",
          duration: "1 year",
        },
        {
          name: "Equipment Loan",
          details: "For buying machinery",
          category: "Machinery",
          amount: "₹2,00,000",
          interest: "9%",
          duration: "3 years",
        },
      ],
      loansProvided: 120,
      loansRepaid: 95,
    },
    // more banks...
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`${url}/getAllUsers`);
      // console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="container mt-5">
            <h2 className="mb-4 text-center">User Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    {/* <th>Status</th> */}
                    <th>Profile Image</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      {/* <td>{user.userStatus}</td> */}
                      <td>
                        <img
                          src={`${url}/${user?.image}`}
                          alt={user.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

export default UserReport;
