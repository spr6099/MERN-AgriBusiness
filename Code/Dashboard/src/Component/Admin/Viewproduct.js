import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function Viewproduct() {

    const [productData, setProductData] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('userdata')));
    
    useEffect(() => {
        fetch('http://localhost:5000/viewproducts')
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            setProductData(result);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
    }, [auth]);

    const updateProductStatus = (productId, status) => {
        if (window.confirm('Are you sure you want to approve/reject this product?')) {

        fetch('http://localhost:5000/updateproductstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, status })
        })
        .then(res => res.json())
        .then(result => {
            setProductData(prevData => 
                prevData.map(product => 
                    product._id === productId ? { ...product, status } : product
                )
            );
        })
        .catch(error => {
            console.error("Error updating product status:", error);
        });
        }
    }

  return (
    <div className="container-fluid d-flex p-0">
    <Sidebar />
    <div className="flex-grow-1">
      <Header />
      <div className="content p-4">
    <h3 className="mb-3 text-uppercase text-center">Product List</h3>
   
    <table className="table table-striped table-sm">
        <thead>
            <tr style={{ height: "100px", paddingBottom: "50px" }}>
                <th scope="col">Sl. No</th>
                <th scope="col">Item</th>
                <th scope="col">Subcategory</th>
                <th scope="col">Description</th>
                <th scope="col">Weight</th>
                <th scope="col">Price</th>
                <th scope="col">Picture</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {productData.map((productdt, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{productdt.categoryDetails.category}</td>
                    <td>{productdt.subcategory}</td>
                    <td style={{ width: "300px", paddingRight: "20px" }}>{productdt.description2}</td>
                    <td>{productdt.weight}</td>
                    <td>{productdt.price}</td>
                    <td className="col-2"><img src={`http://localhost:5000/${productdt.picture}`} alt="" style={{ width: '100px', height: "100px" }} /></td>
                    <td style={{ width: "200px" }}>
                        {productdt.status === 1 ? (
                            <span>Approved</span>
                        ) : productdt.status === 2 ? (
                            <span>Rejected</span>
                        ) : (
                            <>
                                <button className="btn btn-success" onClick={() => updateProductStatus(productdt._id, 1)}>Approve</button>
                                <button className="btn btn-danger" onClick={() => updateProductStatus(productdt._id, 2)}>Reject</button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </div>
    </div>
    
  )
}
