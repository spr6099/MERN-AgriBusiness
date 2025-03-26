import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";



function AddFeedback() {
    const [title, setTitle] = useState('')
    const [farmers,setFarmers] = useState([])
    const [description, setDescription] = useState('')
    const [farmer, setFarmer] = useState('')
const navigate= useNavigate()

const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userdata")));

useEffect(() => {
    fetch('http://localhost:5000/farmerlist') 
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setFarmers(result || []);
      })
      .catch(error => console.error('Error fetching:', error));
}, []);

    const Addfeedback = () => {
        navigate('/')

        let params = {
            title: title,
            description: description,
            userid:auth._id,
            farmer:farmer,
            email:auth.email

        }

        fetch('http://localhost:5000/addfeedback', {
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
            });
    };

    return (
        <>
         {/* <Header/> */}
          <div className="container-fluid pt-4 px-4" >
          <div className="col-sm-12 col-xl-12">
                        <div className=" rounded h-100 p-4">
                            <h2 className="mb-5" style={{marginLeft:"300px"}}>Add Feedback To Farmers</h2>
                            <div style={{width:"700PX", marginLeft:"300px"}}>
                            <div className="row mb-3" >
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Farmer</label>
                            <div className="col-sm-10">
              <select name='farmer' id="form2Example1" className="form-control" onChange={(e) => setFarmer(e.target.value)}>
                <option value="">Select Farmer</option>
                {farmers.map((data , index) => (
                  <option key={index} value={data._id}>{data.register.name}</option>
                ))}
              </select>
              </div>
              </div>
           
                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Subject</label>
                                    <div className="col-sm-10">
                                        <input type="text" name='title' className="form-control"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label for="inputEmail3" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea name='description' className="form-control"
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>

                                <button type="button" onClick={Addfeedback} className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer/> */}
        </>
    )
}

export default AddFeedback