import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";
import { motion } from "framer-motion";

import "./Home.css";
import bakeryVideo from "../../assets/bakery.mp4";

import { useCart } from "../../context/CartContext";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ================= PRODUCTS =================

  const chocolateCake = {
    id: 1,
    name: "Chocolate Dream",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    category: "Cakes",
    quantity: 1,
  };

  const strawberryCake = {
    id: 2,
    name: "Strawberry Delight",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    category: "Cakes",
    quantity: 1,
  };

  const cupcakes = {
    id: 3,
    name: "Sweet Cupcakes",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80",
    category: "Cupcakes",
    quantity: 1,
  };

  // ================= HANDLERS =================

  const handleOrderNow = () => {
    addToCart(chocolateCake);
    navigate("/cart");
  };

  const handleShopCakes = () => {
    navigate("/cakes");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // ================= ANIMATIONS =================

  const heroContent = {
    hidden: {
      opacity: 0,
      x: -80,
    },

    visible: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardContainer = {
    hidden: {
      opacity: 0,
      y: 40,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="home">

      {/* ================= HERO ================= */}

      <section className="hero">

        {/* ================= BACKGROUND VIDEO ================= */}

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={bakeryVideo}
            type="video/mp4"
          />
        </video>

        {/* ================= VIDEO OVERLAY ================= */}

        <div className="hero-overlay"></div>


        {/* ================= HERO CONTENT ================= */}

        <motion.div
          className="hero-content"
          variants={heroContent}
          initial="hidden"
          animate="visible"
        >

          {/* SMALL TEXT */}

          <motion.p
            className="hero-small"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
          >
            FRESHLY BAKED WITH LOVE ❤️
          </motion.p>


          {/* TITLE */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >
            Sweet Moments,
            <br />
            <span>Delicious Memories.</span>
          </motion.h1>


          {/* DESCRIPTION */}

          <motion.p
            className="hero-description"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
            }}
          >
            Discover delicious cakes, cupcakes and freshly
            baked treats made with premium ingredients and
            lots of love.
          </motion.p>


          {/* ================= BUTTONS ================= */}

          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.7,
            }}
          >

            {/* ORDER NOW */}

            <motion.button
              className="order-btn"
              onClick={handleOrderNow}
              whileHover={{
                scale: 1.05,
                x: 5,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Order Now

              <motion.span
                whileHover={{
                  x: 5,
                }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>


            {/* SHOP CAKES */}

            <motion.button
              className="shop-btn"
              onClick={handleShopCakes}
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <motion.span
                whileHover={{
                  rotate: -10,
                }}
              >
                <FaShoppingCart />
              </motion.span>

              Shop Cakes
            </motion.button>

          </motion.div>

        </motion.div>

      </section>


      {/* ================= FEATURED ================= */}

      <section className="featured">

        {/* SECTION HEADING */}

        <motion.div
          className="section-heading"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <p>OUR SPECIALS</p>

          <h2>
            Fresh From The <span>Oven</span>
          </h2>

          <p>
            Our most-loved bakery treats, freshly prepared
            every day.
          </p>

        </motion.div>


        {/* ================= CAKE GRID ================= */}

        <div className="cake-grid">

          {/* ================= CHOCOLATE CAKE ================= */}

          <motion.div
            className="cake-card"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
          >

            <div className="cake-image-wrapper">

              <motion.img
                src={chocolateCake.image}
                alt="Chocolate Cake"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.4,
                }}
              />

            </div>

            <div className="cake-info">

              <h3>Chocolate Dream</h3>

              <p>
                Rich chocolate cake with creamy chocolate
                frosting.
              </p>

              <div className="cake-bottom">

                <span>₹499</span>

                <motion.button
                  onClick={() =>
                    handleAddToCart(chocolateCake)
                  }
                  aria-label="Add Chocolate Dream to cart"
                  whileHover={{
                    scale: 1.15,
                    rotate: -5,
                  }}
                  whileTap={{
                    scale: 0.85,
                  }}
                >
                  <FaShoppingCart />
                </motion.button>

              </div>

            </div>

          </motion.div>


          {/* ================= STRAWBERRY CAKE ================= */}

          <motion.div
            className="cake-card"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              delay: 0.15,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
          >

            <div className="cake-image-wrapper">

              <motion.img
                src={strawberryCake.image}
                alt="Strawberry Cake"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.4,
                }}
              />

            </div>

            <div className="cake-info">

              <h3>Strawberry Delight</h3>

              <p>
                Soft vanilla cake topped with fresh
                strawberries.
              </p>

              <div className="cake-bottom">

                <span>₹599</span>

                <motion.button
                  onClick={() =>
                    handleAddToCart(strawberryCake)
                  }
                  aria-label="Add Strawberry Delight to cart"
                  whileHover={{
                    scale: 1.15,
                    rotate: -5,
                  }}
                  whileTap={{
                    scale: 0.85,
                  }}
                >
                  <FaShoppingCart />
                </motion.button>

              </div>

            </div>

          </motion.div>


          {/* ================= CUPCAKES ================= */}

          <motion.div
            className="cake-card"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              delay: 0.3,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
          >

            <div className="cake-image-wrapper">

              <motion.img
                src={cupcakes.image}
                alt="Cupcakes"
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.4,
                }}
              />

            </div>

            <div className="cake-info">

              <h3>Sweet Cupcakes</h3>

              <p>
                Soft, fluffy cupcakes with delicious creamy
                frosting.
              </p>

              <div className="cake-bottom">

                <span>₹299</span>

                <motion.button
                  onClick={() =>
                    handleAddToCart(cupcakes)
                  }
                  aria-label="Add Sweet Cupcakes to cart"
                  whileHover={{
                    scale: 1.15,
                    rotate: -5,
                  }}
                  whileTap={{
                    scale: 0.85,
                  }}
                >
                  <FaShoppingCart />
                </motion.button>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </main>
  );
};

export default Home;