import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './SingleProduct.css';
import ReactStars from "react-rating-stars-component";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/singleproduct/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const addCart = () => {
    if (!product) return;

    const productId = product.productResult._id;
    const userId = auth._id;
    const farmerid = product.productResult.farmerid;
    const farmername = product.farmerData.name;
    const customerName = auth.name;
    const params = {
      productid: productId,
      userid: userId,
      farmerid: farmerid,
      farmername:farmername,
      status: 0,
      customerName: customerName
    };

    fetch('http://localhost:5000/addcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add item to cart');
        }
        return res.json();
      })
      .then((result) => {
        setMessage('Item added to cart successfully!');
        setTimeout(() => {
          setMessage('');
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding cart:", error);
        setMessage('Failed to add item to cart.');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
  };

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "50px" }}>
        {message && (
          <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        {product && (
          <div className="product-container">
            <div className="product-image">
              <img className="img-fluid" src={`http://localhost:5000/${product.productResult.picture}`} alt="Product" />
            </div>
            <div className="product-details">
              <div className="details border border-primary p-3">
                <h1 style={{ textAlign: "center" }}>{product.productResult.subcategory}</h1>
                <h4 className="text-danger">Offer Price : ₹ {product.productResult.price}</h4>
                <div className="rating text-warning">
                  <p>
                    <ReactStars
                      count={5}
                      value={4} // This should be the average rating, you can calculate it based on the ratings
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                      onClick={() => navigate(`/viewrating/${id}`)}
                    />
                  </p>
                </div>
                <div>
                  <p style={{ color: "black" }}><b>Farmer:</b> {product.farmerData.name}</p>
                  <p style={{ color: "black" }}><b>Total quantity:</b> {product.productResult.weight}Kg</p>
                  <p style={{ color: "black" }}><b>About the item:</b> {product.productResult.description2}</p>
                  <p style={{ color: "black" }}><b>Our cultivation details:</b> {product.cultivationData.cultivation}</p>
                </div>
                <div className="btn_pro mt-3">
                  <button type="button" onClick={addCart} className="btn btn-primary btn-block mb-4">Add to cart</button>
                  <div style={{ padding: "10px" }}>
                    <img className="imgs" src='/img/banner/p1.jpg' alt="Fruit Banner" />
                    <img className="imgs" src='/img/banner/p2.jpg' alt="Banner Image" />
                    <img className="imgs" src='/img/banner/p3.jpg' alt="Fruit Banner" />
                    <img className="imgs" src='/img/banner/p4.jpg' alt="Cur Banner" />
                    <img className="imgs" src='/img/banner/p5.jpg' alt="Mali Banner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SingleProduct;
