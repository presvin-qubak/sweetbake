import React, { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import "./Cakes.css";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const cakes = [
  {
    id: 1,
    name: "Chocolate Dream",
    category: "Chocolate",
    price: 499,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Strawberry Delight",
    category: "Strawberry",
    price: 599,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Vanilla Cream",
    category: "Vanilla",
    price: 449,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Red Velvet",
    category: "Red Velvet",
    price: 699,
    rating: 4.9,
    image:
        "https://images.unsplash.com/photo-1688153009623-0d9a3ba1b105?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Black Forest",
    category: "Chocolate",
    price: 649,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Mango Magic",
    category: "Fruit",
    price: 549,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
  },
  {
  id: "cake-6",
  name: "Mango Magic",
  category: "Mango Cake",
  price: 549,
  rating: 4.7,
  image:
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cake-7",
  name: "Strawberry Dream",
  category: "Strawberry Cake",
  price: 599,
  rating: 4.8,
  image:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cake-8",
  name: "Chocolate Truffle",
  category: "Chocolate Cake",
  price: 649,
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cake-9",
  name: "Red Velvet Cake",
  category: "Red Velvet Cake",
  price: 699,
  rating: 4.9,
  image:
    "https://images.unsplash.com/photo-1586788224331-947f68671cf1?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cake-10",
  name: "Black Forest Cake",
  category: "Black Forest Cake",
  price: 749,
  rating: 4.8,
  image:
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80",
},

{
  id: "cake-11",
  name: "Butterscotch Cake",
  category: "Butterscotch Cake",
  price: 579,
  rating: 4.7,
  image:
    "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
},
];

const Cakes = () => {
  /* ================= FILTER ================= */

  const [activeFilter, setActiveFilter] = useState("All");

  /* ================= URL SEARCH ================= */

  const [searchParams] = useSearchParams();

  const searchText =
    searchParams.get("search")?.toLowerCase().trim() || "";

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

  /* ================= FILTER BUTTONS ================= */

  const filters = [
    "All",
    "Chocolate",
    "Vanilla",
    "Fruit",
    "Red Velvet",
  ];

  /* ================= FILTER + SEARCH ================= */

  const filteredCakes = cakes.filter((cake) => {
    const categoryMatch =
      activeFilter === "All" ||
      cake.category === activeFilter;

    const searchMatch =
      searchText === "" ||
      cake.name.toLowerCase().includes(searchText) ||
      cake.category.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });

  /* ================= GET QUANTITY ================= */

  const getQuantity = (id) => {
    const product = cart.find(
      (item) => item.id === id
    );

    return product ? product.quantity : 0;
  };

  /* ================= ADD TO CART ================= */

  const handleAddToCart = (cake) => {
    addToCart(cake);
  };

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
    <section className="cakes-page">

      {/* ================= HEADER ================= */}

      <motion.div
        className="cakes-header"
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
          OUR COLLECTION
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
          Delicious <span>Cakes</span>
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
          Freshly baked cakes made with premium
          ingredients for every special occasion.
        </motion.p>

      </motion.div>


      {/* ================= SEARCH RESULT ================= */}

      <AnimatePresence mode="wait">

        {searchText && (
          <motion.div
            className="search-result-message"
            initial={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.3,
            }}
          >

            <p>
              Search results for:
              <strong> "{searchText}"</strong>
            </p>

          </motion.div>
        )}

      </AnimatePresence>


      {/* ================= FILTERS ================= */}

      <motion.div
        className="cake-filters"
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
              delay: 0.55 + index * 0.08,
            }}
          >
            {filter}
          </motion.button>

        ))}

      </motion.div>


      {/* ================= PRODUCTS ================= */}

      <motion.div
        className="cakes-grid"
        layout
      >

        <AnimatePresence mode="popLayout">

          {filteredCakes.length > 0 ? (

            filteredCakes.map((cake, index) => {

              const quantity =
                getQuantity(cake.id);

              const liked =
                isInWishlist(cake.id);

              return (

                <motion.div
                  className="cake-product"
                  key={cake.id}
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
                  transition={{
                    layout: {
                      duration: 0.3,
                    },
                  }}
                >

                  {/* ================= IMAGE ================= */}

                  <div className="cake-image">

                    <motion.img
                      src={cake.image}
                      alt={cake.name}
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
                      className={`wishlist-btn ${
                        liked ? "liked" : ""
                      }`}
                      onClick={() => {

                        if (liked) {

                          removeFromWishlist(
                            cake.id
                          );

                        } else {

                          addToWishlist(cake);

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
                                scale: [1, 1.4, 1],
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

                  <div className="cake-product-info">

                    <motion.span
                      className="cake-category"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                    >
                      {cake.category}
                    </motion.span>


                    <h2>
                      {cake.name}
                    </h2>


                    {/* ================= RATING ================= */}

                    <motion.div
                      className="rating"
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
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.4,
                        }}
                      >
                        <FaStar />
                      </motion.div>

                      <span>
                        {cake.rating}
                      </span>

                    </motion.div>


                    {/* ================= BOTTOM ================= */}

                    <div className="cake-product-bottom">

                      <motion.span
                        className="price"
                        whileHover={{
                          scale: 1.08,
                        }}
                      >
                        ₹{cake.price}
                      </motion.span>


                      {/* ================= CART ================= */}

                      <AnimatePresence mode="wait">

                        {quantity === 0 ? (

                          <motion.button
                            key="add"
                            type="button"
                            className="add-cart"
                            onClick={() =>
                              handleAddToCart(cake)
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

                            <motion.button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  cake.id
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

                            <motion.button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  cake.id
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

            })

          ) : (

            /* ================= NO PRODUCTS ================= */

            <motion.div
              className="no-cakes"
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
                No cakes found 🍰
              </motion.h2>

              <p>
                Try another cake or category.
              </p>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.div>

    </section>
  );
};

export default Cakes;