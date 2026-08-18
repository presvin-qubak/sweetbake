import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FaBirthdayCake,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  /* ================= ANIMATION VARIANTS ================= */

  const columnVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        delay: index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  const socialVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },

    visible: (index) => ({
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
      },
    }),
  };

  /* ================= NEWSLETTER ================= */

  const handleSubscribe = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value.trim();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Subscribed successfully! 🎉");

    form.reset();
  };

  return (
    <motion.footer
      className="footer"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.1,
      }}
      transition={{
        duration: 0.7,
      }}
    >

      {/* ================= FOOTER CONTAINER ================= */}

      <div className="footer-container">

        {/* ================= BRAND ================= */}

        <motion.div
          className="footer-column footer-brand"
          custom={0}
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
          >
            <NavLink
              to="/"
              className="footer-logo"
            >

              <motion.span
                whileHover={{
                  rotate: 8,
                  scale: 1.1,
                }}
              >
                <FaBirthdayCake />
              </motion.span>

              <span>
                Sweet<span>Bake</span>
              </span>

            </NavLink>
          </motion.div>


          <p className="footer-description">
            Freshly baked cakes, cupcakes and cookies
            made with premium ingredients and lots of love.
          </p>


          {/* ================= SOCIAL ================= */}

          <div className="footer-social">

            {[
              {
                icon: <FaFacebookF />,
                label: "Facebook",
              },
              {
                icon: <FaInstagram />,
                label: "Instagram",
              },
              {
                icon: <FaTwitter />,
                label: "Twitter",
              },
              {
                icon: <FaYoutube />,
                label: "YouTube",
              },
            ].map((social, index) => (

              <motion.a
                href="#"
                aria-label={social.label}
                key={social.label}
                custom={index}
                variants={socialVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -5,
                  scale: 1.15,
                }}
                whileTap={{
                  scale: 0.9,
                }}
              >
                {social.icon}
              </motion.a>

            ))}

          </div>

        </motion.div>


        {/* ================= QUICK LINKS ================= */}

        <motion.div
          className="footer-column"
          custom={1}
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <h3>Quick Links</h3>

          <ul>

            {[
              ["Home", "/"],
              ["Cakes", "/cakes"],
              ["Cupcakes", "/cupcakes"],
              ["Cookies", "/cookies"],
              ["Offers", "/offers"],
            ].map(([name, path]) => (

              <motion.li
                key={name}
                whileHover={{
                  x: 6,
                }}
              >
                <NavLink to={path}>
                  {name}
                </NavLink>
              </motion.li>

            ))}

          </ul>

        </motion.div>


        {/* ================= COMPANY ================= */}

        <motion.div
          className="footer-column"
          custom={2}
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <h3>Company</h3>

          <ul>

            {[
              ["About Us", "/about"],
              ["Contact", "/contact"],
              ["Wishlist", "/wishlist"],
              ["Shopping Cart", "/cart"],
            ].map(([name, path]) => (

              <motion.li
                key={name}
                whileHover={{
                  x: 6,
                }}
              >
                <NavLink to={path}>
                  {name}
                </NavLink>
              </motion.li>

            ))}

          </ul>

        </motion.div>


        {/* ================= CONTACT ================= */}

        <motion.div
          className="footer-column footer-contact"
          custom={3}
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
        >

          <h3>Contact Us</h3>

<motion.a
  href="https://www.google.com/maps/search/?api=1&query=Nagercoil%2C%20Kanyakumari%2C%20Tamil%20Nadu"
  target="_blank"
  rel="noopener noreferrer"
  className="contact-item"
  aria-label="Open Nagercoil location in Google Maps"
  whileHover={{
    x: 6,
  }}
>
  <motion.span
    whileHover={{
      scale: 1.2,
      rotate: 8,
    }}
  >
    <FaMapMarkerAlt />
  </motion.span>

  <p>
    Nagercoil,
    <br />
    Kanyakumari, Tamil Nadu
  </p>
</motion.a>

<motion.a
  href="tel:+919876543210"
  className="contact-item"
  aria-label="Call SweetBake"
  whileHover={{
    x: 6,
  }}
>
  <motion.span
    whileHover={{
      scale: 1.2,
    }}
  >
    <FaPhone />
  </motion.span>

  <p>
    +91 98765 43210
  </p>
</motion.a>

<motion.a
  href="mailto:hello@sweetbake.com"
  className="contact-item"
  aria-label="Email SweetBake"
  whileHover={{
    x: 6,
  }}
>
  <motion.span
    whileHover={{
      scale: 1.2,
    }}
  >
    <FaEnvelope />
  </motion.span>

  <p>
    hello@sweetbake.com
  </p>
</motion.a>
        </motion.div>

      </div>


      {/* ================= NEWSLETTER ================= */}

      <motion.div
        className="footer-newsletter"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >

        <div className="newsletter-content">

          {/* ================= NEWSLETTER TEXT ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
          >

            <h3>
              Get Sweet Updates 🍰
            </h3>

            <p>
              Subscribe for new treats, offers and
              special discounts.
            </p>

          </motion.div>


          {/* ================= NEWSLETTER FORM ================= */}

          <motion.form
            className="newsletter-form"
            onSubmit={handleSubscribe}

            initial={{
              opacity: 0,
              x: 40,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              delay: 0.2,
            }}
          >

            {/* EMAIL */}

            <motion.input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required

              whileFocus={{
                scale: 1.02,
              }}
            />


            {/* SUBSCRIBE */}

            <motion.button
              type="submit"

              whileHover={{
                scale: 1.05,
                y: -2,
              }}

              whileTap={{
                scale: 0.95,
              }}
            >
              Subscribe
            </motion.button>

          </motion.form>

        </div>

      </motion.div>


      {/* ================= BOTTOM ================= */}

      <motion.div
        className="footer-bottom"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
        }}
      >

        <p>
          © {currentYear} SweetBake.
          All Rights Reserved.
        </p>


        <p className="made-with">

          Made with{" "}

          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaHeart />
          </motion.span>

          {" "}for cake lovers

        </p>

      </motion.div>

    </motion.footer>
  );
};

export default Footer;