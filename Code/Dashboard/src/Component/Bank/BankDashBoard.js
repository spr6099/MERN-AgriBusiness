import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
export default function BankDashBoard() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  const userid = auth._id;

  return (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content ">
            <p className="m-1">DashBoard</p>
          </div>
        </div>
      </div>
    </>
  );
}
