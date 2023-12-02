import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Follow Us</h5>
          
            <ul className="social-media-list">
              <li><a href="https://facebook.com">Facebook</a></li>
              <li><a href="https://twitter.com">Twitter</a></li>
              <li><a href="https://instagram.com">Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
         
            <p>Phone: +123456789</p>
            <p>Email: example@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;