import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaBirthdayCake,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import "./Navbar.css";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Login from "../../pages/Login/Login";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Cakes", path: "/cakes" },
  { name: "Cupcakes", path: "/cupcakes" },
  { name: "Cookies", path: "/cookies" },
  { name: "Offers", path: "/offers" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  /* ===============================
     CLOSE MOBILE MENU
  =============================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ===============================
     HANDLE NAVIGATION
  =============================== */

  const handleNavClick = () => {
    closeMenu();
    setSearchOpen(false);
  };

  /* ===============================
     SEARCH
  =============================== */

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    if (value.trim()) {
      navigate(
        `/cakes?search=${encodeURIComponent(value.trim())}`
      );
    } else {
      navigate("/cakes");
    }
  };

  /* ===============================
     TOGGLE SEARCH
  =============================== */

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);

    // Close mobile menu
    setMenuOpen(false);
  };

  /* ===============================
     NAVBAR ANIMATION
  =============================== */

  const navbarVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },

    visible: {
      y: 0,
      opacity: 1,

      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  /* ===============================
     MENU ANIMATION
  =============================== */

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.3,
      },
    },
  };

  /* ===============================
     MOBILE MENU ANIMATION
  =============================== */

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },

    visible: {
      opacity: 1,
      height: "auto",

      transition: {
        duration: 0.35,
      },
    },

    exit: {
      opacity: 0,
      height: 0,

      transition: {
        duration: 0.25,
      },
    },
  };

  /* ===============================
     ICON HOVER
  =============================== */

  const iconHover = {
    scale: 1.15,
    y: -2,
  };

  return (
    <>
      {/* =================================
          NAVBAR
      ================================= */}

      <motion.nav
        className="navbar"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="nav-container">

          {/* =================================
              LOGO
          ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <NavLink
              to="/"
              className="logo"
              onClick={handleNavClick}
            >
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <FaBirthdayCake className="logo-icon" />
              </motion.div>

              <span>
                Sweet<span>Bake</span>
              </span>
            </NavLink>
          </motion.div>

          {/* =================================
              DESKTOP MENU
          ================================= */}

          <motion.div
            className={`nav-menu ${
              menuOpen ? "active" : ""
            }`}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{
                  opacity: 0,
                  y: -15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1 + index * 0.08,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -2,
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={handleNavClick}
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          {/* =================================
              RIGHT ACTIONS
          ================================= */}

          <div className="nav-actions">

            {/* SEARCH */}

            <div className="search-wrapper">

              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search cakes..."
                    className="search-input"
                    autoFocus
                    aria-label="Search cakes"
                    initial={{
                      width: 0,
                      opacity: 0,
                    }}
                    animate={{
                      width: 180,
                      opacity: 1,
                    }}
                    exit={{
                      width: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  />
                )}
              </AnimatePresence>

              <motion.button
                type="button"
                className="icon-btn"
                onClick={toggleSearch}
                aria-label={
                  searchOpen
                    ? "Close search"
                    : "Open search"
                }
                aria-expanded={searchOpen}
                whileHover={iconHover}
                whileTap={{
                  scale: 0.9,
                }}
              >
                {searchOpen ? (
                  <FaTimes />
                ) : (
                  <FaSearch />
                )}
              </motion.button>

            </div>

            {/* WISHLIST */}

            <motion.div
              whileHover={iconHover}
              whileTap={{
                scale: 0.9,
              }}
            >
              <NavLink
                to="/wishlist"
                className="icon-btn wishlist-icon"
                onClick={handleNavClick}
                aria-label={`Wishlist${
                  wishlistCount > 0
                    ? `, ${wishlistCount} items`
                    : ""
                }`}
              >
                <FaHeart />

                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.span
                      className="wishlist-count"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.div>

            {/* CART */}

            <motion.div
              whileHover={iconHover}
              whileTap={{
                scale: 0.9,
              }}
            >
              <NavLink
                to="/cart"
                className="icon-btn cart-icon"
                onClick={handleNavClick}
                aria-label={`Shopping cart${
                  cartCount > 0
                    ? `, ${cartCount} items`
                    : ""
                }`}
              >
                <FaShoppingCart />

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      className="cart-count"
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.div>

            {/* LOGIN */}

            <motion.button
              type="button"
              className="icon-btn user-btn"
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
              }}
              aria-label="Open login"
              whileHover={iconHover}
              whileTap={{
                scale: 0.9,
              }}
            >
              <FaUser />
            </motion.button>

            {/* MOBILE MENU */}

            <motion.button
              type="button"
              className="menu-btn"
              onClick={() => {
                setMenuOpen((prev) => !prev);
                setSearchOpen(false);
              }}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              whileTap={{
                scale: 0.85,
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                  >
                    <FaTimes />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                  >
                    <FaBars />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>

        {/* =================================
            MOBILE MENU
        ================================= */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleNavClick}
                >
                  {item.name}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* =================================
          LOGIN POPUP
      ================================= */}

      <Login
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
      />
    </>
  );
};

export default Navbar;