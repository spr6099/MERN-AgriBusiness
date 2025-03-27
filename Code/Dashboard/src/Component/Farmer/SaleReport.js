import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";


function SaleReport() {
  const [order, setOrder] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

  useEffect(() => {
    if (auth && auth._id) {
      let farmerid = auth._id;
      fetch('http://localhost:5000/salereport', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ farmerid: farmerid })
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
    }
  }, []);

  return (
    <>

    <div className="container-fluid d-flex p-0">
          <Sidebar />
          <div className="flex-grow-1">
            <Header />
            <div className="content p-4">
        <div className="ordercards-container" style={{ margin: "10px 10px", padding: "20px", border: "thin solid gray", width: "1200px" }}>
          <h2 style={{ margin: "20px 20px 20px 100px" }}>Customer Orders</h2>
          {order.map((data) => (
            <div className="ordercards" key={data._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "thin solid gray", padding: "10px 0" }}>
              <div className="ordercard-image" style={{ marginRight: "20px" }}>
                <img src={`http://localhost:5000/${data.newdatas.picture}`} 
                  className="card-img-left"
                  style={{ width: "150px", height: "150px" }}
                  alt={data.newdatas.subcategory}
                />
              </div>
              <div className="ordercard-details" style={{ flex: "1" }}>
                <div className="product__item__text">
                  <h4 style={{ color: "white", marginBottom: "5px" }}>
                    <b>{data.newdatas.subcategory}</b>
                  </h4>
                  <h5>₹{data.newdatas.price}.00</h5>
                </div>
              </div>
              <div className="ordercard-date" style={{ flex: "1", textAlign: "centre"}}>
                <p style={{ color: "white", marginBottom: "5px" }}>
                  <b>User name</b>
                </p>
                <p style={{ color: "white" }}>{data.customerName}</p>
              </div>
              <div className="ordercard-date" style={{ flex: "1", textAlign: "right", marginLeft: "20px" }}>
                <p style={{ color: "white", marginBottom: "5px" }}>
                  <b>Purchase Date & Time :</b>
                </p>
                <p style={{ color: "white" }}>{data.updatedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      
    </>
  );
}

export default SaleReport;
