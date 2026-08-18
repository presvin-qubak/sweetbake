import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaTruck,
  FaEye,
  FaShoppingBag,
} from "react-icons/fa";

import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();

  // ================= STATE =================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH ORDERS =================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        // Get JWT token
        const token = localStorage.getItem("token");

        // No token
        if (!token) {
          setError("Please login to view your orders.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // Backend error
        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders."
          );
        }

        // Save orders
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Fetch orders error:", error);

        setError(
          error.message || "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="orders-page">
        <div className="orders-empty">

          <div className="orders-empty-icon">
            <FaBoxOpen />
          </div>

          <h1>Loading Orders...</h1>

          <p>
            Please wait while we fetch your orders.
          </p>

        </div>
      </section>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <section className="orders-page">
        <div className="orders-empty">

          <div className="orders-empty-icon">
            <FaBoxOpen />
          </div>

          <h1>Unable to Load Orders</h1>

          <p>
            {error}
          </p>

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>
      </section>
    );
  }

  // ================= NO ORDERS =================

  if (orders.length === 0) {
    return (
      <section className="orders-page">

        <div className="orders-empty">

          <div className="orders-empty-icon">
            <FaBoxOpen />
          </div>

          <h1>
            No Orders Yet
          </h1>

          <p>
            You haven't placed any orders yet.
            Start exploring our delicious cakes!
          </p>

          <button
            onClick={() => navigate("/cakes")}
          >
            <FaShoppingBag />
            Start Shopping
          </button>

        </div>

      </section>
    );
  }

  // ================= ORDERS =================

  return (
    <section className="orders-page">

      <div className="orders-container">

        {/* ================= HEADER ================= */}

        <div className="orders-header">

          <p>
            YOUR ACCOUNT
          </p>

          <h1>
            My <span>Orders</span>
          </h1>

          <p>
            View and track your SweetBake orders.
          </p>

        </div>


        {/* ================= ORDERS LIST ================= */}

        <div className="orders-list">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.orderId}
            >

              {/* ================= ORDER HEADER ================= */}

              <div className="order-card-header">

                <div>

                  <span>
                    ORDER ID
                  </span>

                  <h2>
                    #{order.orderId}
                  </h2>

                </div>


                {/* STATUS */}

                <div className="order-status">

                  <FaTruck />

                  {order.status === "pending"
                    ? "Pending"
                    : order.status === "confirmed"
                    ? "Confirmed"
                    : order.status === "preparing"
                    ? "Preparing"
                    : order.status ===
                      "out_for_delivery"
                    ? "Out for Delivery"
                    : order.status === "delivered"
                    ? "Delivered"
                    : order.status === "cancelled"
                    ? "Cancelled"
                    : order.status}

                </div>

              </div>


              {/* ================= ITEMS ================= */}

              <div className="order-products">

                {order.items?.map((item, index) => (

                  <div
                    className="order-product"
                    key={`${order.orderId}-${item.productId}-${index}`}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    <div>

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
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}

                    </strong>

                  </div>

                ))}

              </div>


              {/* ================= FOOTER ================= */}

              <div className="order-card-footer">

                <div>

                  <span>
                    TOTAL
                  </span>

                  <strong>
                    ₹
                    {Number(order.total || 0).toFixed(2)}
                  </strong>

                </div>


                <button
                  onClick={() =>
                    navigate(
                      `/order-tracking/${order.orderId}`
                    )
                  }
                >

                  <FaEye />

                  Track Order

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* ================= MORE SHOPPING ================= */}

        <div className="orders-bottom">

          <button
            onClick={() => navigate("/cakes")}
          >

            <FaShoppingBag />

            Order More Cakes

          </button>

        </div>

      </div>

    </section>
  );
};

export default MyOrders;