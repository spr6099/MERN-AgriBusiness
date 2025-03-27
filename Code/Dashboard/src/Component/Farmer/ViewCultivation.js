import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
function ViewCultivation() {
    const [cultivationData, setCultivationData] = useState([]);
    const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('userdata')));

    useEffect(() => {
        if (!auth || !auth._id) {
            console.error("Auth data or farmer ID is missing");
            return;
        }

        let farmerid = auth._id;
        
        fetch('http://localhost:5000/viewcultivation', {
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
            setCultivationData(result);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [auth._id]);

    const deleteCultivation = (id) => {
        if (window.confirm('Are you sure you want to delete this details?')) {

        fetch('http://localhost:5000/deleteCultivation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.status === "success") {
                setCultivationData(cultivationData.filter(cultivation => cultivation._id !== id));
            } else {
                console.error("Error deleting cultivation:", result.message);
            }
        })
        .catch((error) => {
            console.error("Error deleting cultivation:", error);
        });
     } };

    

    return (
        <>
        <div className="container-fluid d-flex p-0">
              <Sidebar />
              <div className="flex-grow-1">
                <Header />
                <div className="content p-4">
                    <h3 className="mb-5 text-uppercase text-center">Cultivation Details</h3>
                    <div className="text-end mb-3">
                        <Link to='/addcultivation'>
                            <button className="btn btn-warning" type="button">Add cultivation</button>
                        </Link>
                    </div>
                    <table className="table table-striped table-sm ml-3">
                        <thead>
                            <tr>
                                <th scope="col">Sl. No</th>
                                <th scope="col">Subcategory</th>
                                <th scope="col">Description</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cultivationData.map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.productDetails.subcategory}</td>
                                    <td style={{ width: "300px", paddingRight: "20px" }}>{data.cultivation}</td>
                                    <td>
                                        <Link to='/updatecultivation' state={{ id: data._id }}>
                                            <button className="btn btn-light me-1" type="button">Edit</button>
                                        </Link> &nbsp;&nbsp;
                                        <button className="btn btn-danger" type="button" onClick={() => deleteCultivation(data._id)}>Delete</button>
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

export default ViewCultivation;
