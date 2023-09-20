import React from "react";

const Offer = () => {
  return (
    <div className="pt-5">
      <div className="offers-list bg-light py-5 offers-grid-2">
        <div className="container">
          <ul>
            <li>
              <div className="offer-image">
                <img src="assets/img/offer/offer-1.png" alt="" />
              </div>
              <div className="offer-info">
                <h2 className="offer-title">True Basics Flat 10% off</h2>
                <p className="offer-subtitle">
                  Clinically Researched Essentials
                </p>
                <a href="category.html" className="btn btn-primary btn-sm">
                  Shop now
                </a>
              </div>
            </li>
            <li>
              <div className="offer-image">
                <img src="assets/img/offer/offer-2.png" alt="" />
              </div>
              <div className="offer-info">
                <h2 className="offer-title">True Basics Flat 10% off</h2>
                <p className="offer-subtitle">
                  Clinically Researched Essentials
                </p>
                <a href="category.html" className="btn btn-primary btn-sm">
                  Shop now
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Offer;
