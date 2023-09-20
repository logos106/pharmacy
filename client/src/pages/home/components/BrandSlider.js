import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RESPONSIVE_BLAND = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 8,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const BrandSlider = () => {
  return (
    <div className="py-6 px-7">
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={RESPONSIVE_BLAND}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="transform 400ms ease-in-out"
        transitionDuration={500}
        containerclassName="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListclassName="custom-dot-list-style"
        itemclassName="carousel-item-padding-40-px"
        className="category-slider"
      >
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-1.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Summer Essentials
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-2.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-3.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Summer Essentials
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-4.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-5.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Summer Essentials
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-6.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-7.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-8.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
        <div className="product-brand">
          <a href="category.html" className="product-img">
            <img src="assets/img/brand/brand-9.png" className="" alt="" />
          </a>
          <a href="category.html" className="product-info">
            Healthcare Devices
          </a>
        </div>
      </Carousel>
    </div>
  );
};

export default BrandSlider;
