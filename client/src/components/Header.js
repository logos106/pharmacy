import React, { Fragment, useEffect } from "react";
import Logo from "../assets/imgs/logo-inline.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-simple-toasts";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import ForgotModal from "./ForgotModal";
import ResetPwdModal from "./ResetPwdModal";
import { logout } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../utils/axios";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokens = useSelector((state) => state.auth.tokens);
  const isAuthed = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectKey = urlParams.get("page");
    if (redirectKey === "login") {
      setLoginModal(true);
    } else if (redirectKey === "reset-pwd") {
      setResetModal(true);
    }
  }, []);

  const onLoginClicked = () => {
    setLoginModal(true);
  };

  const onRegisterClicked = () => {
    setRegisterModal(true);
  };

  const onLogoutClicked = async () => {
    const url = "auth/logout";
    const data = {
      refreshToken: tokens.refresh.token,
    };
    const result = await post(url, data);
    if (result.data.code) {
      toast("Something went wrong!");
    } else {
      dispatch(logout());
      window.sessionStorage.clear();
    }
  };

  const onNavigate = (target) => {
    if (target === "login") {
      setLoginModal(true);
      setRegisterModal(false);
      setForgotModal(false);
    } else if (target === "register") {
      setRegisterModal(true);
      setLoginModal(false);
      setForgotModal(false);
    } else if (target === "forgot_password") {
      setForgotModal(true);
      setLoginModal(false);
      setRegisterModal(false);
    }
  };

  return (
    <Fragment>
      <div
        className="alert alert-warning alert-dismissible fade announcement-header hide"
        role="alert"
      >
        <div className="container-fluid">
          <div className="pro-description">
            <div className="pro-info">
              Get<strong> UPTO 40% OFF </strong>on your 1st order
              <div className="pro-link-dropdown js-toppanel-link-dropdown">
                <a href="/shop" className="pro-dropdown-toggle">
                  SHOP NOW
                </a>
              </div>
            </div>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container-fluid theme-container">
          <div className="top-header">
            <div className="row align-items-center pl-7 pr-8">
              <div className="col-auto">
                <Link to="/">
                  <img src={Logo} alt="logo" className="header-logo mr-5" />
                </Link>
              </div>
              <div className="col">
                <div className="header-search">
                  <form action="">
                    <input
                      className="form-control custom-search"
                      placeholder="Search for Medicines and Health Products"
                      type="text"
                      ref={(element) => {
                        if (element)
                          element.style.setProperty(
                            "padding",
                            "0",
                            "important"
                          );
                      }}
                    />
                  </form>
                </div>
              </div>
              <div className="col-auto">
                <ul className="header-right-options">
                  {isAuthed ? (
                    <Fragment>
                      <li className="dropdown head-cart-content">
                        <button
                          id="dropdownCartButton"
                          className="btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="list-icon">
                            <i className="ti-bag"></i>
                          </div>
                          <span className="badge badge-secondary">2</span>
                        </button>
                        <div
                          className="shopping-cart shopping-cart-empty dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <ul className="shopping-cart-items">
                            <li className="mini_cart_item">
                              <div className="left-section">
                                <a href="product-single.html">
                                  <img
                                    src="assets/img/product/product-2.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="right-section">
                                TruRadix Curcumin Oral Strip Orange Mango
                                <div>
                                  <div className="item-desc">Qty: 1</div>
                                  <div className="item-desc">₹ 237</div>
                                </div>
                              </div>
                            </li>
                            <li className="mini_cart_item">
                              <div className="left-section">
                                <a href="product-single.html">
                                  <img
                                    src="assets/img/product/product-1.png"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="right-section">
                                TruRadix Curcumin Oral Strip Orange Mango
                                <div>
                                  <div className="item-desc">Qty: 1</div>
                                  <div className="item-desc">₹ 237</div>
                                </div>
                              </div>
                            </li>
                            <li className="w-100 d-block">
                              <a
                                href="cart.html"
                                className="btn btn-primary w-100 d-block"
                              >
                                Proceed to Cart
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="dropdown">
                        <button
                          id="dropdownCartButton"
                          className="btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div className="list-icon">
                            <i className="ti-user"></i>
                          </div>
                        </button>

                        <div
                          className="dropdown-menu dropdown-menu-right user-links"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <ul>
                            {user.role === "admin" && (
                              <li onClick={() => navigate("/admin/dashboard")}>
                                <span>Dashboard</span>
                              </li>
                            )}
                            <li>
                              <span>Account</span>
                            </li>
                            <li>
                              <span>Change Password</span>
                            </li>
                            <li>
                              <span>Address</span>
                            </li>
                            <li>
                              <span>My Orders</span>
                            </li>
                            <li>
                              <span>Order Details</span>
                            </li>
                            <li>
                              <span>Wish List</span>
                            </li>
                            <li>
                              <span onClick={onLogoutClicked}>Logout</span>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <a
                          href="upload-prescription.html"
                          className="btn btn-primary btn-sm"
                        >
                          Upload
                        </a>
                      </li>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <li className="link-item">
                        <span
                          className="font-weight-bold cursor-pointer"
                          onClick={onLoginClicked}
                        >
                          Login
                        </span>
                      </li>
                      <li className="link-item">
                        <span
                          className="font-weight-bold cursor-pointer"
                          onClick={onRegisterClicked}
                        >
                          Register
                        </span>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="header-links">
            <div className="container-fluid theme-container px-8">
              <ul className="header-links-container">
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        AllMedicines
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Medicines One
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Medicines Two
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Medicines Three
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        COVID Prevention
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        Featured
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        Fitness
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="">
                      <span className="header-childrenItem-link-text">
                        Diabetes
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        COVID Test{" "}
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Boost Your Immunity
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="category.html" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Masks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        Papular
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="#">
                      <span className="header-childrenItem-link-text">
                        Supplements
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Nutritional Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Adults
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Children
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            For Women
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="header-links-item">
                  <div className="header-childrenItem-parent">
                    <a href="">
                      <span className="header-childrenItem-link-text">
                        Nutrition
                      </span>
                    </a>
                    <i className="fa fa-angle-down drop-icon"></i>
                  </div>
                  <div className="header-childrenItem-child-category-links">
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Vitamins &amp; Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Multivitamins
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Vitamins A-Z
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Mineral Supplements
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Flash Deals
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Top Health Products
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Summer Essentials
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Trending Products
                          </span>
                        </a>
                      </li>
                    </ul>
                    <ul className="header-childrenItem-child-list">
                      <li>
                        <a href="" className="childItem-level-2">
                          <span className="header-childrenItem-link-text">
                            Health Food &amp; Drinks
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Green Tea &amp; Herbal Tea
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Herbal Juice
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Apple Cider Vinegar
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="childItem-level-3">
                          <span className="header-childrenItem-link-text">
                            Healthy Snacks
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-header">
        <div className="container-fluid theme-container">
          <div className="row align-items-center">
            <div className="col-auto">
              <ul className="header-left-options">
                <li className="link-item open-sidebar">
                  <i className="ti-menu"></i>
                </li>
              </ul>
            </div>
            <div className="col text-center">
              <img src={Logo} alt="logo" className="header-logo" />
            </div>
            <div className="col-auto">
              <ul className="header-right-options">
                <li className="link-item">
                  <span className="badge badge-secondary">0</span>
                  <i className="ti-bag"></i>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-sidebar">
            <div className="close">
              <i className="ti-close"></i>
            </div>
            <div className="welcome d-flex align-items-center">
              <a
                href="#"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#login_modal"
                className="btn btn-soft-primary btn-md"
              >
                Login
              </a>
              <a
                href="#"
                data-toggle="modal"
                data-dismiss="modal"
                data-target="#register_modal"
                className="btn btn-primary btn-md"
              >
                Register
              </a>
            </div>
            <div className="mobileMenuLinks mb-4 mt-2">
              <h6>Account Info</h6>
              <ul>
                <li>
                  <a href="account.html">Account</a>
                </li>
                <li>
                  <a href="orders.html">My Orders</a>
                </li>
                <li>
                  <a href="wishlist.html">Wish List</a>
                </li>
                <li>
                  <button onClick={onLogoutClicked}>Logout</button>
                </li>
              </ul>
            </div>
            <div className="mobileMenuLinks">
              <h6>Category</h6>
              <ul>
                <li>
                  <a href="category.html">AllMedicines</a>
                </li>
                <li>
                  <a href="category.html">COVID Prevention</a>
                </li>
                <li>
                  <a href="category.html">Featured</a>
                </li>
                <li>
                  <a href="category.html">Fitness</a>
                </li>
                <li>
                  <a href="category.html">Diabetes</a>
                </li>
                <li>
                  <a href="category.html">COVID Test </a>
                </li>
                <li>
                  <a href="category.html">Papular</a>
                </li>
                <li>
                  <a href="category.html">Supplements</a>
                </li>
                <li>
                  <a href="category.html">Nutrition</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      <LoginModal
        isOpen={loginModal}
        onCancel={() => setLoginModal(false)}
        onNavigate={onNavigate}
      />
      <RegisterModal
        isOpen={registerModal}
        onCancel={() => setRegisterModal(false)}
        onNavigate={onNavigate}
      />
      <ForgotModal
        isOpen={forgotModal}
        onCancel={() => setForgotModal(false)}
        onNavigate={onNavigate}
      />
      <ResetPwdModal
        isOpen={resetModal}
        onCancel={() => setResetModal(false)}
      />
    </Fragment>
  );
};

export default Header;
