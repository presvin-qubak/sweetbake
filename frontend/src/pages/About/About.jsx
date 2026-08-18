import React from "react";
import { motion } from "framer-motion";
import bakeryImage from "../../assets/bakery.avif";

import "./About.css";

function About() {
  /* ================= ANIMATIONS ================= */

  const featureVariants = {
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
        delay: index * 0.12,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="about-page">

      {/* ================= HERO ================= */}

      <motion.div
        className="about-hero"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >

        <motion.div
          className="about-hero-content"
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >

          {/* Welcome */}

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
            🍰 Welcome to SweetBake
          </motion.span>


          {/* Heading */}

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
              delay: 0.35,
              duration: 0.7,
            }}
          >
            Baking Happiness,
            <br />
            One Bite at a Time
          </motion.h1>


          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.6,
            }}
          >
            We create delicious cakes, cupcakes,
            cookies, and freshly baked treats made
            with love and the finest ingredients.
          </motion.p>

        </motion.div>

      </motion.div>


      {/* ================= STORY ================= */}

      <div className="about-container">

        <div className="about-story">

          {/* IMAGE */}

          <motion.div
            className="about-image"
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            <motion.img
              src={bakeryImage}
              alt="SweetBake Bakery"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                duration: 0.4,
              }}
            />

          </motion.div>


          {/* CONTENT */}

          <motion.div
            className="about-content"
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
            }}
          >

            <motion.span
              className="about-label"
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
            >
              Our Story
            </motion.span>


            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
              }}
            >
              Made With Love,
              <br />
              Served With Joy ❤️
            </motion.h2>


            <motion.p
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
                delay: 0.3,
              }}
            >
              SweetBake started with a simple dream —
              to bring freshly baked happiness to every
              customer.
            </motion.p>


            <motion.p
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
                delay: 0.4,
              }}
            >
              From classic cakes to delicious cupcakes
              and crunchy cookies, every treat is
              carefully prepared with quality ingredients,
              creativity, and plenty of love.
            </motion.p>


            <motion.p
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
                delay: 0.5,
              }}
            >
              Whether you're celebrating a birthday,
              enjoying a family gathering, or simply
              craving something sweet, SweetBake is here
              to make your moments special.
            </motion.p>

          </motion.div>

        </div>


        {/* ================= FEATURES ================= */}

        <div className="about-features">

          {[
            {
              icon: "🥛",
              title: "Fresh Ingredients",
              text:
                "We use carefully selected ingredients for delicious results.",
            },
            {
              icon: "👨‍🍳",
              title: "Made With Love",
              text:
                "Every product is prepared with care and attention to detail.",
            },
            {
              icon: "🎂",
              title: "Special Moments",
              text:
                "Sweet treats made to make your celebrations memorable.",
            },
            {
              icon: "❤️",
              title: "Happy Customers",
              text:
                "Your happiness is the sweetest part of what we do.",
            },
          ].map((feature, index) => (

            <motion.div
              className="about-feature"
              key={feature.title}
              custom={index}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >

              {/* ICON */}

              <motion.div
                className="feature-icon"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  rotate: -20,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                }}
              >
                {feature.icon}
              </motion.div>


              {/* TITLE */}

              <motion.h3
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12 + 0.3,
                }}
              >
                {feature.title}
              </motion.h3>


              {/* TEXT */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12 + 0.4,
                }}
              >
                {feature.text}
              </motion.p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default About;