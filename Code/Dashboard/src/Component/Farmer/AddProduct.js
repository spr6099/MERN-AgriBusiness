import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);
  const [description2, setDescription2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      setCategories(result);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [auth._id]);

  const addProduct = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedCategory || !subcategory || !weight || !price || !picture) {
      setError('All fields are required.');
      return;
    }

    const fileTypes = ['image/jpeg', 'image/png'];
    if (!fileTypes.includes(picture.type)) {
      setError('Picture must be in JPG or PNG format.');
      return;
    }

    let formData = new FormData();
    formData.append('item', selectedCategory);
    formData.append('subcategory', subcategory);
    formData.append('weight', weight);
    formData.append('price', price);
    formData.append('picture', picture);
    formData.append('description2', description2);
    formData.append('farmerid', auth._id);

    fetch('http://localhost:5000/addproduct', {
      method: 'POST',
      body: formData
    })
    .then((res) => res.json())
    .then((result) => {
      setSuccess('Product added successfully!');
      // Navigate to view products page after 1 second
      setTimeout(() => {
        navigate('/viewproducts');
      }, 2000);
    })
    .catch((error) => {
      console.error("Error adding product:", error);
      setError('Failed to add product.');
    });
  };

  return (
    <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
          <div className="col-sm-12 col-xl-8">
            <div className="bg-secondary rounded h-100 p-4">
              <h3 style={{ textAlign: 'center' }}>Add Product</h3>
              <form onSubmit={addProduct}>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                <div className="form-outline mb-4">
                  <select
                    name="item"
                    id="categoryInput"
                    className="form-control bg-dark"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {categories.map((data, index) => (
                      <option key={index} value={data._id}>
                        {data.category}
                      </option>
                    ))}
                  </select>
                  <label className="form-label" htmlFor="categoryInput">Category</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="subcategory"
                    id="subcategoryInput"
                    className="form-control"
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                  <label className="form-label" htmlFor="subcategoryInput">Subcategory</label>
                </div>
                <div className="form-outline mb-4">
                  <textarea
                    name="description2"
                    id="descriptionInput"
                    className="form-control"
                    onChange={(e) => setDescription2(e.target.value)}
                  />
                  <label className="form-label" htmlFor="descriptionInput">Description</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="weight"
                    id="weightInput"
                    className="form-control"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <label className="form-label" htmlFor="weightInput">Total weight/Litre</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="price"
                    id="priceInput"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label className="form-label" htmlFor="priceInput">Price for 1Kg/1L</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="file"
                    name="picture"
                    id="pictureInput"
                    className="form-control bg-dark"
                    onChange={(e) => setPicture(e.target.files[0])}
                  />
                  <label className="form-label" htmlFor="pictureInput">Image</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
