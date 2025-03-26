import React,{useState,useEffect} from 'react';
import './Product.css'
export default function New() {
  const [categoryData, setCategoryData] = useState([]);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  console.log(auth);

  useEffect(() => {
    fetch('http://localhost:5000/viewcategorys')
      .then((res) => res.json())
      .then((result) => {
        setCategoryData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center mb-5" style={{ maxWidth: '500px' }}>
            <h6 className="text-primary text-uppercase">Products</h6>
            <h1 className="display-5">Our Fresh & Organic Products</h1>
          </div>

          <div className="product-carousel px-5" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {categoryData.map((data, index) => (

            <div className="pb-5" style={{ display: 'inline-block', width: 'calc(100% / 4 - 30px)', marginRight: '30px' }}>
              <div className="product-item position-relative bg-white d-flex flex-column text-center">
                {/* <img className="img-fluid mb-4" src="img/product-1.png" alt=""/> */}
                <img className="img-fluid mb-4" src={`http://localhost:5000/${data.img}`} alt={data.category} style={{ width: '350px', height: '220px' }} />
                <h6 className="mb-3 text-primary">Organic {data.category}</h6>
                <p className="text-dark mb-0"> 
                {data.description1}
                </p>
                <div className="btn-action d-flex justify-content-center">
                  <a className="btn bg-primary py-2 px-3" href="#"><i className="bi bi-cart text-white"></i></a>
                  <a className="btn bg-secondary py-2 px-3" href="#"><i className="bi bi-eye text-white"></i></a>
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