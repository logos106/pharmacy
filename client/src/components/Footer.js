import React, { Fragment } from "react";
import Logo from "../assets/imgs/logo-inline.png";
import PaymentMethod from "../assets/imgs/payment-methods.png";

const Footer = () => {
  return (
    <footer className="site-footer footer-padding-lg bg-light">
      <div className="container-fluid theme-container">
        <div className="upper-footer">
          <div className="row justify-content-around">
            <div className="col-lg-4 col-md-3 col-12">
              <div className="widget">
                <div className="footer-brand">
                  <img src={Logo} alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore numquam sit optio consectetur et pariatur modi
                  officiis veritatis repellat alias?
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-12">
              <div className="widget">
                <div className="widget-title">
                  <h3>Usefull Links</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Privacy &amp; terms</a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                  <li>
                    <a href="#">Customers</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-12">
              <div className="widget">
                <div className="widget-title">
                  <h3>Help</h3>
                </div>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="#">Business Partnership</a>
                  </li>
                  <li>
                    <a href="blog.html">Blogs</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-12">
              <div className="widget">
                <div className="widget-title">
                  <h3>Policy</h3>
                </div>
                <ul>
                  <li>
                    <a href="policy.html">Privacy policy</a>
                  </li>
                  <li>
                    <a href="policy.html">Terms and Conditions</a>
                  </li>
                  <li>
                    <a href="policy.html">Return Policy</a>
                  </li>
                  <li>
                    <a href="policy.html">Refund Policy</a>
                  </li>
                  <li>
                    <a href="policy.html">Ip Policy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-12">
              <div className="widget">
                <div className="widget-title">
                  <h3>Social</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Google</a>
                  </li>
                  <li>
                    <a href="#">Pinterest</a>
                  </li>
                  <li>
                    <a href="#">Linkedin</a>
                  </li>
                  <li>
                    <a href="#">Dribble</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="lower-footer">
          <div className="row">
            <div className="col-md-6 text-lg-left">
              <p className="mb-4 mb-md-0 text-muted">
                Copyright © 2021 Hospitania By Dsahathemes | All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-card text-lg-right">
                <img
                  className="img-fluid mx-2"
                  src={PaymentMethod}
                  alt="Icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
