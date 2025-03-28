import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { url } from "../../baseUrl";
import AgriProductCard from "./components/AgriProductCard";
import axios from "axios";

function AgriProducts() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isEditing, setisEditing] = useState(false);
  const [products, setproducts] = useState([]);

  const userid = auth?._id;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`${url}/getAgriProduct/${userid}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setproducts(result.products);
      // console.log("Product get successfully", result);
    } catch (error) {
      console.error("Error in get product:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing page

    const formData = new FormData();
    formData.append("userId", userid);
    formData.append("name", data.name || "");
    formData.append("category", data.category || "");
    formData.append("price", data.price || "");
    formData.append("image", file);

    try {
      const response = await fetch(`${url}/addAgriProduct`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product added successfully", result);
      getProduct();
      setShowModal(false); // Close modal after successful upload
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete the Dealer?")) {
      let params = {
        id: id,
      };
      fetch(`${url}/deletDealerProduct`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            getProduct();
          } else {
            console.error("Error deleting:", result.error);
          }
          // if (result.success) {
          //   setproducts(products.filter((product) => product._id !== id));
          // } else {
          //   console.error("Error deleting:", result.error);
          // }
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    }
  };

  const editProduct = async (id) => {
    try {
      const response = await axios.post(`${url}/findDealerProduct`, { id });

      if (response.data.success) {
        console.log("Product found:", response.data.product);

        // Populate form with fetched data
        setData(response.data.product);

        // Open the modal
        setShowModal(true);
        setisEditing(true);
      } else {
        console.warn("Product not found:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching product:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", data._id); // Use `_id`, not `userid`
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);

    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await fetch(`${url}/editAgriProduct`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! Status: ${response.status}`
        );
      }

      console.log("Product updated successfully", result);
      getProduct();
      setShowModal(false);
      setisEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className="container-fluid d-flex p-0">
        <Sidebar />
        <div className="flex-grow-1">
          <Header />
          <div className="content p-4">
            <div className="text-end">
              <button
                className="btn btn-success"
                onClick={() => setShowModal(true)}
              >
                Add +
              </button>
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
              <div
                className="modal fade show d-block "
                tabIndex="-1"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-primary">
                        Add Agri Product
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Product Name</label>
                          <input
                            type="text"
                            name="name"
                            value={data.name || ""}
                            className="form-control border-secondary"
                            onChange={handleChange}
                            placeholder="Product Name"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Product Category</label>
                          <input
                            type="text"
                            name="category"
                            value={data.category || ""}
                            className="form-control border-secondary"
                            onChange={handleChange}
                            placeholder="Product Category"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={data.price || ""}
                            className="form-control border-secondary"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Image</label>
                          {isEditing && data.image && (
                            <div className="m-2">
                              <img
                                src={`${url}/${data.image}`}
                                alt="Product"
                                style={{ width: "100px", height: "100px" }}
                              />
                            </div>
                          )}

                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                          />
                        </div>
                        {isEditing ? (
                          <button
                            type="submit"
                            onClick={handleUpdate}
                            className="btn btn-primary"
                          >
                            update
                          </button>
                        ) : (
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="product-grid">
              {products && products.length > 0 ? (
                products.map((item, index) => (
                  <div className="product-card" key={index}>
                    <AgriProductCard
                      id={item._id}
                      name={item.name}
                      category={item.category}
                      price={item.price}
                      image={item.image}
                      productDelete={deleteProduct}
                      productEdit={editProduct}
                      setShowModal={setShowModal}
                    />
                  </div>
                ))
              ) : (
                <p>Pls add Agricultural inputs </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgriProducts;
