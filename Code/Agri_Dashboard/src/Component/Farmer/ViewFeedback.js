import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";


function ViewFeedback() {
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));

  useEffect(() => {
    let farmerid = auth._id;
    fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ farmerid: farmerid })
    })
      .then((res) => res.json())
      .then((result) => {
        setFeedback(result);
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
                <h3 className="mb-5 text-uppercase text-center">Feedback From User</h3>
               
          {feedback.map((data) => (
            <div key={data._id} className="containers d-flex justify-content-center mb-4" style={{width:"700px"}}>
              <div className="card mt-5" style={{ width: '80%', border: '1px solid ', borderRadius: '10px', boxShadow: '1px 4px 15px rgba(0, 0, 0, 0.8)', backgroundColor: 'black' }}>
                <div className="d-flex flex-row p-3 ">
                  <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30" alt="User" />
                  <div className="chat ml-2 p-3"><span className="text-muted dot mt-5"></span>{data.email}</div>
                <div className="form-group px-3">
                </div>
                <div className="chat ml-2 p-2"><p className="text-muted dot"></p>Subject:{data.title}

                  <textarea
                    className="form-control"
                    rows="7"
                    value={`${data.description}`}
                    readOnly
                    style={{border: '3px solid ', borderRadius: '10px', resize: 'none', backgroundColor: 'black' }}
                  ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      
    </>
  );
}

export default ViewFeedback;
