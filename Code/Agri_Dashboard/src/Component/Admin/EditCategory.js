import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
export default function EditCategory() {
  const [category, setCategory] = useState('');
  const [description1, setDescription1] = useState('');
  const [img, setImg] = useState(null);
  const [oldImg, setOldImg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let categoryId = { id: location.state.id };
    fetch('http://localhost:5000/findcategory', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(categoryId)
    })
      .then((res) => res.json())
      .then((result) => {
        setCategory(result.category);
        setDescription1(result.description1);
        setOldImg(result.img);  // Set the old image path
      })
      .catch((error) => console.error('Error fetching category:', error));
  }, [location.state.id]);

  const updateCategory = (e) => {
    e.preventDefault();
    setError('');

    let formData = new FormData();
    formData.append('id', location.state.id);
    formData.append('category', category);
    formData.append('description1', description1);
    if (img) {
      formData.append('img', img);
    }

    fetch('http://localhost:5000/updatecategory', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        navigate('/viewcategory');
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  return (
    <>

      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content p-4">
            <div class="col-sm-12 col-xl-8">
              <div class="bg-secondary rounded h-100 p-4">
                <h3 style={{ textAlign: 'center' }}>Update Category</h3>
                <form onSubmit={updateCategory}>
                  {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                  <div class="row mb-3">
                    <label className="form-label" htmlFor="categoryInput">Category</label>
                    <div class="col-sm-10">
                      <input type="text" name='category' value={category} id="categoryInput" className="form-control" onChange={(e) => setCategory(e.target.value)} />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <label className="form-label" htmlFor="descriptionInput">Description</label>
                    <div class="col-sm-10">
                      <textarea name='description1' value={description1} id="descriptionInput" className="form-control" onChange={(e) => setDescription1(e.target.value)} />
                    </div>
                  </div>
                  {oldImg && (
                    <div className="form-outline mb-4">
                      <img src={`http://localhost:5000${oldImg}`} alt="Old" style={{ width: '220px', height: '250px' }} />
                    </div>
                  )}

                  <div class="row mb-3">
                    <label className="form-label" htmlFor="imgInput">New Image</label>
                    <div class="col-sm-10">
                      <input type="file" name='img' id="imgInput" className="form-control bg-dark" onChange={(e) => setImg(e.target.files[0])} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success btn-block mb-4">Update</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>)
}
