import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import axios from "axios";
import { url } from "../../../baseUrl";

function DealerReport() {
  const [dealers, setdealers] = useState([]);

  useEffect(() => {
    getDealers();
  }, []);

  const getDealers = async () => {
    try {
      const res = await axios.get(`${url}/getDealers`);
      // console.log(res.data);
      setdealers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dealers);

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="container mt-5">
            <h2 className="mb-4 text-center">Dealer Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Dealer Name</th>
                    <th>Address</th>
                    <th>Tech Datas</th>
                    <th>Equipments</th>
                  </tr>
                </thead>
                <tbody>
                  {dealers.map((dealer, index) => (
                    <tr key={index}>
                      <td>{dealer.name}</td>
                      <td>{dealer.name}</td>
                      <td>
                        <table className="table table-sm table-bordered mb-0 nested-table">
                          <thead className="table-light">
                            <tr>
                              <th>Topic</th>
                              <th>Details</th>
                              <th>File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dealer.techData.map((tech, techIndex) => {
                              const file = tech.file; // assuming file path is in tech.file
                              const fileExtension = file
                                .match(/\.\w+$/)?.[0]
                                .substring(1);

                              return (
                                <tr key={techIndex}>
                                  <td>{tech.name}</td>
                                  <td>{tech.description}</td>
                                  <td>
                                    <div
                                      style={{
                                        height: "100px",
                                        width: "200px",
                                      }}
                                      className="border border-1"
                                    >
                                      {fileExtension === "mp4" ? (
                                        <video
                                          src={`${url}/${file}`}
                                          className="card-img-top"
                                          style={{
                                            height: "100px",
                                            width: "80%",
                                          }}
                                          controls
                                          muted
                                        >
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      ) : (
                                        <img
                                          src={`${url}/${file}`}
                                          className="card-img-top"
                                          style={{
                                            height: "100px",
                                            width: "80%",
                                            objectFit: "cover",
                                          }}
                                          alt="tech media"
                                        />
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <table className="table table-sm table-bordered mb-0 nested-table">
                          <thead className="table-light">
                            <tr>
                              <th>Name</th>
                              <th>Category</th>
                              <th>Image</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dealer.agriProducts.map((item, itemIndex) => (
                              <tr key={itemIndex}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>
                                  {" "}
                                  <img
                                    src={`${url}/${item.image}`}
                                    className="card-img-top "
                                    style={{ height: "50px", width: "80px" }}
                                    alt="..."
                                  />
                                </td>
                                <td>{item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      {/* <td>{bank.loansProvided}</td>
                      <td>{bank.loansRepaid}</td> */}
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

export default DealerReport;
