import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function FarmerList() {
    const [farmers, setFarmers] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

    useEffect(() => {
        fetch('http://localhost:5000/farmerlist') 
          .then(res => res.json())
          .then(result => {
            console.log(result);
            setFarmers(result || []);
          })
          .catch(error => console.error('Error fetching:', error));
    }, []);

    const deletenewfarmer = (id) => {
        if (window.confirm('Are you sure you want to delete the farmer?')) {

        let params = {
            id: id
        };

        fetch('http://localhost:5000/deleteNewfarmer', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.success) {
                setFarmers(farmers.filter(farmer => farmer._id !== id));
            } else {
                console.error("Error deleting:", result.error);
            }
        })
        .catch((error) => {
            console.error("Error deleting:", error);
        });
    }
    }
    
  return (
<>
<div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
        <h3 className="mb-5 text-uppercase text-center"> Farmer Details</h3>
        <table class="table table-hover">
        <thead>
                            <tr>
                                <th scope="col">Sl. No</th>
                                <th scope="col">Farmer name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Email</th>
                                <th scope="col">Image</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {farmers.map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.register.name}</td>
                                    <td>{data.register.address}</td>
                                    <td>{data.email}</td>
                                    <td>
                                            <img 
                    src={`http://localhost:5000/${data.register.image}`}
                    alt="Farmer" 
                                              style={{ width: '50px', height: '50px' }} 
                                            />
                                        </td>
                                    <td>
                                        <button className="btn btn-danger" type="button" onClick={() => deletenewfarmer(data._id)}>Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

        </div>
        </div></div>
</> 
 )
}
