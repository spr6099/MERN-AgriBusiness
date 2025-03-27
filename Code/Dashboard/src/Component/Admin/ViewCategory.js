import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
export default function ViewCategory() {
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

  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {

      let params = { id: id };

      fetch('http://localhost:5000/deletecategory', {
          method: 'post',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
      })
      .then((res) => res.json())
      .then(() => {
          // Refresh the category data
          setCategoryData(categoryData.filter(category => category._id !== id));
      })
      .catch((error) => {
          console.error("Error deleting category:", error);
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
        <h3 className="mb-5 text-uppercase text-center">Category List</h3>
                    <div className="text-end mb-3">
                        <Link to='/addcategory'>
                            <button className="btn btn-warning" type="submit">Add Category</button>
                        </Link>
                    </div>
                    <table class="table table-striped">
                    <thead>
                            <tr>
                                <th scope="col">Sl. No</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData.map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td >{data.category}</td>
                                    <td style={{width:"500px", paddingRight:"20px"}}>{data.description1}</td>
                                    <td >
                                        <img src={`http://localhost:5000/${data.img}`} alt={data.category} style={{ width: '100px', height: '100px' }} />
                                        </td>
                                    <td >
                                        <Link to='/editcategory' state={{ id: data._id }}>
                                            <button className="btn btn-success me-1" type="button">Edit</button>
                                        </Link>
                                    </td>
                                    <td className="col-2">
                                        <button className="btn btn-danger" onClick={() => deleteCategory(data._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

          </div>
          </div>
          </div>

</>  )
}
