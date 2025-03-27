// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../Components/Footer";
// import Header from "../Components/Header";

// function UserHome() {
//   const [categoryData, setCategoryData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
//   const [sale, setSale] = useState([]);
//   const [farmer, setFarmer] = useState(null); // Change to single object
//   const [topFarmerId, setTopFarmerId] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/viewcategorys')
//       .then((res) => res.json())
//       .then((result) => setCategoryData(result))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   useEffect(() => {
//     fetch('http://localhost:5000/viewproductsdata')
//       .then((res) => res.json())
//       .then((result) => setProductData(result))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   useEffect(() => {
//     fetch('http://localhost:5000/salelist')
//       .then((res) => res.json())
//       .then((result) => {
//         setSale(result);

//         const farmerIdCount = result.reduce((acc, curr) => {
//           acc[curr.farmerid] = (acc[curr.farmerid] || 0) + 1;
//           return acc;
//         }, {});

//         let maxCount = 0;
//         let mostFrequentFarmerId = null;
//         for (const [farmerid, count] of Object.entries(farmerIdCount)) {
//           if (count > maxCount) {
//             maxCount = count;
//             mostFrequentFarmerId = farmerid;
//           }
//         }

//         setTopFarmerId(mostFrequentFarmerId);
//         console.log(topFarmerId);
//       })
//       .catch((error) => console.error("Error fetching sales:", error));
//   }, []);

//   useEffect(() => {
//     if (topFarmerId) {
//       fetch('http://localhost:5000/bestfarmer', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ topFarmerId })
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           console.log(result);
//           setFarmer(result); // Set the single farmer object
//         })
//         .catch((error) => console.error("Error fetching best farmer:", error));
//     }
//   }, [topFarmerId]);

//   return (
//     <>
//       <Header />

    

