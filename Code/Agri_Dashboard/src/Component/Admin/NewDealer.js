import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function NewDealer() {
  const [dealers, setdealers] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/newDealer")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdealers(result || []);
      })
      .catch((error) => console.error("Error fetching:", error));
  }, []);

  const deletenewdealer = (id) => {
    if (window.confirm('Are you sure you want to delete this dealer?')) {

    let params = { id: id };
    fetch("http://localhost:5000/deleteNewdealer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result) {
          setMessage("Dealer rejected successfully");
          setMessageType("success");
          setTimeout(() => {
            window.location.reload();
          }, 2000);

        } else {
          setMessage("Error rejecting Dealer");
          setMessageType("error");
        }
      })
      .catch((error) => {
        console.error("Error deleting:", error);
        setMessage("Error rejecting Dealer");
        setMessageType("error");
      });
    }
  };

  const editDealer = (id) => {
    fetch("http://localhost:5000/editdealer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, userStatus: "3" }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setMessage("Dealer approved successfully");
          setMessageType("success");
          window.location.reload(); // Refresh the page after successful update
        } else {
          setMessage("Error approving Dealer");
          setMessageType("error");
        }
      })
      .catch((error) => {
        console.error("Error updating:", error);
        setMessage("Error approving Dealer");
        setMessageType("error");
      });
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          {message && (
            <div
              style={{
                color: messageType === "success" ? "green" : "red",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}
          <div className="bg-secondary rounded h-100 p-4">
            <h3 className="mb-4">New Dealer Details</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Sl. No</th>
                  <th scope="col">Farmer name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dealers.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.register.name}</td>
                    <td>{data.register.address}</td>
                    <td>{data.email}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${data.register.image}`}
                        alt="Farmer"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success me-1"
                        type="button"
                        onClick={() => editDealer(data._id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => deletenewdealer(data._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
