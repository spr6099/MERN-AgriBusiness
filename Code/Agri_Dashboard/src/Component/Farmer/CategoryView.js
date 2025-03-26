import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
export default function CategoryView() {
  const [categoryData, setCategoryData] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

  useEffect(() => {
      let farmerid = auth._id;
      fetch('http://localhost:5000/viewcategory', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ farmerid: farmerid })
      })
          .then((res) => res.json())
          .then((result) => {
              setCategoryData(result);
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }, [auth._id]);

 

  return (
<>

<div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
        <h3 className="mb-5 text-uppercase text-center">Category List</h3>
                  
                    <table class="table table-striped">
                    <thead>
                            <tr>
                                <th scope="col">Sl. No</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{data.category}</td>
                                    <td style={{width:"500px", paddingRight:"20px"}}>{data.description1}</td>
                                    <td ><img src={`http://localhost:5000/${data.img}`} alt={data.category} style={{ width: '100px', height: '100px' }} /></td>
                                
                                </tr>
                            ))}
                        </tbody>
                    </table>

          </div>
          </div>
          </div>

</>  )
}
