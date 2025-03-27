import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Components/Header';
import Footer from '../Components/Footer';



function Addcomplaints() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

    const validateForm = () => {
        let formErrors = {};
        if (!title) formErrors.title = "Subject is required";
        if (!description) formErrors.description = "Description is required";
        if (!contact) formErrors.contact = "Contact information is required";
        return formErrors;
    };

    const AddComplaints = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        let params = {
            title: title,
            description: description,
            contact: contact,
            userid: auth._id,
            username: auth.name,
            status: 0
        };

        fetch('http://localhost:5000/addcomplaints', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.error) {
                    setErrors({ general: result.error });
                } else {
                    setSuccessMessage('Complaint added successfully!');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000); // Redirect after 2 seconds
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrors({ general: 'An error occurred while adding the complaint.' });
            });
    };

    const [complaint, setComplaint] = useState([]);

    useEffect(() => {
        const userid = auth._id;
        fetch('http://localhost:5000/userComplaint', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid: userid })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setComplaint(result || []);
            })
            .catch(error => console.error('Error fetching:', error));
    }, [auth]);

    return (
        <>
            <Header />
            <div className="container-fluid pt-4 px-4">
                <div className="col-sm-12 col-xl-12">
                    <div className="rounded h-100 p-4" style={{ width: "700px", marginLeft: "200px" }}>
                        <h3 className="mb-5">Add Complaints</h3>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <div>
                            <div className="row mb-3">
                                <label htmlFor="title" className="col-sm-2 col-form-label" style={{ color: 'black' }}>Subject</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="title"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="description" className="col-sm-2 col-form-label" style={{ color: 'black' }}>Description</label>
                                <div className="col-sm-10">
                                    <textarea
                                        name="description"
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="contact" className="col-sm-2 col-form-label" style={{ color: 'black' }}>Contact Information</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="contact"
                                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                </div>
                            </div>

                            <button type="button" onClick={AddComplaints} className="btn btn-primary" style={{ marginLeft: "200px" }}>Submit</button>
                            {errors.general && <div className="alert alert-danger mt-3">{errors.general}</div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-white rounded h-100 p-4" style={{ marginLeft: "200px" }}>
                            <h3 className="mb-4" style={{ marginLeft: "200px" }}>Complaint Details</h3>
                            <table className="table" style={{ color: "black" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">SI.NO</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Phone no</th>
                                        {/* <th scope="col">Status</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {complaint.map((data, index) => (
                                        <tr key={data._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{data.title}</td>
                                            <td>{data.description}</td>
                                            <td>{data.contact}</td>
                                            {/* <td>
                                                {data.status === 0
                                                    ? "Complaint with Admin"
                                                    : `Complaint sent to Police on: ${new Date(data.updatedAt).toLocaleDateString()}`}
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Addcomplaints;
