import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import "./Contact.css";

function Contact() {
  /* ================= FORM STATE ================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= ANIMATION ================= */

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.5,
        delay: index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      /* ================= BACKEND ERROR ================= */

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      /* ================= SUCCESS TOAST ================= */

      toast.success("Message sent successfully! 🍰");

      /* ================= CLEAR FORM ================= */

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      /* ================= ERROR TOAST ================= */

      toast.error(
        error.message ||
          "Unable to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-container">

        {/* ================= HEADER ================= */}

        <motion.div
          className="contact-header"
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <motion.p
            className="contact-subtitle"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.5,
            }}
          >
            GET IN TOUCH
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
              duration: 0.6,
            }}
          >
            Have a question, special request, or want
            to place an order? We'd love to hear from you!
          </motion.p>
        </motion.div>

        {/* ================= CONTENT ================= */}

        <div className="contact-content">

          {/* ================= CONTACT INFO ================= */}

          <motion.div
            className="contact-info"
            initial={{
              opacity: 0,
              x: -80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <motion.h2>
              Let's Talk 🍰
            </motion.h2>

            {/* VISIT */}

            <motion.div
              className="contact-item"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              whileHover={{
                x: 8,
              }}
            >
              <motion.span
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                }}
              >
                📍
              </motion.span>

              <div>
                <h3>Visit Us</h3>

                <p>
                  123 Sweet Street, Kanyakumari,
                  Tamil Nadu
                </p>
              </div>
            </motion.div>

            {/* PHONE */}

            <motion.div
              className="contact-item"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              whileHover={{
                x: 8,
              }}
            >
              <motion.span
                whileHover={{
                  scale: 1.2,
                  rotate: -8,
                }}
              >
                📞
              </motion.span>

              <div>
                <h3>Call Us</h3>

                <p>+91 98765 43210</p>
              </div>
            </motion.div>

            {/* EMAIL */}

            <motion.div
              className="contact-item"
              custom={2}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              whileHover={{
                x: 8,
              }}
            >
              <motion.span
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                }}
              >
                ✉️
              </motion.span>

              <div>
                <h3>Email Us</h3>

                <p>hello@sweetbakery.com</p>
              </div>
            </motion.div>

            {/* HOURS */}

            <motion.div
              className="contact-item"
              custom={3}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              whileHover={{
                x: 8,
              }}
            >
              <motion.span
                whileHover={{
                  scale: 1.2,
                  rotate: -8,
                }}
              >
                🕐
              </motion.span>

              <div>
                <h3>Opening Hours</h3>

                <p>Monday - Sunday</p>

                <p>9:00 AM - 9:00 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= FORM ================= */}

          <motion.div
            className="contact-form-box"
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
          >
            <motion.h2>
              Send Us a Message
            </motion.h2>

            <form onSubmit={handleSubmit}>

              {/* NAME + EMAIL */}

              <div className="form-row">

                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  whileFocus={{
                    scale: 1.01,
                  }}
                />

                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  whileFocus={{
                    scale: 1.01,
                  }}
                />

              </div>

              {/* PHONE */}

              <motion.input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                whileFocus={{
                  scale: 1.01,
                }}
              />

              {/* SUBJECT */}

              <motion.input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                whileFocus={{
                  scale: 1.01,
                }}
              />

              {/* MESSAGE */}

              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message..."
                required
                whileFocus={{
                  scale: 1.01,
                }}
              />

              {/* SEND BUTTON */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={
                  !loading
                    ? {
                        scale: 1.04,
                        y: -3,
                      }
                    : {}
                }
                whileTap={
                  !loading
                    ? {
                        scale: 0.95,
                      }
                    : {}
                }
              >
                {loading
                  ? "Sending..."
                  : "Send Message 💌"}
              </motion.button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;