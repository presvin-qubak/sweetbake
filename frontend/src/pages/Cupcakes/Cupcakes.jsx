import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";

import "./Cupcakes.css";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const cupcakes = [
  {
    id: 101,
    name: "Vanilla Dream",
    price: 99,
    rating: 4.9,
    category: "Vanilla",
    image:
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 102,
    name: "Chocolate Bliss",
    price: 119,
    rating: 4.8,
    category: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 103,
    name: "Strawberry Kiss",
    price: 129,
    rating: 4.9,
    category: "Strawberry",
    image:
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 104,
    name: "Red Velvet",
    price: 139,
    rating: 4.8,
    category: "Red Velvet",
    image:
        "https://images.unsplash.com/photo-1688153009623-0d9a3ba1b105?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 105,
    name: "Caramel Delight",
    price: 129,
    rating: 4.7,
    category: "Caramel",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 106,
    name: "Blueberry Cream",
    price: 149,
    rating: 4.9,
    category: "Fruit",
    image:
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
  },
  {
  id: 107,
  name: "Strawberry Swirl",
  price: 139,
  rating: 4.8,
  category: "Fruit",
  image:
    "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80",
},

{
  id: 108,
  name: "Chocolate Fudge Cupcake",
  price: 159,
  rating: 4.9,
  category: "Chocolate",
  image:
    "https://images.unsplash.com/photo-1607478900766-efe13248b125?auto=format&fit=crop&w=600&q=80",
},

{
  id: 109,
  name: "Vanilla Cream Cupcake",
  price: 129,
  rating: 4.7,
  category: "Vanilla",
  image:
    "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
},

{
  id: 110,
  name: "Red Velvet Cupcake",
  price: 169,
  rating: 4.9,
  category: "Red Velvet",
  image:
    "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80",
},

{
  id: 111,
  name: "Blueberry Bliss",
  price: 149,
  rating: 4.8,
  category: "Blueberry",
  image:
    "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80",
},

{
  id: 112,
  name: "Butterscotch Crunch",
  price: 159,
  rating: 4.7,
  category: "Butterscotch",
  image:
    "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=600&q=80",
},
];

const Cupcakes = () => {
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

  /* ================= FILTER BUTTONS ================= */

  const filters = [
    "All",
    "Chocolate",
    "Vanilla",
    "Strawberry",
    "Fruit",
    "Caramel",
    "Red Velvet",
  ];

  /* ================= FILTER PRODUCTS ================= */

  const filteredCupcakes =
    activeFilter === "All"
      ? cupcakes
      : cupcakes.filter(
          (cupcake) =>
            cupcake.category === activeFilter
        );

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
      scale: 0.9,
      y: 20,

      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <section className="cupcakes-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="cupcakes-header"
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
          SMALL BITES OF HAPPINESS
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
          Delicious <span>Cupcakes</span>
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
          Soft, fluffy and freshly baked
          cupcakes topped with delicious
          creamy frosting.
        </motion.p>

      </motion.div>


      {/* ================= FILTERS ================= */}

      <motion.div
        className="cupcake-filters"
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
            whileHover={{
              y: -3,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.92,
            }}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.55 + index * 0.07,
            }}
          >
            {filter}
          </motion.button>

        ))}

      </motion.div>


      {/* ================= PRODUCTS ================= */}

      <motion.div
        className="cupcakes-grid"
        layout
      >

        <AnimatePresence mode="popLayout">

          {filteredCupcakes.length > 0 ? (

            filteredCupcakes.map(
              (cupcake, index) => {

                const quantity =
                  getQuantity(cupcake.id);

                const liked =
                  isInWishlist(cupcake.id);

                return (

                  <motion.div
                    className="cupcake-card"
                    key={cupcake.id}
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

                    <div className="cupcake-image">

                      <motion.img
                        src={cupcake.image}
                        alt={cupcake.name}
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
                        className={`cupcake-wishlist ${
                          liked ? "liked" : ""
                        }`}
                        onClick={() => {

                          if (liked) {

                            removeFromWishlist(
                              cupcake.id
                            );

                          } else {

                            addToWishlist(
                              cupcake
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


                    {/* ================= INFO ================= */}

                    <div className="cupcake-info">

                      <motion.span
                        className="cupcake-category"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                      >
                        {cupcake.category}
                      </motion.span>


                      <h2>
                        {cupcake.name}
                      </h2>


                      {/* ================= RATING ================= */}

                      <motion.div
                        className="cupcake-rating"
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
                          {cupcake.rating}
                        </span>

                      </motion.div>


                      {/* ================= BOTTOM ================= */}

                      <div className="cupcake-bottom">

                        <motion.span
                          className="cupcake-price"
                          whileHover={{
                            scale: 1.08,
                          }}
                        >
                          ₹{cupcake.price}
                        </motion.span>


                        {/* ================= CART ================= */}

                        <AnimatePresence
                          mode="wait"
                        >

                          {quantity === 0 ? (

                            <motion.button
                              key="add"
                              type="button"
                              className="cupcake-cart"
                              onClick={() =>
                                addToCart(
                                  cupcake
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
                                    cupcake.id
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


                              {/* NUMBER */}

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
                                    cupcake.id
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
              className="no-cupcakes"
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
                No cupcakes found 🧁
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

export default Cupcakes;