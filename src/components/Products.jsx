import React from "react";
import Productlist from "./Productlist"; 
import 'bootstrap/dist/css/bootstrap.min.css';
export const Products = ({ products, AddTocart }) => {
  return (
    <Productlist products={products} AddTocart={AddTocart} />
  );
};





