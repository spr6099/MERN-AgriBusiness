import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

function EditProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description2, setDescription2] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [picture, setPicture] = useState(null);
  const [oldImg, setOldImg] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const productId = { id: location.state.id };
    fetch('http://localhost:5000/findproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productId)
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.categoryresult);
        setCategoryId(result.productresult.item);
        setSubcategory(result.productresult.subcategory);
        setWeight(result.productresult.weight);
        setPrice(result.productresult.price);
        setDescription2(result.productresult.description2);
        setOldImg(result.productresult.picture);
        const category = result.categoryresult.find(cat => cat._id === result.productresult.item);
        if (category) {
          setCategoryName(category.category);
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [location.state.id]);

  const updateProduct = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('id', location.state.id);
    formData.append('description2', description2);
    formData.append('subcategory', subcategory);
    formData.append('weight', weight);
    formData.append('price', price);
    if (picture) {
      formData.append('picture', picture);
    }

    fetch('http://localhost:5000/updateproduct', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "success") {
          setSuccessMessage("Product updated successfully!"); // Set success message
          setTimeout(() => {
            navigate('/viewproducts');
          }, 2000); // Delay navigation to show message
        } else {
          console.error('Error updating product:', result);
        }
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  return (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content p-4">
            <div className="bg-secondary rounded h-100 p-4">
              <h3 className="mb-4">Edit Product</h3>
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              <form method="post" onSubmit={updateProduct}>
                <div className="row mb-3">
                  <label htmlFor="inputCategory" className="col-sm-2 col-form-label">Category</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inputCategory"
                      className="form-control bg-dark"
                      value={categoryName}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputSubcategory" className="col-sm-2 col-form-label">Subcategory</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inputSubcategory"
                      className="form-control"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inputDescription"
                      className="form-control"
                      value={description2}
                      onChange={(e) => setDescription2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputWeight" className="col-sm-2 col-form-label">Total Weight</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inputWeight"
                      className="form-control"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Price for 1Kg</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="inputPrice"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                {oldImg && (
                  <div className="row mb-3">
                    <label className="col-sm-2 col-form-label">Old Image</label>
                    <div className="col-sm-10">
                      <img
                        src={`http://localhost:5000${oldImg}`}
                        alt="Old"
                        style={{ width: '200px', height: '150px' }}
                      />
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <label htmlFor="inputPicture" className="col-sm-2 col-form-label">New Image</label>
                  <div className="col-sm-10">
                    <input
                      type="file"
                      id="inputPicture"
                      className="form-control bg-dark"
                      onChange={(e) => setPicture(e.target.files[0])}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
