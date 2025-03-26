import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import Header from '../Header';
import Sidebar from '../Sidebar';

function Viewrating() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const [auth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const farmerId = auth._id;

  useEffect(() => {
    fetch("http://localhost:5000/viewrating", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ farmerId: farmerId })
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRatings(result);
      })
      .catch((error) => {
        console.error("Error fetching ratings:", error);
      });
  }, [farmerId]);

  return (
   <>
   <div className="container-fluid d-flex p-0">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="content p-4">
        <h3 className="mb-5 text-uppercase text-center">View ratings</h3>
                  
        <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-12">
              <div className="rounded p-4">
                {/* <h6 className="mb-4 text-white">View ratings</h6> */}
                <table className="table bg-secondary">
                  <thead>
                    <tr className="text-white">
                      <th scope="col" className="text-white">Sl.No</th>
                      <th scope="col" className="text-white">Sub category</th>
                      <th scope="col" className="text-white">Customer Name</th>
                      <th scope="col" className="text-white">Ratings</th>
                      <th scope="col" className="text-white">Date</th>

                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map((rating, index) => (
                      <tr key={rating._id}>
                        <th scope="row" className="text-white">{index + 1}</th>
                        <td className="text-white">{rating.subcategory}</td>
                        <td className="text-white">{rating.username}</td>
                        <td className="text-white">
                          <ReactStars
                            count={5}
                            value={rating.rating}
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </td>
                        <td className="text-white">{rating.createdAt}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
</div></div></div>
   </>
     
  );
}

export default Viewrating;
