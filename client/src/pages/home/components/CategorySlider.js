import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const RESPONSIVE_CATEGORY = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CategorySlider = () => {
  return (
    <div className="py-4 px-5">
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={RESPONSIVE_CATEGORY}
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
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-1.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Tetanus Injection</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-2.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Darjeeling Teas</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-3.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Whey Protein</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-4.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Sport Nutrition</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-5.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Covid Masks</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="product-categories-grid">
          <div className="product-img">
            <img src="assets/img/category/category-6.png" className="" alt="" />
            <div className="cat-info">
              <h5 className="cat-name">Beauty Serum</h5>
              <a href="category.html" className="cat-link">
                View All <i className="ti-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CategorySlider;
