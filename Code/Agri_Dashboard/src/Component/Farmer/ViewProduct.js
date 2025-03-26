import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

function ViewProducts() {
    const [productData, setProductData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('userdata')));

    useEffect(() => {
        if (!auth || !auth._id) {
            console.error("Auth data or farmer ID is missing");
            return;
        }

        let farmerid = auth._id;

        fetch('http://localhost:5000/viewproduct', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ farmerid: farmerid })
        })
        .then((res) => res.json())
        .then((result) => {
            setProductData(result);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
    }, [auth]);

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            let params = { id: id };

            fetch('http://localhost:5000/deleteProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            .then((res) => res.json())
            .then((result) => {
                setSuccessMessage('Product deleted successfully!');
                // Fetch the updated product list after deletion
                return fetch('http://localhost:5000/viewproduct', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ farmerid: auth._id })
                });
            })
            .then((res) => res.json())
            .then((result) => {
                setProductData(result);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
        }
    }

    if (!auth || !auth._id) {
        return <div>Authentication data is missing. Please log in.</div>;
    }

    return (
        <>
            <div className="container-fluid d-flex p-0">
                <Sidebar />
                <div className="flex-grow-1">
                    <Header />
                    <div className="content p-4">
                        {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
                        <h3 className="mb-5 text-uppercase text-center">Product List</h3>
                        <div className="text-end mb-3">
                            <Link to='/addproduct'>
                                <button className="btn btn-warning" type="button">Add Product</button>
                            </Link>
                        </div>
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
                                        <td>{productdt.newdatas.category}</td>
                                        <td>{productdt.subcategory}</td>
                                        <td style={{ width: "300px", paddingRight: "20px" }}>{productdt.description2}</td>
                                        <td>{productdt.weight}</td>
                                        <td>{productdt.price}</td>
                                        <td className="col-2">
                                            <img src={`http://localhost:5000/${productdt.picture}`} alt="" style={{ width: '100px', height: "100px" }} />
                                        </td>
                                        <td style={{ width: "200px" }}>
                                            <Link to='/editproduct' state={{ id: productdt._id }}>
                                                <button className="btn btn-success me-1" type="button">Update</button>
                                            </Link> &nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={() => deleteProduct(productdt._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewProducts;
