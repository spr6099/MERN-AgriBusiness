import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

function AddCultivation() {
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [cultivation, setCultivation] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');  // Success message state

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
                console.log(result);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        let farmerid = auth._id;
        fetch('http://localhost:5000/viewproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ farmerid: farmerid })
        })
            .then((res) => res.json())
            .then((result) => {
                setProductData(result);
                console.log(result);
            })
            .catch((error) => {
                console.error("Error fetching product data:", error);
            });
    }, []);

    const addCultivation = (e) => {
        e.preventDefault();
        let farmerid = auth._id;
        let params = {
            item: selectedItem,
            subcategory: selectedSubcategory,
            cultivation: cultivation,
            farmerid: farmerid
        };
        fetch('http://localhost:5000/addcultivation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setSuccessMessage('Cultivation details added successfully!');
                setTimeout(() => {
                    navigate('/viewcultivation');
                  }, 2000);
            })
            .catch((error) => {
                console.error("Error adding cultivation:", error);
            });
    };

    return (
        <>
            <div className="container-fluid d-flex p-0">
                <Sidebar />
                <div className="flex-grow-1">
                    <Header />
                    <div className="content p-4">
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-secondary rounded h-100 p-4">
                                <h3 style={{ textAlign: 'center' }}>Add cultivation</h3>
                                <form onSubmit={addCultivation}>

                                    {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message */}
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="itemSelect">Item</label>
                                        <select id="itemSelect" className="form-control  bg-dark" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                                            <option value="">Select Item</option>
                                            {categoryData.map((data, index) => (
                                                <option key={index} value={data._id}>{data.category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="subcategorySelect">Subcategory</label>
                                        <select id="subcategorySelect" className="form-control  bg-dark" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                                            <option value="">Select Subcategory</option>
                                            {productData.map((product, index) => (
                                                <option key={index} value={product._id}>{product.subcategory}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="cultivation">Cultivation</label>
                                        <textarea name='cultivation' id="cultivation" className="form-control" value={cultivation} onChange={(e) => setCultivation(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddCultivation;