//       <div className="container-fluid">
//         <div className="container">
//           <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
//             <h6 className="text-danger text-uppercase">Category</h6>
//             <h1 className="display-5">Our Fresh & Organic Products</h1>
//           </div>
//           <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
//             {categoryData.map((data, index) => (
//               <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }} key={index}>
//                 <div className="product-item position-relative bg-white d-flex flex-column text-center">
//                   <img className="img-fluid mt-4 mb-4" src={`http://localhost:5000/${data.img}`} style={{ width: '300px', height: '200px' }} alt={data.category} />
//                   <h5 className="mb-3 text-primary">{data.category}</h5>
//                   <p className="text-dark mb-0 p-1 m-1">{data.description1}</p>
//                   <div className="btn-action d-flex justify-content-center">
//                     <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
//                     <Link to={`/matchproduct/${data._id}`} className="btn bg-secondary py-2 px-3">
//                       <i className="bi bi-eye text-white"></i>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {farmer && (
//         <div className="card border-success mt-5 mb-5">
//           <div className="row g-0">
//             <div className="col-md-3 imgbox">
//               <img 
//                 src={`http://localhost:5000/${farmer.image}`}     
//                 className="img-fluid rounded-start" alt="agriculture" width="100%" style={{height:"400px"}} />
//             </div>
//             <div className="col-md-9 d-flex justify-content-center align-items-center">
//               <div className="card-body">
//                 <h4 className="alert-heading text-success fw-bold">Best Farmer of the Month: &nbsp; {farmer.name}</h4>
//                 <hr />
//                 <p className="mb-0 text-dark fw-bold lead text-justify">
//                   Harvest Hub is the industry, enterprises, and the field of study of value chains in agriculture and in the bio-economy, in which case it is also called bio-business or bio-enterprise. The primary goal of agribusiness is to maximize profit while satisfying the needs of consumers for products related to natural resources such as biotechnology, farms, food, forestry, fisheries, fuel, and fiber.
//                 </p>
//                 {/* {topFarmerId && <p className="text-dark fw-bold lead text-justify">Top Farmer ID: {topFarmerId}</p>} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="container-fluid py-5">
//         <div className="container">
//           <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
//             <h6 className="text-primary text-uppercase">Products</h6>
//             <h1 className="display-5 text-secondary">Our Fresh & Organic Products</h1>
//           </div>
//           <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
//             {productData.map((data, index) => (
//               <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }} key={index}>
//                 <div className="product-item position-relative bg-white d-flex flex-column text-center">
//                   <img className="img-fluid mt-4 mb-4" src={`http://localhost:5000/${data.picture}`} style={{ width: '300px', height: '200px' }} alt={data.subcategory} />
//                   <h5 className="mb-3 text-primary">{data.subcategory}</h5>
//                   <p className="text-dark mb-0 p-1">{data.description2}</p>
//                   <div className="btn-action d-flex justify-content-center">
//                     <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
//                     <Link to={`/singleproduct/${data._id}`} className="btn bg-secondary py-2 px-3">
//                       <i className="bi bi-eye text-white"></i>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default UserHome;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function UserHome() {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [sale, setSale] = useState([]);
  const [farmer, setFarmer] = useState(null); // Change to single object
  const [topFarmerId, setTopFarmerId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/viewcategorys')
      .then((res) => res.json())
      .then((result) => setCategoryData(result))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/viewproductsdata')
      .then((res) => res.json())
      .then((result) => setProductData(result))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/salelist')
      .then((res) => res.json())
      .then((result) => {
        setSale(result);

        const farmerIdCount = result.reduce((acc, curr) => {
          acc[curr.farmerid] = (acc[curr.farmerid] || 0) + 1;
          return acc;
        }, {});

        let maxCount = 0;
        let mostFrequentFarmerId = null;
        for (const [farmerid, count] of Object.entries(farmerIdCount)) {
          if (count > maxCount) {
            maxCount = count;
            mostFrequentFarmerId = farmerid;
          }
        }

        setTopFarmerId(mostFrequentFarmerId);
      })
      .catch((error) => console.error("Error fetching sales:", error));
  }, []);

  useEffect(() => {
    if (topFarmerId) {
      fetch('http://localhost:5000/bestfarmer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topFarmerId })
      })
        .then((res) => res.json())
        .then((result) => {
          setFarmer(result); // Set the single farmer object
        })
        .catch((error) => console.error("Error fetching best farmer:", error));
    }
  }, [topFarmerId]);

  return (
    <>
      <Header />

      <style>
        {`
          .category-description {
            white-space: normal; /* Ensure text wraps */
            word-wrap: break-word; /* Break long words if necessary */
            overflow: hidden; /* Hide overflow */
          }

          .product-description {
            white-space: normal; /* Ensure text wraps */
            word-wrap: break-word; /* Break long words if necessary */
            overflow: hidden; /* Hide overflow */
          }
        `}
      </style>

      <div className="container-fluid">
        <div className="container">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
            <h6 className="text-danger text-uppercase">Category</h6>
            <h1 className="display-5">Our Fresh & Organic Products</h1>
          </div>
          <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {categoryData.map((data, index) => (
              <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }} key={index}>
                <div className="product-item position-relative bg-white d-flex flex-column text-center">
                  <img className="img-fluid mt-4 mb-4" src={`http://localhost:5000/${data.img}`} style={{ width: '300px', height: '200px' }} alt={data.category} />
                  <h5 className="mb-3 text-primary">{data.category}</h5>
                  <p className="text-dark mb-0 p-1 m-1 category-description">{data.description1}</p>
                  <div className="btn-action d-flex justify-content-center">
                    <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                    <Link to={`/matchproduct/${data._id}`} className="btn bg-secondary py-2 px-3">
                      <i className="bi bi-eye text-white"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {farmer && (
        <div className="card border-success mt-5 mb-5">
          <div className="row g-0">
            <div className="col-md-3 imgbox">
              <img 
                src={`http://localhost:5000/${farmer.image}`}     
                className="img-fluid rounded-start" alt="agriculture" width="100%" style={{height:"400px"}} />
            </div>
            <div className="col-md-9 d-flex justify-content-center align-items-center">
              <div className="card-body">
                <h4 className="alert-heading text-success fw-bold">Best Farmer of the Month: &nbsp; {farmer.name}</h4>
                <hr />
                <p className="mb-0 text-dark fw-bold lead text-justify">
                  Harvest Hub is the industry, enterprises, and the field of study of value chains in agriculture and in the bio-economy, in which case it is also called bio-business or bio-enterprise. The primary goal of agribusiness is to maximize profit while satisfying the needs of consumers for products related to natural resources such as biotechnology, farms, food, forestry, fisheries, fuel, and fiber.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
            <h6 className="text-primary text-uppercase">Products</h6>
            <h1 className="display-5 text-secondary">Our Fresh & Organic Products</h1>
          </div>
          <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {productData.map((data, index) => (
              <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }} key={index}>
                <div className="product-item position-relative bg-white d-flex flex-column text-center">
                  <img className="img-fluid mt-4 mb-4" src={`http://localhost:5000/${data.picture}`} style={{ width: '300px', height: '200px' }} alt={data.subcategory} />
                  <h5 className="mb-3 text-primary">{data.subcategory}</h5>
                  <p className="text-dark mb-0 p-1 product-description">{data.description2}</p>
                  <div className="btn-action d-flex justify-content-center">
                    <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                    <Link to={`/singleproduct/${data._id}`} className="btn bg-secondary py-2 px-3">
                      <i className="bi bi-eye text-white"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserHome;