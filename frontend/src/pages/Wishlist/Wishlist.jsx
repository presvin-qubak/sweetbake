import React from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

import "./Wishlist.css";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  /* ================= CARD ANIMATION ================= */

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),

    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,

      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="wishlist-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="wishlist-header"
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
          className="wishlist-label"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          YOUR FAVORITES
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
        >
          My <span>Wishlist</span> ❤️
        </motion.h1>

        <motion.p
          className="wishlist-description"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
        >
          Your favorite sweet treats are waiting for you.
        </motion.p>

      </motion.div>


      {/* ================= EMPTY WISHLIST ================= */}

      {wishlist.length === 0 ? (

        <motion.div
          className="empty-wishlist"
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
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >

          {/* ANIMATED HEART */}

          <motion.div
            className="empty-wishlist-heart"
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaHeart />
          </motion.div>


          {/* TITLE */}

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
            Your Wishlist is Empty
          </motion.h2>


          {/* DESCRIPTION */}

          <motion.p
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
            Save your favorite cakes and treats here.
          </motion.p>

        </motion.div>

      ) : (

        /* ================= WISHLIST PRODUCTS ================= */

        <div className="wishlist-grid">

          <AnimatePresence mode="popLayout">

            {wishlist.map((item, index) => (

              <motion.div
                className="wishlist-card"
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
              >

                {/* ================= IMAGE ================= */}

                <motion.div
                  className="wishlist-image"
                  whileHover={{
                    scale: 1.02,
                  }}
                >

                  <motion.img
                    src={item.image}
                    alt={item.name}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  />


                  {/* DELETE BUTTON */}

                  <motion.button
                    type="button"
                    className="remove-wishlist"
                    onClick={() =>
                      removeFromWishlist(item.id)
                    }
                    title={`Remove ${item.name} from wishlist`}
                    aria-label={`Remove ${item.name} from wishlist`}
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                    }}
                    whileTap={{
                      scale: 0.8,
                    }}
                  >
                    <FaTrash />
                  </motion.button>

                </motion.div>


                {/* ================= INFO ================= */}

                <motion.div
                  className="wishlist-info"
                  layout
                >

                  {item.category && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                    >
                      {item.category}
                    </motion.span>
                  )}


                  <h2>
                    {item.name}
                  </h2>


                  {/* ================= BOTTOM ================= */}

                  <div className="wishlist-bottom">

                    {/* PRICE */}

                    <motion.strong
                      key={item.price}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                    >
                      ₹{Number(item.price).toFixed(2)}
                    </motion.strong>


                    {/* ADD TO CART */}

                    <motion.button
                      type="button"
                      className="wishlist-cart"
                      onClick={() =>
                        addToCart(item)
                      }
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                    >

                      <FaShoppingCart />

                      <span>
                        Add to Cart
                      </span>

                    </motion.button>

                  </div>

                </motion.div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

      )}

    </section>
  );
};

export default Wishlist;