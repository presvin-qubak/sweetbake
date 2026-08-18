import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { WishlistProvider } from "./context/WishlistContext";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Cakes from "./pages/Cakes/Cakes";
import Cupcakes from "./pages/Cupcakes/Cupcakes";
import Cookies from "./pages/Cookies/Cookies";
import Wishlist from "./pages/Wishlist/Wishlist";
import Offers from "./pages/Offers/Offers";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import MyOrders from "./pages/MyOrders/MyOrders";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Signup from "./pages/Signup/Signup";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BackToTop from "./components/BackToTop/BackToTop";

function App() {
  return (
    <BrowserRouter>

      {/* ================= TOAST ================= */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <ScrollToTop />

      <WishlistProvider>

        <Navbar />

        <main>

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* CATEGORIES */}
            <Route
              path="/cakes"
              element={<Cakes />}
            />

            <Route
              path="/cupcakes"
              element={<Cupcakes />}
            />

            <Route
              path="/cookies"
              element={<Cookies />}
            />

            {/* OFFERS */}
            <Route
              path="/offers"
              element={<Offers />}
            />

            {/* OTHER PAGES */}
            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* USER PAGES */}
            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            {/* CHECKOUT */}
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* ORDERS */}
            <Route
              path="/order-success"
              element={<OrderSuccess />}
            />

            <Route
              path="/order-tracking"
              element={<OrderTracking />}
            />

            <Route
              path="/orders"
              element={<MyOrders />}
            />

            {/* PASSWORD */}
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

          </Routes>

          <Footer />

          <BackToTop />

        </main>

      </WishlistProvider>

    </BrowserRouter>
  );
}

export default App;