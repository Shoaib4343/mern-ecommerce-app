import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/layout/MainLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/users/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import UserOrders from "./pages/users/UserOrders";
import UserWishlist from "./pages/users/UserWishList";
import UserAddresses from "./pages/users/UserAddresses";
import UserSettings from "./pages/users/UserSettings";
import Products from "./pages/admin/Products";
import ProductDetail from "./pages/admin/ProductDetail";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AddToCart from "./pages/AddToCart";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/add-to-cart" element={<AddToCart />} />


          {/* user protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<UserLayout />}> 
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishlist" element={<UserWishlist />} />
            <Route path="addresses" element={<UserAddresses />} />
            <Route path="settings" element={<UserSettings />} />
            </Route>
          </Route>

          {/* admin protected routes */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={ <AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="create-category" element={<CreateCategory />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="products" element={<Products />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="update-product/:id" element={<UpdateProduct />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
