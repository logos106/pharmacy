import React, { Fragment } from "react";
import MainSlider from "./components/MainSlider";
import CategorySlider from "./components/CategorySlider";
import "./components/CustomSlider.css";
import PopularProductGrid from "./components/PopularProductGrid";
import Offer from "./components/Offer";
import BrandSlider from "./components/BrandSlider";

const Home = () => {
  return (
    <Fragment>
      <MainSlider />
      <CategorySlider />
      <PopularProductGrid />
      <Offer />
      <BrandSlider />
    </Fragment>
  );
};

export default Home;
