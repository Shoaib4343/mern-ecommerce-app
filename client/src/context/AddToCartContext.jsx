
import { createContext, useContext, useState, useEffect } from "react";

export const AddToCartContext = createContext(null);

export const AddToCartContextProvider = ({ children }) => {
  /* ===============================
     1️⃣ Initialize Cart from localStorage
  =============================== */
  const [addToCart, setAddToCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  /* ===============================
     2️⃣ Save Cart to localStorage
  =============================== */
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(addToCart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [addToCart]);

  /* ===============================
     3️⃣ Derived Values (NO extra state)
  =============================== */
  const itemAmount = addToCart.reduce(
    (acc, item) => acc + item.cartQuantity,
    0
  );

  const subtotal = addToCart.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );

  const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 50) : 0;

  const total = subtotal + shipping;

  /* ===============================
     4️⃣ Cart Operations
  =============================== */

  // Add to Cart (with stock validation) - Increases quantity if already exists
  const handleAddToCart = (product) => {
    const existing = addToCart.find((item) => item._id === product._id);

    if (existing) {
      const newQuantity = existing.cartQuantity + 1;

      if (newQuantity > product.quantity) {
        return {
          success: false,
          message: `Only ${product.quantity} items available in stock`,
        };
      }

      setAddToCart((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, cartQuantity: newQuantity }
            : item
        )
      );

      return {
        success: true,
        message: "Quantity updated in cart",
      };
    } else {
      setAddToCart((prev) => [...prev, { ...product, cartQuantity: 1 }]);
      return {
        success: true,
        message: "Added to cart",
      };
    }
  };

  // Toggle Cart - Add if not exists, Remove if exists
  const toggleCart = (product) => {
    const existing = addToCart.find((item) => item._id === product._id);

    if (existing) {
      // Remove from cart
      setAddToCart((prev) => prev.filter((item) => item._id !== product._id));
      return {
        success: true,
        message: "Removed from cart",
        action: "removed",
      };
    } else {
      // Add to cart
      setAddToCart((prev) => [...prev, { ...product, cartQuantity: 1 }]);
      return {
        success: true,
        message: "Added to cart",
        action: "added",
      };
    }
  };

  // Increase Quantity (with stock validation)
  const incrementQuantity = (id, maxQuantity) => {
    const item = addToCart.find((item) => item._id === id);

    if (!item) return { success: false, message: "Item not found" };

    const newQuantity = item.cartQuantity + 1;

    if (newQuantity > maxQuantity) {
      return {
        success: false,
        message: `Only ${maxQuantity} items available in stock`,
      };
    }

    setAddToCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, cartQuantity: newQuantity } : item
      )
    );

    return { success: true };
  };

  // Decrease Quantity
  const decrementQuantity = (id) => {
    setAddToCart((prev) =>
      prev
        .map((item) =>
          item._id === id && item.cartQuantity > 1
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  // Update Quantity Directly (with validation)
  const updateQuantity = (id, newQuantity, maxQuantity) => {
    if (newQuantity < 1) return { success: false };

    if (newQuantity > maxQuantity) {
      return {
        success: false,
        message: `Only ${maxQuantity} items available in stock`,
      };
    }

    setAddToCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, cartQuantity: newQuantity } : item
      )
    );

    return { success: true };
  };

  // Remove Item Completely
  const removeFromCart = (id) => {
    setAddToCart((prev) => prev.filter((item) => item._id !== id));
    return { success: true, message: "Item removed from cart" };
  };

  // Clear Cart
  const clearCart = () => {
    setAddToCart([]);
    return { success: true, message: "Cart cleared" };
  };

  /* ===============================
     5️⃣ Provider
  =============================== */
  return (
    <AddToCartContext.Provider
      value={{
        addToCart,
        setAddToCart,
        itemAmount,
        subtotal,
        shipping,
        total,
        handleAddToCart,
        toggleCart, // NEW: Toggle function
        incrementQuantity,
        decrementQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AddToCartContext.Provider>
  );
};

/* ===============================
   6️⃣ Custom Hook
=============================== */
export const useAddToCart = () => {
  const context = useContext(AddToCartContext);
  if (!context) {
    throw new Error(
      "useAddToCart must be used inside AddToCartContextProvider"
    );
  }
  return context;
};