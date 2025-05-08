import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Header from "../../Header";
import { url } from "../../../baseUrl";
import axios from "axios";

function FarmerReport() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    getFarmers();
  }, []);

  const getFarmers = async () => {
    try {
      const res = await axios.get(`${url}/getFarmers`);
      // console.log(res.data);
      setFarmers(res.data);
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
            <h2 className="mb-4 text-center">Farmer Report</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Farmer Name</th>
                    <th>Address</th>
                    <th>No. of Cultivations</th>
                    <th>No. of Products</th>
                    <th>Products</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map((farmer, index) => (
                    <tr key={index}>
                      <td>{farmer.name}</td>
                      <td>{farmer.address}</td>
                      <td>{farmer.cultivationDatas?.length || 0}</td>
                      <td>{farmer.productDatas?.length || 0}</td>
                      <td>
                        <table className="table table-sm table-bordered mb-0 nested-table">
                          <thead className="table-light">
                            <tr>
                              {/* <th>Item</th> */}
                              <th>Subcategory</th>
                              <th>Weight</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {farmer.productDatas?.map(
                              (product, productIndex) => (
                                <tr key={productIndex}>
                                  {/* <td>{product.item}</td> */}
                                  <td>{product.subcategory}</td>
                                  <td>{product.weight}</td>
                                  <td>{product.price}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
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

export default FarmerReport;
