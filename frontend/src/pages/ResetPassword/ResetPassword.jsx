import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import toast from "react-hot-toast";

import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ================= TOKEN CHECK =================

    if (!token) {
      setError("Invalid or missing reset token.");
      toast.error("Invalid or missing reset token.");
      return;
    }


    // ================= PASSWORD LENGTH =================

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      toast.error(
        "Password must be at least 6 characters."
      );

      return;
    }


    // ================= PASSWORD MATCH =================

    if (password !== confirmPassword) {
      setError("Passwords do not match.");

      toast.error("Passwords do not match.");

      return;
    }


    // ================= API REQUEST =================

    setLoading(true);

    const loadingToast =
      toast.loading("Resetting password...");


    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password: password,
          }),
        }
      );


      const data = await response.json();


      // Remove loading toast
      toast.dismiss(loadingToast);


      // ================= BACKEND ERROR =================

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset password."
        );

        toast.error(
          data.message ||
            "Unable to reset password."
        );

        setLoading(false);

        return;
      }


      // ================= SUCCESS =================

      toast.success(
        data.message ||
          "Password reset successfully! 🎉"
      );


      // Clear fields
      setPassword("");
      setConfirmPassword("");


      // Go to login
      setTimeout(() => {
        navigate("/");
      }, 1200);


    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      toast.dismiss(loadingToast);

      setError(
        "Unable to connect to server."
      );

      toast.error(
        "Unable to connect to server."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="reset-page">

      <div className="reset-container">

        {/* ================= ICON ================= */}

        <div className="reset-icon">
          <FaLock />
        </div>


        {/* ================= HEADING ================= */}

        <h1>
          Reset Password
        </h1>

        <p className="reset-description">
          Create a new password for your
          SweetBake account.
        </p>


        {/* ================= ERROR ================= */}

        {error && (
          <div
            className="reset-error"
            role="alert"
          >
            {error}
          </div>
        )}


        {/* ================= FORM ================= */}

        <form
          className="reset-form"
          onSubmit={handleSubmit}
        >

          {/* ================= NEW PASSWORD ================= */}

          <div className="reset-input-group">

            <label htmlFor="password">
              New Password
            </label>

            <div className="reset-input-wrapper">

              <FaLock className="input-icon" />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );

                  setError("");
                }}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>


          {/* ================= CONFIRM PASSWORD ================= */}

          <div className="reset-input-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="reset-input-wrapper">

              <FaLock className="input-icon" />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(
                    e.target.value
                  );

                  setError("");
                }}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>


          {/* ================= PASSWORD RULES ================= */}

          <div className="password-rules">

            <p>
              Password must contain:
            </p>

            <span>
              ✓ At least 6 characters
            </span>

          </div>


          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            className="reset-password-btn"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>


        {/* ================= BACK ================= */}

        <button
          type="button"
          className="reset-back-btn"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          <FaArrowLeft />
          Back to Home
        </button>

      </div>

    </main>
  );
};

export default ResetPassword;