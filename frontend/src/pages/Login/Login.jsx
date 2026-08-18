import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Login.css";

function Login({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    // ================= FRONTEND VALIDATION =================

    if (!cleanEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // ================= API REQUEST =================

    const loadingToast = toast.loading("Logging in...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: cleanEmail,
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Remove loading toast
      toast.dismiss(loadingToast);

      // ================= BACKEND ERROR =================

      if (!response.ok) {
        toast.error(
          data.message || "Invalid email or password."
        );

        return;
      }

      // ================= LOGIN SUCCESS =================

      toast.success(
        data.message || "Login successful! 🎉"
      );

      // Save user information
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Clear form
      setEmail("");
      setPassword("");

      // Close popup
      if (onClose) {
        onClose();
      }

      // Navigate home
      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (error) {
      // Remove loading toast
      toast.dismiss(loadingToast);

      console.error("Login error:", error);

      toast.error(
        "Unable to connect to server."
      );
    }
  };

  // ================= FORGOT PASSWORD =================

  const handleForgotPassword = () => {
    if (onClose) {
      onClose();
    }

    navigate("/forgot-password");
  };

  // ================= CREATE ACCOUNT =================

  const handleCreateAccount = () => {
    if (onClose) {
      onClose();
    }

    navigate("/signup");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="login-overlay"
          onClick={onClose}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          {/* ================= LOGIN POPUP ================= */}

          <motion.div
            className="login-popup"
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 30,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >

            {/* ================= CLOSE ================= */}

            <motion.button
              type="button"
              className="login-close"
              onClick={onClose}
              aria-label="Close login"
              whileHover={{
                scale: 1.15,
                rotate: 90,
              }}
              whileTap={{
                scale: 0.85,
              }}
            >
              ×
            </motion.button>

            {/* ================= LOGO ================= */}

            <motion.div
              className="login-icon"
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
            >
              🍰
            </motion.div>

            {/* ================= HEADING ================= */}

            <motion.h2
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              Welcome Back!
            </motion.h2>

            <motion.p
              className="login-subtitle"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
            >
              Login to your Sweet Bakery account
            </motion.p>

            {/* ================= FORM ================= */}

            <motion.form
              onSubmit={handleSubmit}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.4,
              }}
            >

              {/* ================= EMAIL ================= */}

              <motion.div
                className="login-input-group"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
              >
                <label htmlFor="login-email">
                  Email
                </label>

                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />
              </motion.div>

              {/* ================= PASSWORD ================= */}

              <motion.div
                className="login-input-group"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                <label htmlFor="login-password">
                  Password
                </label>

                <div className="password-wrapper">

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />

                  <motion.button
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
                    whileHover={{
                      scale: 1.15,
                    }}
                    whileTap={{
                      scale: 0.85,
                    }}
                  >
                    {showPassword
                      ? "🙈"
                      : "👁️"}
                  </motion.button>

                </div>
              </motion.div>

              {/* ================= OPTIONS ================= */}

              <motion.div
                className="login-options"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.45,
                }}
              >

                <label className="remember-me">
                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>
                </label>

                <motion.button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  whileHover={{
                    x: 3,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
                  Forgot Password?
                </motion.button>

              </motion.div>

              {/* ================= LOGIN BUTTON ================= */}

              <motion.button
                type="submit"
                className="login-submit"
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
              >
                Login
              </motion.button>

            </motion.form>

            {/* ================= DIVIDER ================= */}

            <motion.div
              className="login-divider"
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                delay: 0.55,
                duration: 0.4,
              }}
            >
              <span>OR</span>
            </motion.div>

            {/* ================= GOOGLE ================= */}

            <motion.button
              type="button"
              className="google-login"
              onClick={() =>
                toast(
                  "Google login coming soon! 🚀"
                )
              }
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              <span>G</span>
              Continue with Google
            </motion.button>

            {/* ================= SIGNUP ================= */}

            <motion.p
              className="register-text"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
              }}
            >
              Don't have an account?{" "}

              <motion.button
                type="button"
                className="register-btn"
                onClick={handleCreateAccount}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Create Account
              </motion.button>

            </motion.p>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Login;