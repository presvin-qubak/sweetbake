import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";

import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  // ================= STATE =================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [loading, setLoading] = useState(false);

  // ================= PRICE =================

  const delivery =
    cartTotal >= 500 ? 0 : 50;

  const total =
    cartTotal + delivery;

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ================= PLACE ORDER =================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Prevent double click
    if (loading) return;

    // ================= TOKEN =================

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login before placing an order.");

      navigate("/login");

      return;
    }

    // ================= BASIC VALIDATION =================

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }

    if (!formData.pincode.trim()) {
      toast.error("Please enter your pincode.");
      return;
    }

    try {
      setLoading(true);

      // ================= ORDER DATA =================

      const orderData = {
        customer: formData,

        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),

        paymentMethod,

        subtotal: Number(cartTotal),

        delivery: Number(delivery),

        total: Number(total),
      };

      console.log("Sending order:", orderData);

      // ================= API REQUEST =================

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      // ================= RESPONSE =================

      const data = await response.json();

      console.log("Server response:", data);

      // ================= ERROR =================

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order."
        );
      }

      // ================= SUCCESS =================

      toast.success(
        "Order placed successfully! 🎉"
      );

      // Clear cart
      clearCart();

      // Save returned order temporarily
      localStorage.setItem(
        "sweetBakeOrder",
        JSON.stringify(data.order)
      );

      // Go to success page
      navigate("/order-success");

    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      toast.error(
        error.message ||
          "Something went wrong while placing your order."
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= EMPTY CART =================

  if (cart.length === 0) {
    return (
      <section className="checkout-empty">

        <div className="checkout-empty-box">

          <FaShoppingBag />

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Add some delicious cakes before
            checking out.
          </p>

          <button
            onClick={() =>
              navigate("/cakes")
            }
          >
            Browse Cakes 🍰
          </button>

        </div>

      </section>
    );
  }

  // ================= UI =================

  return (
    <section className="checkout-page">

      <div className="checkout-container">

        {/* ================= HEADER ================= */}

        <div className="checkout-header">

          <button
            type="button"
            className="back-btn"
            onClick={() =>
              navigate("/cart")
            }
          >
            <FaArrowLeft />

            Back to Cart
          </button>

          <p>
            SECURE CHECKOUT
          </p>

          <h1>
            Complete Your Order 🍰
          </h1>

        </div>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handlePlaceOrder}
          className="checkout-form"
        >

          <div className="checkout-layout">

            {/* ================= LEFT ================= */}

            <div className="checkout-left">

              {/* ================= DELIVERY ADDRESS ================= */}

              <div className="checkout-card">

                <div className="checkout-title">

                  <FaMapMarkerAlt />

                  <div>

                    <h2>
                      Delivery Address
                    </h2>

                    <p>
                      Where should we deliver
                      your delicious treats?
                    </p>

                  </div>

                </div>

                <div className="checkout-grid">

                  {/* NAME */}

                  <div className="form-group">

                    <label htmlFor="name">
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />

                  </div>

                  {/* PHONE */}

                  <div className="form-group">

                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />

                  </div>

                  {/* ADDRESS */}

                  <div className="form-group full">

                    <label htmlFor="address">
                      Delivery Address
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      placeholder="House no, street, area..."
                      value={formData.address}
                      onChange={handleChange}
                      rows="4"
                      autoComplete="street-address"
                      required
                    />

                  </div>

                  {/* CITY */}

                  <div className="form-group">

                    <label htmlFor="city">
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      required
                    />

                  </div>

                  {/* PINCODE */}

                  <div className="form-group">

                    <label htmlFor="pincode">
                      Pincode
                    </label>

                    <input
                      id="pincode"
                      type="text"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoComplete="postal-code"
                      required
                    />

                  </div>

                </div>

              </div>

              {/* ================= PAYMENT ================= */}

              <div className="checkout-card">

                <div className="checkout-title">

                  <FaCreditCard />

                  <div>

                    <h2>
                      Payment Method
                    </h2>

                    <p>
                      Select your preferred
                      payment method.
                    </p>

                  </div>

                </div>

                {/* COD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "cod"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={
                      paymentMethod === "cod"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div className="payment-content">

                    <strong>
                      Cash on Delivery
                    </strong>

                    <span>
                      Pay when your order arrives
                    </span>

                  </div>

                </label>

                {/* UPI */}

                <label
                  className={`payment-option ${
                    paymentMethod === "upi"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={
                      paymentMethod === "upi"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div className="payment-content">

                    <strong>
                      UPI Payment
                    </strong>

                    <span>
                      Google Pay / PhonePe / Paytm
                    </span>

                  </div>

                </label>

                {/* CARD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "card"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <div className="payment-content">

                    <strong>
                      Credit / Debit Card
                    </strong>

                    <span>
                      Visa / Mastercard / RuPay
                    </span>

                  </div>

                </label>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className="checkout-right">

              <div className="checkout-summary">

                <h2>
                  Order Summary
                </h2>

                {/* PRODUCTS */}

                <div className="checkout-items">

                  {cart.map((item) => (

                    <div
                      className="checkout-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="checkout-item-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <strong>
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </strong>

                    </div>

                  ))}

                </div>

                <div className="checkout-divider" />

                {/* SUBTOTAL */}

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ₹{cartTotal.toFixed(2)}
                  </strong>

                </div>

                {/* DELIVERY */}

                <div className="summary-row">

                  <span>
                    Delivery
                  </span>

                  <strong>
                    {delivery === 0
                      ? "FREE"
                      : `₹${delivery}`}
                  </strong>

                </div>

                <div className="checkout-divider" />

                {/* TOTAL */}

                <div className="checkout-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{total.toFixed(2)}
                  </strong>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : "Place Order 🎂"}
                </button>

                <p className="secure-text">
                  🔒 Your information is secure
                </p>

              </div>

            </div>

          </div>

        </form>

      </div>

    </section>
  );
};

export default Checkout;