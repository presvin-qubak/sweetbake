import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import "./Cookies.css";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const cookies = [
  {
    id: "cookie-1",
    name: "Chocolate Chip",
    category: "Chocolate",
    price: 149,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cookie-2",
    name: "Butter Cookies",
    category: "Butter",
    price: 129,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cookie-3",
    name: "Double Chocolate",
    category: "Chocolate",
    price: 169,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cookie-4",
    name: "Oatmeal Cookie",
    category: "Healthy",
    price: 139,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cookie-5",
    name: "Red Velvet Cookie",
    category: "Red Velvet",
    price: 179,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cookie-6",
    name: "Coconut Crunch",
    category: "Coconut",
    price: 159,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
  },
  {
  id: "cookie-7",
  name: "Chocolate Chip Delight",
  category: "Chocolate",
  price: 149,
  rating: 4.7,
  image:
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cookie-8",
  name: "Butter Shortbread",
  category: "Butter",
  price: 139,
  rating: 4.6,
  image:
    "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cookie-9",
  name: "Double Chocolate Cookie",
  category: "Chocolate",
  price: 169,
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cookie-10",
  name: "Oatmeal Raisin",
  category: "Oatmeal",
  price: 145,
  rating: 4.5,
  image:
    "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cookie-11",
  name: "Red Velvet Cookie",
  category: "Red Velvet",
  price: 179,
  rating: 4.8,
  image:
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
},
];

const Cookies = () => {
  /* ================= FILTER ================= */

  const [activeFilter, setActiveFilter] = useState("All");

  /* ================= WISHLIST ================= */

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  /* ================= CART ================= */

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  /* ================= GET QUANTITY ================= */

  const getQuantity = (id) => {
    const product = cart.find(
      (item) => item.id === id
    );

    return product ? product.quantity : 0;
  };

  /* ================= FILTER ================= */

  const filteredCookies =
    activeFilter === "All"
      ? cookies
      : cookies.filter(
          (cookie) =>
            cookie.category === activeFilter
        );

  /* ================= FILTER BUTTONS ================= */

  const filters = [
    "All",
    "Chocolate",
    "Butter",
    "Healthy",
    "Coconut",
  ];

  /* ================= CARD ANIMATION ================= */

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
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
      y: 20,
      scale: 0.9,

      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <section className="cookies-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="cookies-header"
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
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          FRESHLY BAKED EVERY DAY
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
            duration: 0.6,
          }}
        >
          Delicious <span>Cookies</span>
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
            delay: 0.4,
          }}
        >
          Crispy on the outside, soft on the inside
          and baked with love.
        </motion.p>

      </motion.div>


      {/* ================= FILTERS ================= */}

      <motion.div
        className="cookie-filters"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.5,
        }}
      >

        {filters.map((filter, index) => (

          <motion.button
            key={filter}
            type="button"
            className={
              activeFilter === filter
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(filter)
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
              delay: 0.55 + index * 0.08,
            }}
            whileHover={{
              y: -3,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.92,
            }}
          >
            {filter}
          </motion.button>

        ))}

      </motion.div>


      {/* ================= PRODUCTS ================= */}

      <motion.div
        className="cookies-grid"
        layout
      >

        <AnimatePresence mode="popLayout">

          {filteredCookies.length > 0 ? (

            filteredCookies.map(
              (cookie, index) => {

                const quantity =
                  getQuantity(cookie.id);

                const liked =
                  isInWishlist(cookie.id);

                return (

                  <motion.div
                    className="cookie-card"
                    key={cookie.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                    }}
                  >

                    {/* ================= IMAGE ================= */}

                    <div className="cookie-image">

                      <motion.img
                        src={cookie.image}
                        alt={cookie.name}
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                      />


                      {/* ================= WISHLIST ================= */}

                      <motion.button
                        type="button"
                        className={`cookie-wishlist ${
                          liked ? "liked" : ""
                        }`}
                        onClick={() => {

                          if (liked) {

                            removeFromWishlist(
                              cookie.id
                            );

                          } else {

                            addToWishlist(
                              cookie
                            );

                          }

                        }}
                        whileHover={{
                          scale: 1.15,
                        }}
                        whileTap={{
                          scale: 0.8,
                        }}
                      >

                        <motion.div
                          animate={
                            liked
                              ? {
                                  scale: [
                                    1,
                                    1.4,
                                    1,
                                  ],
                                }
                              : {
                                  scale: 1,
                                }
                          }
                          transition={{
                            duration: 0.35,
                          }}
                        >
                          <FaHeart />
                        </motion.div>

                      </motion.button>

                    </div>


                    {/* ================= INFORMATION ================= */}

                    <div className="cookie-info">

                      <motion.span
                        className="cookie-category"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                      >
                        {cookie.category}
                      </motion.span>


                      <motion.h2
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                      >
                        {cookie.name}
                      </motion.h2>


                      {/* ================= RATING ================= */}

                      <motion.div
                        className="cookie-rating"
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.1,
                        }}
                      >

                        <motion.div
                          animate={{
                            rotate: [
                              0,
                              10,
                              -10,
                              0,
                            ],
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.4,
                          }}
                        >
                          <FaStar />
                        </motion.div>

                        <span>
                          {cookie.rating}
                        </span>

                      </motion.div>


                      {/* ================= BOTTOM ================= */}

                      <div className="cookie-bottom">

                        <motion.span
                          className="cookie-price"
                          whileHover={{
                            scale: 1.08,
                          }}
                        >
                          ₹{cookie.price}
                        </motion.span>


                        {/* ================= CART ================= */}

                        <AnimatePresence mode="wait">

                          {quantity === 0 ? (

                            <motion.button
                              key="add"
                              type="button"
                              className="cookie-cart"
                              onClick={() =>
                                addToCart(
                                  cookie
                                )
                              }
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              whileHover={{
                                scale: 1.05,
                                y: -2,
                              }}
                              whileTap={{
                                scale: 0.9,
                              }}
                            >

                              <motion.div
                                whileHover={{
                                  x: 3,
                                }}
                              >
                                <FaShoppingCart />
                              </motion.div>

                              Add

                            </motion.button>

                          ) : (

                            <motion.div
                              key="quantity"
                              className="quantity-control"
                              initial={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                              }}
                            >

                              {/* MINUS */}

                              <motion.button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    cookie.id
                                  )
                                }
                                whileHover={{
                                  scale: 1.15,
                                }}
                                whileTap={{
                                  scale: 0.8,
                                }}
                              >
                                −
                              </motion.button>


                              {/* QUANTITY */}

                              <motion.span
                                key={quantity}
                                initial={{
                                  scale: 1.4,
                                  opacity: 0,
                                }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                }}
                              >
                                {quantity}
                              </motion.span>


                              {/* PLUS */}

                              <motion.button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    cookie.id
                                  )
                                }
                                whileHover={{
                                  scale: 1.15,
                                }}
                                whileTap={{
                                  scale: 0.8,
                                }}
                              >
                                +
                              </motion.button>

                            </motion.div>

                          )}

                        </AnimatePresence>

                      </div>

                    </div>

                  </motion.div>

                );

              }

            )

          ) : (

            /* ================= EMPTY ================= */

            <motion.div
              className="no-cookies"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
              }}
            >

              <motion.h2
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                No cookies found 🍪
              </motion.h2>

              <p>
                Try another category.
              </p>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </section>
  );
};

export default Cookies;