import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useAddToCart } from "../context/AddToCartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddToCart = () => {
  const {
    addToCart,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useAddToCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Handle quantity update
  const handleUpdateQuantity = (productId, newQuantity, maxQuantity) => {
    const result = updateQuantity(productId, newQuantity, maxQuantity);
    if (!result.success && result.message) {
      toast.error(result.message);
    }
  };

  // Remove item from cart
  const handleRemoveItem = (productId) => {
    const result = removeFromCart(productId);
    if (result.success) {
      toast.success(result.message);
    }
  };

  // Clear entire cart
  const handleClearCart = () => {
    const result = clearCart();
    if (result.success) {
      toast.success(result.message);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!auth.user) {
      toast.error("Please login to continue");
      navigate("/login", { state: { from: "/add-to-cart" } });
      return;
    }

    if (addToCart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // TODO: Navigate to checkout page
    toast.success("Proceeding to checkout...");
    // navigate("/checkout");
  };

  // Empty cart state
  if (addToCart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-400" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {addToCart.length} {addToCart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {addToCart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  updateQuantity={handleUpdateQuantity}
                  removeItem={handleRemoveItem}
                />
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={handleClearCart}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
              >
                Clear all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}
                  </span>
                </div>

                {subtotal > 0 && subtotal < 500 && (
                  <p className="text-xs text-gray-500 bg-white p-3 border border-gray-200">
                    Add ${(500 - subtotal).toLocaleString()} more to get free shipping
                  </p>
                )}

                <div className="pt-4 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-xl font-medium text-gray-900">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full h-12 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping Link */}
              <Link
                to="/shop"
                className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-300 space-y-3">
                <div className="flex items-start gap-3 text-xs text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></div>
                  <p>Free shipping on orders over $500</p>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></div>
                  <p>30-day easy returns</p>
                </div>
                <div className="flex items-start gap-3 text-xs text-gray-600">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5"></div>
                  <p>Secure checkout with encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, updateQuantity, removeItem }) => {
  const cartQuantity = item.cartQuantity || 1;

  return (
    <div className="flex gap-6 bg-white p-6 border border-gray-200 relative group">
      {/* Remove Button */}
      <button
        onClick={() => removeItem(item._id)}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        aria-label="Remove item"
      >
        <X className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Product Image */}
      <Link
        to={`/shop/${item._id}`}
        className="flex-shrink-0 w-32 h-32 bg-gray-50 overflow-hidden"
      >
        <img
          src={
            item.image
              ? `${import.meta.env.VITE_API_URL}/image/${item.image}`
              : "https://via.placeholder.com/300?text=No+Image"
          }
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/shop/${item._id}`}>
            <h3 className="text-base font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors line-clamp-2">
              {item.name}
            </h3>
          </Link>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
            {item.category?.name || "Uncategorized"}
          </p>

          {/* Stock Status */}
          {item.quantity < 5 && item.quantity > 0 && (
            <p className="text-xs text-orange-600 mb-2">
              Only {item.quantity} left in stock
            </p>
          )}
          {item.quantity === 0 && (
            <p className="text-xs text-red-600 mb-2">Out of stock</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-300">
            <button
              onClick={() => updateQuantity(item._id, cartQuantity - 1, item.quantity)}
              disabled={cartQuantity <= 1}
              className={`p-2 transition-colors ${
                cartQuantity <= 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" strokeWidth={1.5} />
            </button>

            <span className="px-4 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
              {cartQuantity}
            </span>

            <button
              onClick={() => updateQuantity(item._id, cartQuantity + 1, item.quantity)}
              disabled={cartQuantity >= item.quantity}
              className={`p-2 transition-colors ${
                cartQuantity >= item.quantity
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-base font-medium text-gray-900">
              ${(item.price * cartQuantity).toLocaleString()}
            </p>
            {cartQuantity > 1 && (
              <p className="text-xs text-gray-500">
                ${item.price.toLocaleString()} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;