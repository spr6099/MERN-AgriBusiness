import React, { useState, useEffect } from "react";
import Footer from "../Components/Footer";
import AddFeedback from "./AddFeedback";
import Rating from "./Rating";
import Header from "../Components/Header";

function Order() {
  const [order, setOrder] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
console.log(auth);
  useEffect(() => {
    if (auth && auth._id) {
      let userid = auth._id;
      fetch('http://localhost:5000/orderlist', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid: userid })
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
  }, [auth]);

  return (
    <>
      <Header />
      <h2 style={{ margin: "20px 20px 20px 100px" }}>My Orders</h2>
      <div className="ordercards-container" style={{ marginLeft: "100px", padding: "20px", border: "thin solid gray", width: "1200px" }}>
        {order.map((data) => (
          <div className="ordercards" key={data._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "thin solid gray", padding: "10px 0" }}>
            <div className="ordercard-image" style={{ marginRight: "20px" }}>
              <img
                src={`http://localhost:5000/${data.newdatas.picture}`}
                // src={data.newdatas.picture}
                className="card-img-left"
                style={{ width: "150px", height: "150px" }}
                alt={data.newdatas.subcategory}
              />
            </div>
            <div className="ordercard-details" style={{ flex: "1" }}>
              <div className="product__item__text">
                <h4 style={{ color: "black", marginBottom: "5px" }}>
                  <b>{data.newdatas.subcategory}</b>
                </h4>
                <h5>₹{data.newdatas.price}.00</h5>
              </div>
            </div>
            <div className="ordercard-date" style={{ flex: "1", textAlign: "centre", marginLeft: "20px" }}>
              <p style={{ color: "black", marginBottom: "5px" }}>
                <b>Purchase Date & Time :</b>
              </p>
              <p style={{ color: "black" }}>{data.updatedAt}</p>
            </div>

            <div className="ordercard-farmer" style={{ flex: "1", textAlign: "right", marginLeft: "20px" }}>
              <p style={{ color: "black", marginBottom: "5px" }}>
                <b>Farmer </b>
              </p>
              <p style={{ color: "black" }}>{data.farmername}</p>
            </div> &nbsp; &nbsp;
            &nbsp;


           
            <div className="ordercard-details ml-5" style={{ flex: "1" }}>
              <div className="product__item__text">
                <h4 style={{ color: "black", marginBottom: "5px" }}>
                  {/* <b>Add rating</b> */}
                </h4>
                <Rating productId={data.newdatas._id} farmerId={data.farmerid} userId={auth._id} subcategory={data.newdatas.subcategory}  farmername ={data.farmername} username={auth.name}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddFeedback />
      <Footer />
    </>
  );
}

export default Order;
