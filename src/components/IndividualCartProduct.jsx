import React from "react";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import { auth, fs } from "../configuration/config";
import 'bootstrap/dist/css/bootstrap.min.css';


export const IndividualCartProduct = ({ cartProduct, cartProductIncrease,cartProductDecrease }) => {

  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  const handleCartProductDelete=()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fs.collection('Cart' +user.uid).doc(cartProduct.ID).delete().then(()=>{
          console.log("successfully deleted");
        })
      }
    })

  }

  
  return (
    <div className="product mb-3 p-3 border">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img
            style={{ height: '100px', width: '100px' }}
            src={cartProduct.url}
            alt="product-img"
            className="img-fluid"
          />
        </div>
        <div className="col-md-3">
          <h5 className="product-text title">{cartProduct.title}</h5>
          <p className="product-text description">{cartProduct.description}</p>
          <p className="product-text price">DT {cartProduct.price}</p>
        </div>
        <div className="col-md-3">
          <span>Quantity</span>
          <div className="product-text quantity-box">
            <div className="actions-btns minus" onClick={handleCartProductDecrease}>
              <Icon icon={minus} size={20} />
            </div>
            <div className="quantity">{cartProduct.qty}</div>
            <div className="actions-btns plus" onClick={handleCartProductIncrease}>
              <Icon icon={plus} size={20} />
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <p className="product-text cart-price">DT {cartProduct.TotalProductPrice}</p>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger btn-md cart-btn" onClick={handleCartProductDelete}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};
