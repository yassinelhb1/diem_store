import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Individualproduct = ({ individualProduct, AddTocart }) => {
  const handleAddTocart = () => {
    AddTocart(individualProduct);
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <img
        className="card-img-top"
        style={{ height: '250px', objectFit: 'cover' }}
        src={individualProduct?.url}
        alt="product-images"
      />
      <div className="card-body">
        <div className="card-text description">{individualProduct?.description}</div>
        <h5 className="card-title title">{individualProduct?.title}</h5>
        <p className="card-text price">{individualProduct?.price} DT</p>
        <button className="btn btn-danger btn-md" onClick={handleAddTocart}>
          Add To CART
        </button>
      </div>
    </div>
  );
};