import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import {
  FaLock,
  FaArrowLeft,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // ================= SUBMIT =================

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    console.log(
      "Password reset requested:",
      trimmedEmail
    );

    // Toast notification
    toast.success("Reset link sent! 📧");

    // Show success screen
    setSent(true);
  };

  // ================= ANIMATIONS =================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="forgot-page">

      <motion.div
        className="forgot-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        <AnimatePresence mode="wait">

          {/* ==================================================
              FORGOT PASSWORD FORM
          ================================================== */}

          {!sent ? (

            <motion.div
              key="forgot-form"

              initial={{
                opacity: 0,
                x: -30,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              exit={{
                opacity: 0,
                x: -30,
              }}

              transition={{
                duration: 0.4,
              }}
            >

              {/* ICON */}

              <motion.div
                className="forgot-icon"

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
                <FaLock />
              </motion.div>


              {/* HEADING */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.25,
                }}
              >
                Forgot Password?
              </motion.h1>


              <motion.p
                className="forgot-description"

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.3,
                }}
              >
                No worries! Enter the email address
                associated with your SweetBake account.
                We'll send you a link to reset your password.
              </motion.p>


              {/* FORM */}

              <motion.form
                className="forgot-form"
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
                  delay: 0.4,
                }}
              >

                {/* EMAIL */}

                <motion.div
                  className="forgot-input-group"

                  initial={{
                    opacity: 0,
                    x: -20,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    delay: 0.45,
                  }}
                >

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <div className="forgot-input-wrapper">

                    <FaEnvelope />

                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}

                      onChange={(e) =>
                        setEmail(e.target.value)
                      }

                      autoComplete="email"
                      required
                    />

                  </div>

                </motion.div>


                {/* SEND BUTTON */}

                <motion.button
                  type="submit"
                  className="reset-submit"

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
                  Send Reset Link
                </motion.button>

              </motion.form>


              {/* BACK */}

              <motion.button
                type="button"
                className="back-login"

                onClick={() =>
                  navigate("/")
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
                  delay: 0.55,
                }}

                whileHover={{
                  x: -5,
                }}

                whileTap={{
                  scale: 0.96,
                }}
              >
                <FaArrowLeft />
                Back to Home
              </motion.button>

            </motion.div>

          ) : (

            /* ==================================================
               SUCCESS SCREEN
            ================================================== */

            <motion.div
              key="success"

              initial={{
                opacity: 0,
                x: 30,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              exit={{
                opacity: 0,
                x: 30,
              }}

              transition={{
                duration: 0.4,
              }}
            >

              {/* SUCCESS ICON */}

              <motion.div
                className="reset-success"

                initial={{
                  opacity: 0,
                  scale: 0,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 180,
                }}
              >

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}

                  transition={{
                    duration: 1.5,
                    repeat: 1,
                  }}
                >
                  <FaCheckCircle />
                </motion.div>

              </motion.div>


              {/* HEADING */}

              <motion.h1
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
                Check Your Email
              </motion.h1>


              <motion.p
                className="forgot-description"

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.3,
                }}
              >
                We've sent a password reset link to:
              </motion.p>


              {/* EMAIL */}

              <motion.div
                className="reset-email"

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  scale: 1,
                }}

                transition={{
                  delay: 0.4,
                }}
              >
                {email}
              </motion.div>


              {/* NOTE */}

              <motion.p
                className="reset-note"

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.45,
                }}
              >
                Please check your inbox and follow
                the instructions to create a new password.
              </motion.p>


              {/* GO TO RESET PASSWORD */}

              <motion.button
                type="button"
                className="reset-submit"

                onClick={() =>
                  navigate("/reset-password/demo-token")
                }

                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}

                whileTap={{
                  scale: 0.96,
                }}
              >
                Continue to Reset Password
              </motion.button>


              {/* BACK */}

              <motion.button
                type="button"
                className="back-login"

                onClick={() =>
                  navigate("/")
                }

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.55,
                }}

                whileHover={{
                  x: -5,
                }}

                whileTap={{
                  scale: 0.96,
                }}
              >
                <FaArrowLeft />
                Back to Home
              </motion.button>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </main>
  );
};

export default ForgotPassword;