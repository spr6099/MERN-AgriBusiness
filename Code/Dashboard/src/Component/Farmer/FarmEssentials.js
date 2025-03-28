import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { url } from "../../baseUrl";

function FarmEssentials() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  const [tools, setTools] = useState([]);

  useEffect(() => {
    getFarmEssentials();
  }, []);

  const getFarmEssentials = async () => {
    try {
      const response = await fetch(`${url}/getFarmEssentials`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTools(result.products);
      // console.log("Product get successfully", result);
    } catch (error) {
      console.error("Error in get product:", error);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content p-4">
            <div
              className="ordercards-container"
              style={{
                margin: "10px 10px",
                padding: "20px",
                border: "thin solid gray",
                // width: "1200px",
              }}
            >
              <h2 style={{ margin: "20px 20px 20px 100px" }}>
                Farm Essentials
              </h2>
            </div>
            <div className="product-grid">
                {tools.map((item, index) => (
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                        src={`${url}/${item.image}`}
                      className="card-img-top "
                      style={{ height: "150px", width: "290px" }}
                      alt="..."
                    />
                    <div class="card-body ">
                      <h5 class="card-title text-primary">{item.name}</h5>
                      <p class="card-text d-flex">
                        <p>Category</p>:<p>{item.category}</p>
                      </p>
                      <p class="card-text d-flex">
                        <p>Price</p>:<p>{item.price}</p>
                      </p>
                      <div>
                        <button className="btn btn-secondary me-2">Contact</button>
                      </div>
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

export default FarmEssentials;
