import React from "react";
import { Individualproduct } from "./Individualproduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const Productlist = ({ products, AddTocart }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">DIEM STORE</a>
      </nav>

      <div className="container mt-4">
        <Carousel>
          {products.map((product, index) => (
            (index % 3 === 0) ? (
              <Carousel.Item key={index}>
                <div className="row">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="col-md-4">
                      <Individualproduct
                        individualProduct={products[index + i]}
                        AddTocart={AddTocart}
                      />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ) : null
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Productlist;