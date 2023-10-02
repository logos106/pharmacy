import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { login } from "../redux/authSlice";
import { post } from "../utils/axios";
import Facebook from "../assets/imgs/facebook.png";
import Google from "../assets/imgs/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-simple-toasts";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const LoginModal = (props) => {
  const { isOpen, onCancel, onNavigate } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email) {
      setError("The Email field is required.");
      return;
    }
    if (!password) {
      setError("The Password field is required.");
      return;
    }

    const url = "auth/login";
    const data = {
      email,
      password,
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
        <div className="row pt-3">
          <div className="col-12">
            <FacebookLogin
              appId="1008962086896923"
              callback={onFacebookLogin}
              render={(renderProps) => (
                <button
                  className="btn border border-2 btn-gray-border btn-full rounded btn-large text-capitalize mb-3"
                  onClick={renderProps.onClick}
                >
                  <img src={Facebook} alt="" /> Login with Facebook
                </button>
              )}
            />
            <button
              className="btn border border-2 btn-gray-border btn-full rounded btn-large text-capitalize"
              onClick={onGoogleLogin}
            >
              <img src={Google} alt="pharmacy google login" /> Login with Google
            </button>
          </div>
          <div className="col-12 text-center">
            <p className="text-muted my-4">Or Login With</p>
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
        <div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control input-lg rounded pl-0"
              style={{ fontSize: 14 }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control input-lg rounded pl-0"
              style={{ fontSize: 14 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={`btn btn-primary btn-full btn-medium rounded ${
              loading ? "cursor-progress" : ""
            }`}
            onClick={onLogin}
            disabled={loading ? true : false}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Login
          </button>
          <div className="form-group text-center small font-weight-bold mt-3">
            <span
              className="cursor-pointer text-primary"
              onClick={() => onNavigate("forgot_password")}
            >
              Forgot Password?
            </span>
          </div>
          <hr className="my-4" />
          <div className="form-group text-center small font-weight-bold mb-0">
            Don’t have an account?
            <span
              className="text-primary cursor-pointer ml-1"
              onClick={() => onNavigate("register")}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
