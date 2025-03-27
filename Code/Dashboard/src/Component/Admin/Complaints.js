import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar';
import Header from '../Header';

export default function Complaints() {
    const [compliants, setCompliants] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

    useEffect(() => {
        fetch('http://localhost:5000/viewcompliants') 
          .then(res => res.json())
          .then(result => {
            console.log(result);
            setCompliants(result || []);
          })
          .catch(error => console.error('Error fetching:', error));
    }, []);
  return (
   <>
   <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
   <h3 className="mb-5 text-uppercase text-center"> Complaints from Users</h3>
                    <table className="table table-striped table-sm ">
                        <thead>
                            <tr>
                                <th scope="col">Sl. No</th>
                                <th scope="col">User name</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Description</th>
                                {/* <th scope="col">User Id</th> */}
                                <th></th>
                                <th scope="col">Contact</th>

                            </tr>
                        </thead>
                        <tbody>
                            {compliants.map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.username}</td>
                                    <td>{data.title}</td>
                                    <td>{data.description}</td>
                                    {/* <td>{data.userid}</td> */}
                                    <th></th>
                                    <td>{data.contact}</td>

                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div></div></div>
   </>
  )
}
