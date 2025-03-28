import React, { useState } from "react";
import { url } from "../../../baseUrl";

function TechCard({
  id,
  name,
  description,
  file,
  productDelete,
  productEdit,
  setShowModal,
}) {
  const deleteProduct = () => {
    productDelete(id);
  };

  const editProduct = () => {
    productEdit(id);
    setShowModal(true);
  };

  const fileExtension = file.match(/\.\w+$/)?.[0].substring(1);

  return (
    <div>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body ">
          <h5 class="card-title text-primary">{name}</h5>
          <p class="card-text d-flex"></p>
          <div
            style={{ height: "150px", width: "260px" }}
            className="border border-1"
          >
            {fileExtension == "mp4" ? (
              <video
                src={`${url}/${file}`}
                className="card-img-top"
                style={{ height: "150px" }}
                controls // Adds play/pause buttons
                autoPlay={false} // Set true to autoplay
                muted // Set true to mute by default
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={`${url}/${file}`}
                className="card-img-top "
                style={{ height: "150px", width: "290px" }}
                alt="..."
              />
            )}
          </div>
          <p>Description</p>
          <div
            style={{
              height: "150px",
              width: "260px",
              overflow: "auto",
              wordWrap: "break-word",
              padding: "8px",
            }}
            className="border border-1 scrollable"
          >
            {" "}
            {description}
          </div>
          <div>
            <button className="btn btn-secondary me-2" onClick={editProduct}>
              Edit
            </button>
            <button className="btn  btn-primary" onClick={deleteProduct}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechCard;
