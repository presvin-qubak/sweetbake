import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaBirthdayCake,
  FaTruck,
  FaHome,
  FaArrowLeft,
  FaTimesCircle,
} from "react-icons/fa";

import toast from "react-hot-toast";

import "./OrderTracking.css";

const OrderTracking = () => {
  const navigate = useNavigate();

  // ==================================================
  // STATE
  // ==================================================

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ==================================================
  // GET ORDER
  // ==================================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // ================= TOKEN =================

        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login to track your order.");

          navigate("/login");

          return;
        }


        // ================= GET SAVED ORDER =================

        const savedOrder = localStorage.getItem(
          "sweetBakeOrder"
        );

        if (!savedOrder) {
          setError("No order found.");
          setLoading(false);
          return;
        }


        const localOrder = JSON.parse(savedOrder);

        const orderId = localOrder?.orderId;


        if (!orderId) {
          setError("Order ID not found.");
          setLoading(false);
          return;
        }


        console.log(
          "Fetching order:",
          orderId
        );


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
          "ORDER RESPONSE:",
          data
        );


        // ================= API ERROR =================

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Failed to load order."
          );
        }


        // ================= SET ORDER =================

        setOrder(data.order);


        // Update localStorage with latest MongoDB data
        localStorage.setItem(
          "sweetBakeOrder",
          JSON.stringify(data.order)
        );

      } catch (error) {
        console.error(
          "Fetch order error:",
          error
        );

        setError(
          error.message ||
          "Failed to load order."
        );

        toast.error(
          error.message ||
          "Failed to load order."
        );

      } finally {
        setLoading(false);
      }
    };


    fetchOrder();

  }, [navigate]);


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <section className="tracking-page">

        <div className="tracking-empty">

          <div className="tracking-empty-icon">
            <FaTruck />
          </div>

          <h1>
            Loading Order...
          </h1>

          <p>
            Please wait while we get your
            latest order status.
          </p>

        </div>

      </section>
    );
  }


  // ==================================================
  // ERROR / NO ORDER
  // ==================================================

  if (error || !order) {
    return (
      <section className="tracking-page">

        <div className="tracking-empty">

          <div className="tracking-empty-icon">
            <FaTimesCircle />
          </div>

          <h1>
            No Order Found
          </h1>

          <p>
            {error ||
              "Please place an order first to track it."}
          </p>

          <button
            onClick={() => navigate("/cakes")}
          >
            Browse Cakes 🍰
          </button>

        </div>

      </section>
    );
  }


  // ==================================================
  // ORDER STATUS
  // ==================================================

  const status = order.status || "pending";


  // ==================================================
  // STATUS HELPERS
  // ==================================================

  const statusSteps = [
    {
      key: "pending",
      title: "Order Placed",
      description:
        "Your order has been successfully received.",
      icon: <FaCheckCircle />,
    },

    {
      key: "confirmed",
      title: "Order Confirmed",
      description:
        "Your order has been confirmed by SweetBake.",
      icon: <FaCheckCircle />,
    },

    {
      key: "preparing",
      title: "Preparing Your Order",
      description:
        "Our bakers are preparing your cakes and treats.",
      icon: <FaBirthdayCake />,
    },

    {
      key: "out_for_delivery",
      title: "Out for Delivery",
      description:
        "Your order is on the way to your address.",
      icon: <FaTruck />,
    },

    {
      key: "delivered",
      title: "Delivered",
      description:
        "Enjoy your delicious SweetBake order! 🎂",
      icon: <FaHome />,
    },
  ];


  const getStatusIndex = () => {
    const index = statusSteps.findIndex(
      (step) => step.key === status
    );

    return index === -1 ? 0 : index;
  };


  const currentIndex = getStatusIndex();


  // ==================================================
  // CURRENT STATUS TEXT
  // ==================================================

  const getCurrentStatus = () => {
    switch (status) {

      case "pending":
        return {
          title: "Order received",
          message:
            "Your order has been successfully received.",
          icon: <FaCheckCircle />,
        };

      case "confirmed":
        return {
          title: "Order confirmed",
          message:
            "SweetBake has confirmed your order.",
          icon: <FaCheckCircle />,
        };

      case "preparing":
        return {
          title: "Your order is being prepared",
          message:
            "Our bakers are preparing your delicious treats with love ❤️",
          icon: <FaBirthdayCake />,
        };

      case "out_for_delivery":
        return {
          title: "Your order is out for delivery",
          message:
            "Your delicious treats are on the way! 🚚",
          icon: <FaTruck />,
        };

      case "delivered":
        return {
          title: "Order delivered",
          message:
            "Enjoy your delicious SweetBake order! 🎂",
          icon: <FaHome />,
        };

      case "cancelled":
        return {
          title: "Order cancelled",
          message:
            "Unfortunately, this order has been cancelled.",
          icon: <FaTimesCircle />,
        };

      default:
        return {
          title: "Order received",
          message:
            "Your order has been received.",
          icon: <FaCheckCircle />,
        };
    }
  };


  const currentStatus = getCurrentStatus();


  // ==================================================
  // PAGE
  // ==================================================

  return (
    <section className="tracking-page">

      <div className="tracking-container">


        {/* ================= BACK ================= */}

        <button
          className="tracking-back"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          Back to Home
        </button>


        {/* ================= HEADER ================= */}

        <div className="tracking-header">

          <div className="tracking-main-icon">
            <FaTruck />
          </div>

          <p>
            ORDER TRACKING
          </p>

          <h1>
            Track Your Order 🚚
          </h1>

          <span>
            Order #{order.orderId}
          </span>

        </div>


        {/* ================= CURRENT STATUS ================= */}

        <div className="current-status">

          <div className="status-icon">
            {currentStatus.icon}
          </div>

          <div>

            <strong>
              {currentStatus.title}
            </strong>

            <p>
              {currentStatus.message}
            </p>

          </div>

        </div>


        {/* ================= TIMELINE ================= */}

        <div className="tracking-card">

          <h2>
            Order Status
          </h2>


          <div className="timeline">

            {statusSteps.map(
              (step, index) => {

                const completed =
                  index <= currentIndex;

                const active =
                  index === currentIndex;


                return (
                  <div
                    className={`timeline-item ${
                      completed
                        ? "completed"
                        : ""
                    } ${
                      active
                        ? "active"
                        : ""
                    }`}
                    key={step.key}
                  >

                    {/* ICON */}

                    <div className="timeline-icon">

                      {step.icon}

                    </div>


                    {/* CONTENT */}

                    <div className="timeline-content">

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>


                      <span>

                        {active
                          ? "🔥 In Progress"
                          : completed
                          ? "✓ Completed"
                          : "Waiting"}

                      </span>

                    </div>

                  </div>
                );
              }
            )}


            {/* ================= CANCELLED ================= */}

            {status === "cancelled" && (

              <div className="timeline-item cancelled">

                <div className="timeline-icon">

                  <FaTimesCircle />

                </div>

                <div className="timeline-content">

                  <h3>
                    Order Cancelled
                  </h3>

                  <p>
                    This order has been cancelled.
                  </p>

                  <span>
                    Cancelled
                  </span>

                </div>

              </div>

            )}

          </div>

        </div>


        {/* ================= ORDER INFORMATION ================= */}

        <div className="tracking-info">


          <div className="info-card">

            <p>
              ORDER ID
            </p>

            <strong>
              #{order.orderId}
            </strong>

          </div>


          <div className="info-card">

            <p>
              ITEMS
            </p>

            <strong>
              {order.items?.length || 0}
            </strong>

          </div>


          <div className="info-card">

            <p>
              TOTAL
            </p>

            <strong>
              ₹
              {Number(
                order.total || 0
              ).toFixed(2)}
            </strong>

          </div>


          <div className="info-card">

            <p>
              DELIVERY
            </p>

            <strong>
              {status === "delivered"
                ? "Delivered"
                : "30–45 min"}
            </strong>

          </div>

        </div>


        {/* ================= DELIVERY ADDRESS ================= */}

        <div className="delivery-card">

          <h2>
            Delivery Address
          </h2>

          <strong>
            {order.customer?.name}
          </strong>

          <p>
            {order.customer?.address}
          </p>

          <p>
            {order.customer?.city} -{" "}
            {order.customer?.pincode}
          </p>

          <p>
            📞 {order.customer?.phone}
          </p>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="tracking-buttons">

          <button
            onClick={() => navigate("/")}
          >
            <FaHome />
            Home
          </button>


          <button
            onClick={() =>
              navigate("/cakes")
            }
          >
            <FaBirthdayCake />
            Order More Cakes
          </button>

        </div>

      </div>

    </section>
  );
};

export default OrderTracking;