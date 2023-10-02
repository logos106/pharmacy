import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-simple-toasts";
import Facebook from "../assets/imgs/facebook.png";
import Google from "../assets/imgs/google.png";
import { post } from "../utils/axios";
import { login } from "../redux/authSlice";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const RegisterModal = (props) => {
  const { isOpen, onCancel, onNavigate } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!firstName) {
      setError("The First Name field is required.");
      return;
    }
    if (!lastName) {
      setError("The Last Name field is required.");
      return;
    }
    if (!email) {
      setError("The Email field is required.");
      return;
    }
    if (!password) {
      setError("The Password field is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be longer than 6 characters.");
      return;
    }

    const url = "auth/register";
    const data = {
      email,
      password,
      firstName,
      lastName,
      role: "user",
    };
    setLoading(true);
    const result = await post(url, data);
    setLoading(false);
    const respData = result.data;
    if (respData.code) {
      setError(respData.message);
    } else {
      onCancel();
      toast("The verification email has been sent to your email address");

      const url = "auth/send-verification-email";
      const data = {
        id: respData.user.id,
        email: respData.user.email,
      };
      await post(url, data);
    }
  };

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const url = "auth/google";
      const data = {
        token: codeResponse.access_token,
      };
      setLoading(true);
      const result = await post(url, data);
      setLoading(false);
      const respData = result.data;
      if (respData.code) {
        setError(respData.message);
      } else {
        dispatch(
          login({
            isAuthenticated: true,
            user: respData.user,
            tokens: respData.tokens,
          })
        );
        onCancel();
        window.sessionStorage.setItem("isAuthenticated", "done");
        window.sessionStorage.setItem("user", JSON.stringify(respData.user));
        window.sessionStorage.setItem(
          "tokens",
          JSON.stringify(respData.tokens)
        );
        navigate(from, { replace: true });
      }
    },
    onError: (errorResponse) => toast(errorResponse),
  });

  const onFacebookLogin = async (response) => {
    console.log(response);
    var accessToken = response.accessToken;
    const url = "auth/facebook";
    const data = {
      token: accessToken,
    };
    setLoading(true);
    const result = await post(url, data);
    setLoading(false);
    const respData = result.data;
    if (respData.code) {
      setError(respData.message);
    } else {
      dispatch(
        login({
          isAuthenticated: true,
          user: respData.user,
          tokens: respData.tokens,
        })
      );
      onCancel();
      window.sessionStorage.setItem("isAuthenticated", "done");
      window.sessionStorage.setItem("user", JSON.stringify(respData.user));
      window.sessionStorage.setItem("tokens", JSON.stringify(respData.tokens));
      navigate(from, { replace: true });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      classNames={{
        modal: "reactModal",
      }}
      center
    >
      <div className="py-4 mx-2">
        <div className="row">
          <div className="col-12">
            <FacebookLogin
              appId="1008962086896923"
              callback={onFacebookLogin}
              render={(renderProps) => (
                <button
                  className="btn border border-2 btn-gray-border btn-full rounded btn-large text-capitalize mb-3"
                  onClick={renderProps.onClick}
                >
                  <img src={Facebook} alt="" /> Register with Facebook
                </button>
              )}
            />
            <button
              className="btn border border-2 btn-gray-border btn-full rounded btn-large text-capitalize"
              onClick={onGoogleLogin}
            >
              <img src={Google} alt="" className="mr-1" />
              Register with Google
            </button>
          </div>
          <div className="col-12 text-center">
            <p className="text-muted my-4">Or Register With</p>
          </div>
        </div>
        <div
          className={`alert alert-danger alert-dismissible ${
            error ? "" : "d-none"
          }`}
          role="alert"
        >
          {error}
          <button type="button" className="close" onClick={() => setError("")}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <input
                className="form-control"
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="Password"
            className="form-control rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-primary btn-full btn-medium rounded ${
            loading ? "cursor-progress" : ""
          }`}
          onClick={onRegister}
          disabled={loading ? true : false}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Register
        </button>
        <div className="form-group text-center small font-weight-bold mt-3">
          By continuing you agree to our{" "}
          <Link to="/"> Terms and conditions.</Link>
        </div>
        <hr className="my-4" />
        <div className="form-group text-center small font-weight-bold mb-0">
          Don’t have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => onNavigate("login")}
          >
            Login
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
