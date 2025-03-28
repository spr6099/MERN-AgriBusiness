import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { url } from "../../baseUrl";

function TechSupport() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [data, setdata] = useState([]);

  useEffect(() => {
    getTechSupport();
  }, []);

  const getTechSupport = async () => {
    try {
      const response = await fetch(`${url}/getTechSupport`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setdata(result.datas);
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
                Tech Support
              </h2>
            </div>
            <div className="product-grid">
              {data.map((item, index) => (
                <div class="card" style={{ width: "18rem" }}>
                  <div class="card-body ">
                    <h5 class="card-title text-primary">{item.name}</h5>
                    <p class="card-text d-flex"></p>
                    <div
                      style={{ height: "150px", width: "260px" }}
                      className="border border-1"
                    >
                      {item.file?.endsWith(".mp4") ? (
                        <video
                          src={`${url}/${item.file}`}
                          className="card-img-top"
                          style={{ height: "150px" }}
                          controls
                          autoPlay={false}
                          muted
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : item.file?.endsWith(".jpg") ||
                        item.file?.endsWith(".jpeg") ? (
                        <img
                          src={`${url}/${item.file}`}
                          className="card-img-top"
                          style={{ height: "150px", width: "290px" }}
                          alt="..."
                        />
                      ) : (
                        <p>No file found</p>
                      )}
                    </div>
                    <p>Description</p>
                    <div
                      style={{
                        height: "150px",
                        width: "260px",
                        overflow: "auto",
                        wordWrap: "break-word",
                        padding: "8px",
                      }}
                      className="border border-1 scrollable"
                    >
                      {" "}
                      {item.description}
                    </div>
                    <div>
                      <button className="btn  btn-primary">contact.</button>
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

export default TechSupport;
