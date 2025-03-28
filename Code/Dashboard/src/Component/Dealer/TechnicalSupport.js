import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { url } from "../../baseUrl";
import TechCard from "./components/TechCard";
import axios from "axios";

function TechnicalSupport() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [isEditing, setisEditing] = useState(false);
  const [data, setdata] = useState({});
  const [file, setfile] = useState(null);
  const [tech, setTech] = useState([]);
  const userid = auth?._id;

  useEffect(() => {
    getTechData();
  }, []);

  const getTechData = async () => {
    try {
      const response = await fetch(`${url}/getTechnicalData/${userid}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setTech(result.datas);
      // console.log("Product get successfully", result);
    } catch (error) {
      console.error("Error in get product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing page

    const formData = new FormData();
    formData.append("userId", userid);
    formData.append("name", data.name || "");
    formData.append("description", data.description || "");
    formData.append("file", file);

    try {
      const response = await fetch(`${url}/addTechnicalData`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Product added successfully", result);
      setdata({});
      getTechData();
      setShowModal(false); // Close modal after successful upload
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteTech = (id) => {
    if (window.confirm("Are you sure you want to delete the Dealer?")) {
      let params = {
        id: id,
      };
      fetch(`${url}/deletTechDatas`, {
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
            getTechData();
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
      const response = await axios.post(`${url}/findTechDatas`, { id });

      if (response.data.success) {
        console.log("Product found:", response.data.product);

        // Populate form with fetched data
        setdata(response.data.data);

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
    formData.append("id", data?._id);
    formData.append("name", data?.name);
    formData.append("description", data?.description);

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(`${url}/editTechData`, {
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
      getTechData();
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
                      <h5 className="modal-title text-primary">Add Classes</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Topic</label>
                          <input
                            type="text"
                            name="name"
                            value={data.name || ""}
                            className="form-control border-secondary"
                            onChange={handleChange}
                            placeholder="Topic Name"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            type="text"
                            name="description"
                            value={data.description}
                            className="form-control border-secondary"
                            onChange={handleChange}
                            placeholder=" Description"
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label"> Video or Image</label>

                          {/* {isEditing && data.file == "mp4" ? (
                            (
                              <div className="m-2">
                                <video
                                  src={`${url}/${data?.file}`}
                                  className="card-img-top"
                                  style={{ height: "150px" }}
                                  controls // Adds play/pause buttons
                                  autoPlay={false} // Set true to autoplay
                                  muted // Set true to mute by default
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) &&
                            data.file ==
                              "jpg"(
                                <div className="m-2">
                                  <img
                                    src={`${url}/${data?.file}`}
                                    alt="Product"
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                </div>
                              )
                          ) : (
                            <div className="m-2">
                              <p>no file found</p>
                            </div>
                          )} */}
                          {isEditing ? (
                            data.file?.endsWith(".mp4") ? (
                              <div className="m-2">
                                <video
                                  src={`${url}/${data?.file}`}
                                  className="card-img-top"
                                  style={{ height: "150px" }}
                                  controls
                                  autoPlay={false}
                                  muted
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) : data.file?.endsWith(".jpg") ||
                              data.file?.endsWith(".png") ||
                              data.file?.endsWith(".jpeg") ? (
                              <div className="m-2">
                                <img
                                  src={`${url}/${data?.file}`}
                                  alt="Product"
                                  style={{ width: "100px", height: "100px" }}
                                />
                              </div>
                            ) : (
                              <div className="m-2">
                                <p>No file found</p>
                              </div>
                            )
                          ) : (
                            <div className="m-2">
                              <p>No file found</p>
                            </div>
                          )}

                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setfile(e.target.files[0])}
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
              {tech && tech.length > 0 ? (
                tech.map((item, index) => (
                  <TechCard
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    file={item.file}
                    productDelete={deleteTech}
                    productEdit={editProduct}
                    setShowModal={setShowModal}
                  />
                ))
              ) : (
                <p>pls add data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TechnicalSupport;
