import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider_1 from "../../../assets/imgs/slider/slider-1.jpg";
import Slider_2 from "../../../assets/imgs/slider/slider-2.jpg";
import Slider_3 from "../../../assets/imgs/slider/slider-3.jpg";

const RESPONSIVE_MAIN = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MainSlider = () => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      arrows={false}
      responsive={RESPONSIVE_MAIN}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      keyBoardControl={true}
      customTransition="transform 800ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="main-slider"
    >
      <div>
        <img
          src={Slider_1}
          alt="chipatala home slider"
          width="100%"
          height={380}
        />
      </div>
      <div>
        <img
          src={Slider_2}
          alt="chipatala home slider"
          width="100%"
          height={380}
        />
      </div>
      <div>
        <img
          src={Slider_3}
          alt="chipatala home slider"
          width="100%"
          height={380}
        />
      </div>
    </Carousel>
  );
};

export default MainSlider;
