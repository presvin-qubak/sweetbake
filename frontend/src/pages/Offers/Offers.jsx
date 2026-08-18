import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Offers.css";

const offers = [
  {
    id: 1,
    title: "Sweet Weekend",
    discount: "20% OFF",
    description:
      "Get 20% off on selected cakes and pastries.",
    code: "SWEET20",
    emoji: "🎂",
  },
  {
    id: 2,
    title: "Cookie Combo",
    discount: "Buy 2 Get 1",
    description:
      "Buy any two cookie boxes and get one free.",
    code: "COOKIE3",
    emoji: "🍪",
  },
  {
    id: 3,
    title: "Fresh Morning",
    discount: "15% OFF",
    description:
      "Enjoy 15% off on fresh breads every morning.",
    code: "MORNING15",
    emoji: "🥐",
  },
];

function Offers() {
  const [copiedCode, setCopiedCode] = useState("");

  /* ================= COPY CODE ================= */

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode("");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
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
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      },
    }),

    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
  };

  return (
    <section className="offers-section">

      <div className="offers-container">

        {/* ================= HEADING ================= */}

        <motion.div
          className="offers-heading"
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

          {/* SPECIAL DEALS */}

          <motion.span
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
            ✨ Special Deals
          </motion.span>


          {/* TITLE */}

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
              delay: 0.3,
              duration: 0.6,
            }}
          >
            Sweet Offers For You
          </motion.h2>


          {/* DESCRIPTION */}

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
              duration: 0.5,
            }}
          >
            Treat yourself with our delicious bakery
            offers and special deals.
          </motion.p>

        </motion.div>


        {/* ================= OFFERS GRID ================= */}

        <motion.div
          className="offers-grid"
          initial="hidden"
          animate="visible"
        >

          <AnimatePresence>

            {offers.map((offer, index) => (

              <motion.div
                className="offer-card"
                key={offer.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"

                /* CARD HOVER */

                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}

                /* CARD CLICK */

                whileTap={{
                  scale: 0.98,
                }}

                layout
              >

                {/* ================= ICON ================= */}

                <motion.div
                  className="offer-icon"

                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: -20,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }}

                  transition={{
                    delay: 0.3 + index * 0.15,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}

                  whileHover={{
                    scale: 1.2,
                    rotate: 8,
                  }}
                >
                  {offer.emoji}
                </motion.div>


                {/* ================= CONTENT ================= */}

                <div className="offer-content">

                  {/* DISCOUNT */}

                  <motion.span
                    className="offer-discount"

                    initial={{
                      opacity: 0,
                      x: -20,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay: 0.45 + index * 0.15,
                    }}

                    whileHover={{
                      scale: 1.05,
                    }}
                  >
                    {offer.discount}
                  </motion.span>


                  {/* TITLE */}

                  <motion.h3
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}

                    animate={{
                      opacity: 1,
                      x: 0,
                    }}

                    transition={{
                      delay: 0.5 + index * 0.15,
                    }}
                  >
                    {offer.title}
                  </motion.h3>


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
                      delay: 0.55 + index * 0.15,
                    }}
                  >
                    {offer.description}
                  </motion.p>


                  {/* ================= CODE ================= */}

                  <motion.div
                    className="offer-code"

                    initial={{
                      opacity: 0,
                      y: 20,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay: 0.6 + index * 0.15,
                    }}
                  >

                    <span>
                      Code:{" "}
                      <strong>
                        {offer.code}
                      </strong>
                    </span>


                    {/* COPY BUTTON */}

                    <motion.button
                      onClick={() =>
                        handleCopy(offer.code)
                      }

                      whileHover={{
                        scale: 1.08,
                        y: -2,
                      }}

                      whileTap={{
                        scale: 0.9,
                      }}

                      transition={{
                        duration: 0.2,
                      }}
                    >
                      {copiedCode === offer.code
                        ? "Copied!"
                        : "Copy"}
                    </motion.button>

                  </motion.div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </motion.div>

      </div>

    </section>
  );
}

export default Offers;