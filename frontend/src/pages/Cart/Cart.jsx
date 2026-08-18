import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

import { useCart } from "../../context/CartContext";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = cartTotal;

  const delivery =
    subtotal > 500 || subtotal === 0
      ? 0
      : 50;

  const total = subtotal + delivery;


  /* ================= ITEM ANIMATION ================= */

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },

    visible: (index) => ({
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    }),

    exit: {
      opacity: 0,
      x: 50,
      scale: 0.9,

      transition: {
        duration: 0.3,
      },
    },
  };


  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <section className="cart-page empty-cart">

        <motion.div
          className="empty-cart-box"
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >

          {/* CART ICON */}

          <motion.div
            className="empty-cart-icon"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🛒
          </motion.div>


          <motion.h1
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
            Your Cart is Empty
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
              delay: 0.3,
            }}
          >
            Looks like you haven't added any
            delicious treats yet.
          </motion.p>


          <motion.button
            onClick={() => navigate("/")}
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
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Continue Shopping 🍰
          </motion.button>

        </motion.div>

      </section>
    );
  }


  /* ================= MAIN CART ================= */

  return (
    <section className="cart-page">

      <div className="cart-container">


        {/* ================= HEADER ================= */}

        <motion.div
          className="cart-header"
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
        >

          <div>

            <motion.p
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
              YOUR SHOPPING CART
            </motion.p>


            <motion.h1
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.3,
              }}
            >
              My Cart 🛒
            </motion.h1>

          </div>


          {/* CLEAR CART */}

          <motion.button
            className="clear-cart-btn"
            onClick={clearCart}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Clear Cart
          </motion.button>

        </motion.div>


        {/* ================= CART LAYOUT ================= */}

        <div className="cart-layout">


          {/* ================= CART ITEMS ================= */}

          <div className="cart-items">

            <AnimatePresence mode="popLayout">

              {cart.map((item, index) => (

                <motion.div
                  className="cart-item"
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >

                  {/* ================= IMAGE ================= */}

                  <motion.div
                    className="cart-product-image"
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >

                    <motion.img
                      src={item.image}
                      alt={item.name}
                      whileHover={{
                        scale: 1.08,
                      }}
                    />

                  </motion.div>


                  {/* ================= PRODUCT INFO ================= */}

                  <motion.div
                    className="cart-product-info"
                    layout
                  >

                    <h2>
                      {item.name}
                    </h2>


                    {item.category && (
                      <p className="cart-category">
                        {item.category}
                      </p>
                    )}


                    <p className="cart-price">
                      ₹
                      {Number(item.price).toFixed(2)}
                    </p>

                  </motion.div>


                  {/* ================= QUANTITY ================= */}

                  <div className="quantity-control">

                    <motion.button
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.85,
                      }}
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </motion.button>


                    <motion.span
                      key={item.quantity}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      {item.quantity}
                    </motion.span>


                    <motion.button
                      whileHover={{
                        scale: 1.15,
                      }}
                      whileTap={{
                        scale: 0.85,
                      }}
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </motion.button>

                  </div>


                  {/* ================= ITEM TOTAL ================= */}

                  <motion.div
                    className="item-total"
                    key={`${item.id}-${item.quantity}`}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    ₹
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toFixed(2)}
                  </motion.div>


                  {/* ================= REMOVE ================= */}

                  <motion.button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    title="Remove item"
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                    }}
                    whileTap={{
                      scale: 0.8,
                    }}
                  >
                    ✕
                  </motion.button>

                </motion.div>

              ))}

            </AnimatePresence>

          </div>


          {/* ================= ORDER SUMMARY ================= */}

          <motion.div
            className="order-summary"
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: "easeOut",
            }}
          >

            <motion.h2
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
              Order Summary
            </motion.h2>


            {/* SUBTOTAL */}

            <motion.div
              className="summary-row"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.45,
              }}
            >

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>

            </motion.div>


            {/* DELIVERY */}

            <motion.div
              className="summary-row"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.5,
              }}
            >

              <span>
                Delivery
              </span>

              <strong>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </strong>

            </motion.div>


            {/* FREE DELIVERY */}

            {subtotal > 0 &&
              subtotal < 500 && (

                <motion.p
                  className="delivery-note"
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
                >
                  Add ₹
                  {(500 - subtotal).toFixed(2)}
                  {" "}
                  more for free delivery 🎁
                </motion.p>

              )}


            <div className="summary-divider"></div>


            {/* TOTAL */}

            <motion.div
              className="summary-total"
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.6,
              }}
            >

              <span>
                Total
              </span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>

            </motion.div>


            {/* CHECKOUT */}

            <motion.button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
              whileHover={{
                scale: 1.03,
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >
              Proceed to Checkout →
            </motion.button>


            {/* CONTINUE SHOPPING */}

            <motion.button
              className="continue-btn"
              onClick={() =>
                navigate("/")
              }
              whileHover={{
                x: -5,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              ← Continue Shopping
            </motion.button>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Cart;