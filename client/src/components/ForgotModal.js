import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { post } from "../utils/axios";
import toast from "react-simple-toasts";

const ForgotModal = (props) => {
  const { isOpen, onCancel, onNavigate } = props;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    if (!email) {
      setError("The Email field is required.");
      return;
    }

    const url = "auth/forgot-password";
    const data = {
      email,
    };
    setLoading(true);
    const result = await post(url, data);
    setLoading(false);
    const respData = result.data;
    if (respData.code) {
      setError(respData.message);
    } else {
      onCancel();
      toast("The Password Reset link has been sent to your email address");
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
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className="form-control input-lg rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-primary btn-full btn-medium rounded ${
            !email ? "cursor-auto" : loading ? "cursor-progress" : ""
          }`}
          disabled={loading ? true : false}
          onClick={onSubmit}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Submit
        </button>
        <div className="form-group text-center small font-weight-bold mt-3">
          Want to{" "}
          <span
            class="text-primary cursor-pointer"
            onClick={() => onNavigate("login")}
          >
            Login?
          </span>
        </div>
        <hr className="my-4" />
        <div className="form-group text-center small font-weight-bold mb-0">
          Don’t have an account?{" "}
          <span
            class="text-primary cursor-pointer"
            onClick={() => onNavigate("register")}
          >
            {" "}
            Register
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotModal;
