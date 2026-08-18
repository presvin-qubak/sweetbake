import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBirthdayCake,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // ================= CHANGE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ================= SUBMIT =================
const handleSubmit = (e) => {
  e.preventDefault();

  const name = formData.name.trim();
  const email = formData.email.trim();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

  if (!name) {
    setError("Please enter your full name.");
    toast.error("Please enter your full name.");
    return;
  }

  if (!email) {
    setError("Please enter your email address.");
    toast.error("Please enter your email address.");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    toast.error("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    toast.error("Passwords do not match.");
    return;
  }

  const signupData = {
    name,
    email,
    password,
  };

  console.log("Signup data:", signupData);

  toast.success("Account created successfully! 🎉");

  navigate("/");
};


  // ================= ANIMATIONS =================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <main className="signup-page">

      <motion.div
        className="signup-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* ================= CLOSE BUTTON ================= */}

        <motion.button
          type="button"
          className="signup-close"
          onClick={() => navigate("/")}
          aria-label="Close signup"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 90,
          }}
          whileTap={{
            scale: 0.9,
          }}
        >
          <FaTimes />
        </motion.button>


        {/* ================= LOGO ================= */}

        <motion.div
          className="signup-icon"
          variants={itemVariants}
          whileHover={{
            scale: 1.15,
            rotate: 8,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
        >
          <FaBirthdayCake />
        </motion.div>


        {/* ================= HEADING ================= */}

        <motion.h1 variants={itemVariants}>
          Create Account
        </motion.h1>


        <motion.p
          className="signup-description"
          variants={itemVariants}
        >
          Join SweetBake and enjoy delicious
          treats made with love. 🍰
        </motion.p>


        {/* ================= ERROR ================= */}

        <AnimatePresence>
          {error && (
            <motion.div
              className="signup-error"
              role="alert"
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>


        {/* ================= FORM ================= */}

        <motion.form
          className="signup-form"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >

          {/* ================= NAME ================= */}

          <motion.div
            className="signup-input-group"
            variants={itemVariants}
          >
            <label htmlFor="name">
              Full Name
            </label>

            <div className="signup-input-wrapper">

              <FaUser />

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />

            </div>
          </motion.div>


          {/* ================= EMAIL ================= */}

          <motion.div
            className="signup-input-group"
            variants={itemVariants}
          >
            <label htmlFor="email">
              Email Address
            </label>

            <div className="signup-input-wrapper">

              <FaEnvelope />

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>
          </motion.div>


          {/* ================= PASSWORD ================= */}

          <motion.div
            className="signup-input-group"
            variants={itemVariants}
          >
            <label htmlFor="password">
              Password
            </label>

            <div className="signup-input-wrapper">

              <FaLock />

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <motion.button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
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
              </motion.button>

            </div>
          </motion.div>


          {/* ================= CONFIRM PASSWORD ================= */}

          <motion.div
            className="signup-input-group"
            variants={itemVariants}
          >
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className="signup-input-wrapper">

              <FaLock />

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <motion.button
                type="button"
                className="signup-password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
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
              </motion.button>

            </div>
          </motion.div>


          {/* ================= TERMS ================= */}

          <motion.label
            className="signup-terms"
            variants={itemVariants}
          >
            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the Terms & Conditions
            </span>
          </motion.label>


          {/* ================= CREATE ACCOUNT ================= */}

          <motion.button
            type="submit"
            className="signup-submit"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            Create Account
          </motion.button>

        </motion.form>


        {/* ================= LOGIN ================= */}

        <motion.p
          className="already-account"
          variants={itemVariants}
        >
          Already have an account?{" "}

          <motion.button
            type="button"
            onClick={() => navigate("/login")}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Login
          </motion.button>
        </motion.p>

      </motion.div>

    </main>
  );
};

export default Signup;