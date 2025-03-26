import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
function UpdateCultivation() {
    const [selectedSubcategory, setSelectedSubcategory] = useState([]);
    const [cultivation, setCultivation] = useState('');
    const [subcategoryId, setsubCategoryId] = useState('')
    const [subcategoryName,setSubcategoryName] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;

    useEffect(() => {
        fetch(`http://localhost:5000/getCultivation/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                // Assuming result.productresult.subcategory now contains the subcategory name
                setCultivation(result.cultivationresult.cultivation);
                setSelectedSubcategory(result.productresult); // Update here
                setsubCategoryId(result.productresult.subcategory);
                const subcategory = result.productresult.find(cat => cat._id === result.cultivationresult.subcategory);
                if (subcategory) {
                    setSubcategoryName(subcategory.subcategory);
                }
            })

    
        .catch(error => {
            setError(error.message);
            console.error("Error fetching cultivation details:", error);
        });
}, [id]);

const updateCultivation = (e) => {
    e.preventDefault();
    let params = {
        id: id,
        cultivation: cultivation
    };
    fetch('http://localhost:5000/updateCultivation', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then((res) => res.json())
        .then((result) => {
            if (result.status === "success") {
                navigate('/viewcultivation');
            } else {
                setError(result.message);
                console.error("Error updating cultivation:", result.message);
            }
        })
        .catch((error) => {
            setError(error.message);
            console.error("Error updating cultivation:", error);
        });
};

return (
    <>
<div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
                <form onSubmit={updateCultivation} style={{ marginLeft: '500px', marginTop: '70px', width: '500px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <h3>Edit Cultivation Details</h3>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="form-outline mb-4">
                        <input type="text" name="subcategory" id="subcategorySelect" className="form-control" value={subcategoryName} disabled />
                        <label className="form-label" htmlFor="subcategorySelect">Subcategory</label>
                    </div>
                    <div className="form-outline mb-4">
                        <textarea name='cultivation' id="cultivation" className="form-control" value={cultivation} onChange={(e) => setCultivation(e.target.value)} />
                        <label className="form-label" htmlFor="cultivation">Cultivation</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Update</button>
                </form>
</div>
        </div>
        </div>
        
    </>
);
}

export default UpdateCultivation;
