import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./CategoryProduct.css"; // Import your CSS file here if needed
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MatchProduct() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [product, setProduct] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/matchproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.productresult);
        setCategory(data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const addCart = () => {
    if (!product) return;

    const productId = product.productResult._id;
    const userId = auth._id;
    const farmerid = product.productResult.farmerid;
    const customerName = auth.name;
    const params = {
      productid: productId,
      userid: userId,
      farmerid: farmerid,
      status: 0,
      customerName: customerName,
    };

    fetch("http://localhost:5000/addcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add item to cart");
        }
        return res.json();
      })
      .then((result) => {
        setMessage("Item added to cart successfully!");
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error adding cart:", error);
        setMessage("Failed to add item to cart.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };

  return (
    <>
      <Header />

      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>{category.category}</h2>
              </div>
              <div className="featured__controls">
                {/* Optionally add controls here */}
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {products.map((product, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mix">
                <div className="featured__item">
                  <div
                    className="featured__item__pic"
                    style={{ height: "250px", width: "100%" }}
                  >
                    <img
                      src={`http://localhost:5000/${product.picture}`}
                      alt={product.subcategory}
                      style={{ width: "100%", height: "300px" }}
                    />
                  </div>
                  <div className="featured__item__text">
                    <h6>
                      <Link
                        to={`/singleproduct/${product._id}`}
                        style={{ textTransform: "capitalize" }}
                      >
                        <b className="text-danger">{product.subcategory}</b>
                      </Link>
                    </h6>
                    <h5>₹{product.price}</h5>
                    <p>{product.description2}</p>
                    <div className="btn-action d-flex justify-content-center">
                      <a
                        className="btn bg-primary py-2 px-3"
                        onClick={addCart}
                        href="#"
                      >
                        <i className="bi bi-cart text-white"></i>
                      </a>

                      <Link
                        to={`/singleproduct/${product._id}`}
                        className="btn bg-secondary py-2 px-3"
                      >
                        <i
                          className="bi bi-eye text-white"
                          style={{ textTransform: "capitalize" }}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MatchProduct;
