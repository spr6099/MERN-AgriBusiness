import React, { useState } from "react";
import { url } from "../../../baseUrl";

function AgriProductCard({
  id,
  name,
  category,
  price,
  image,
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
  return (
    <div>
      <div class="card" style={{ width: "18rem" }}>
        <img
          src={`${url}/${image}`}
          className="card-img-top "
          style={{ height: "150px", width: "290px" }}
          alt="..."
        />
        <div class="card-body ">
          <h5 class="card-title text-primary">{name}</h5>
          <p class="card-text d-flex">
            <p>Category</p>:<p>{category}</p>
          </p>
          <p class="card-text d-flex">
            <p>Price</p>:<p>{price}</p>
          </p>
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

export default AgriProductCard;
