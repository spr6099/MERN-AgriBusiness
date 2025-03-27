import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
export default function AddCategory() {
    const [category, setCategory] = useState('');
    const [description1, setDescription1] = useState('');
    const [img, setImg] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

    const addProduct = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!category || !description1 || !img) {
            setError('All fields are required.');
            return;
        }

        let formData = new FormData();
        formData.append('category', category);
        formData.append('description1', description1);
        formData.append('img', img);
        formData.append('farmerid', auth._id);

        fetch('http://localhost:5000/addcategory', {
            method: 'post',
            body: formData
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result); // Check what is being logged here
            if (result === "success") {
                alert('Category added successfully.');
                setCategory('');
                setDescription1('');
                setImg(null);
                navigate('/viewcategory');
            } else {
                setError('Failed to add category. Please try again.');
            }
        })
        .catch((error) => {
            console.error("Error adding product:", error);
            setError('Failed to add category. Please try again.');
        });
        
    };

    return (
        <>
            <div className="container-fluid d-flex p-0">
                <Sidebar />
                <div className="flex-grow-1">
                    <Header />
                    <div className="content p-4">
                        <div class="col-sm-12 col-xl-12">
                            <div class="bg-secondary rounded h-100 p-4">
                                <h3 style={{ textAlign: 'center' }}>Add Category</h3>
                                <form onSubmit={addProduct}>
                                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                                    {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                                    <div class="mb-3">
                                        <input type="text" name='category' id="categoryInput" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                                        <label className="form-label" htmlFor="categoryInput">Category</label>
                                       
                                    </div>
                                    <div class="mb-3">
                                        <textarea name='description1' id="descriptionInput" className="form-control" value={description1} onChange={(e) => setDescription1(e.target.value)} />
                                        <label className="form-label" htmlFor="descriptionInput">Description</label>
                                    </div>
                                    <div class="mb-3 form-check">
                                        {/* <input type="checkbox" class="form-check-input" id="exampleCheck1"> */}
                                        <input type="file" name='img' id="imgInput" className="form-control bg-dark" onChange={(e) => setImg(e.target.files[0])} />
                                        <label for="formFile" className="form-label" htmlFor="imgInput">Image</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}
