import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaHome,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaTruck,
} from "react-icons/fa";

import toast from "react-hot-toast";

import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // ================= STATE =================

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= GET ORDER =================

  useEffect(() => {
    const getOrder = async () => {
      try {
        // Get saved order ID
        const orderId = localStorage.getItem(
          "sweetBakeOrderId"
        );

        // Get JWT
        const token = localStorage.getItem("token");

        if (!orderId) {
          setLoading(false);
          return;
        }

        if (!token) {
          toast.error(
            "Please login to view your order."
          );

          navigate("/login");

          return;
        }

        // ================= API =================

        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log(
          "Order response:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to get order."
          );
        }

        setOrder(data.order);

      } catch (error) {
        console.error(
          "Get order error:",
          error
        );

        toast.error(
          error.message ||
            "Unable to load order."
        );

      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [navigate]);

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="success-page">

        <div className="success-box">

          <h1>
            Loading Order... ⏳
          </h1>

          <p>
            Please wait while we get your
            order details.
          </p>

        </div>

      </section>
    );
  }

  // ================= NO ORDER =================

  if (!order) {
    return (
      <section className="success-page">

        <div className="success-box">

          <div className="success-icon">
            <FaShoppingBag />
          </div>

          <h1>
            No Order Found
          </h1>

          <p>
            We couldn't find your recent order.
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

  // ================= ORDER DATA =================

  const {
    orderId,
    customer = {},
    items = [],
    paymentMethod,
    subtotal = 0,
    delivery = 0,
    total = 0,
  } = order;

  // ================= CONTINUE SHOPPING =================

  const handleContinueShopping = () => {
    navigate("/");
  };

  // ================= TRACK ORDER =================

  const handleTrackOrder = () => {
    navigate(
      `/order-tracking/${orderId}`
    );
  };

  // ================= PAGE =================

  return (
    <section className="success-page">

      <div className="success-container">

        {/* ================= SUCCESS HEADER ================= */}

        <div className="success-header">

          <div className="success-icon">

            <FaCheckCircle />

          </div>

          <h1>
            Order Placed Successfully! 🎉
          </h1>

          <p>
            Thank you for ordering from SweetBake.
          </p>

          <span>
            Your delicious treats are on the way! 🍰
          </span>

        </div>

        {/* ================= ORDER ID ================= */}

        <div className="order-id-card">

          <p>
            ORDER ID
          </p>

          <h2>
            #{orderId}
          </h2>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="success-layout">

          {/* ================= LEFT ================= */}

          <div className="success-left">

            {/* ================= ADDRESS ================= */}

            <div className="success-card">

              <div className="success-card-title">

                <FaMapMarkerAlt />

                <h2>
                  Delivery Address
                </h2>

              </div>

              <div className="address-details">

                <strong>
                  {customer?.name}
                </strong>

                <p>
                  {customer?.address}
                </p>

                <p>
                  {customer?.city} -{" "}
                  {customer?.pincode}
                </p>

                <p>
                  📞 {customer?.phone}
                </p>

              </div>

            </div>

            {/* ================= ITEMS ================= */}

            <div className="success-card">

              <div className="success-card-title">

                <FaShoppingBag />

                <h2>
                  Your Items
                </h2>

              </div>

              <div className="success-items">

                {items.map((item, index) => (

                  <div
                    className="success-item"
                    key={
                      item.productId ||
                      item.id ||
                      index
                    }
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="success-item-info">

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
                        Number(
                          item.price || 0
                        ) *
                        Number(
                          item.quantity || 1
                        )
                      ).toFixed(2)}

                    </strong>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="success-right">

            <div className="success-summary">

              <h2>
                Order Summary
              </h2>

              {/* SUBTOTAL */}

              <div className="summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹
                  {Number(
                    subtotal
                  ).toFixed(2)}
                </strong>

              </div>

              {/* DELIVERY */}

              <div className="summary-row">

                <span>
                  Delivery
                </span>

                <strong>

                  {Number(delivery) === 0
                    ? "FREE"
                    : `₹${Number(
                        delivery
                      ).toFixed(2)}`}

                </strong>

              </div>

              <div className="summary-divider"></div>

              {/* TOTAL */}

              <div className="success-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {Number(
                    total
                  ).toFixed(2)}
                </strong>

              </div>

              {/* PAYMENT */}

              <div className="payment-info">

                <p>
                  PAYMENT METHOD
                </p>

                <strong>

                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "upi"
                    ? "UPI Payment"
                    : "Credit / Debit Card"}

                </strong>

              </div>

              {/* DELIVERY */}

              <div className="delivery-time">

                <span>
                  🚚 Estimated Delivery
                </span>

                <strong>
                  30–45 Minutes
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}

        <div className="success-actions">

          {/* TRACK */}

          <button
            className="track-btn"
            onClick={handleTrackOrder}
          >

            <FaTruck />

            Track Order

          </button>

          {/* HOME */}

          <button
            className="home-btn"
            onClick={
              handleContinueShopping
            }
          >

            <FaHome />

            Continue Shopping

          </button>

          {/* CAKES */}

          <button
            className="cakes-btn"
            onClick={() =>
              navigate("/cakes")
            }
          >

            <FaShoppingBag />

            Order More Cakes

          </button>

        </div>

      </div>

    </section>
  );
};

export default OrderSuccess;