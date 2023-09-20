import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { post } from "../utils/axios";
import toast from "react-simple-toasts";

const ResetPwdModal = (props) => {
  const { isOpen, onCancel, onNavigate } = props;

  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const changePwd = async () => {
    if (!newPwd) {
      setError("The Password field is required.");
      return;
    }

    if (newPwd !== confirmPwd) {
      setError("The Password & Confirm Password do not match.");
      return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");

    const url = "auth/reset-password";
    const data = {
      password: newPwd,
      token,
    };

    setLoading(true);
    const result = await post(url, data);
    setLoading(false);
    const respData = result.data;
    if (respData.code) {
      setError(respData.message);
    } else {
      onCancel();
      toast("The password has been changed successfully.");
      onNavigate("login");
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
            type="password"
            placeholder="Password"
            className="form-control input-lg rounded"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control input-lg rounded"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={`btn btn-primary btn-full btn-medium rounded ${
            loading ? "cursor-progress" : ""
          }`}
          onClick={changePwd}
          disabled={loading ? true : false}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Change Password
        </button>
      </div>
    </Modal>
  );
};

export default ResetPwdModal;
