import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

/* =====================================================
   CART PROVIDER
===================================================== */

export const CartProvider = ({ children }) => {

  /* ================= LOAD CART ================= */

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    } catch (error) {
      console.error(
        "Error loading cart:",
        error
      );

      return [];
    }
  });


  /* ================= SAVE CART ================= */

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);


  /* ================= ADD TO CART ================= */

  const addToCart = (product) => {

    setCart((currentCart) => {

      const existingProduct =
        currentCart.find(
          (item) =>
            item.id === product.id
        );


      /* Product already exists */

      if (existingProduct) {

        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,

                quantity:
                  (item.quantity || 1) + 1,
              }
            : item
        );
      }


      /* New product */

      return [
        ...currentCart,

        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };


  /* ================= REMOVE ================= */

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== id
      )
    );
  };


  /* ================= INCREASE ================= */

  const increaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,

              quantity:
                (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };


  /* ================= DECREASE ================= */

  const decreaseQuantity = (id) => {

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,

                quantity:
                  (item.quantity || 1) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };


  /* ================= CLEAR CART ================= */

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      "cart"
    );
  };


  /* ================= CART COUNT ================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total +
      (item.quantity || 1),
    0
  );


  /* ================= CART TOTAL ================= */

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        (item.quantity || 1),
    0
  );


  /* ================= PROVIDER ================= */

  return (
    <CartContext.Provider
      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        cartCount,

        cartTotal,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};


/* =====================================================
   USE CART HOOK
===================================================== */

export const useCart = () => {

  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};