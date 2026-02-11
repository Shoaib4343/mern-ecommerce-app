
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useAddToCart } from "../../context/AddToCartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product, wishlist, toggleWishlist }) => {
  const { addToCart, toggleCart, handleAddToCart } = useAddToCart();
  const navigate = useNavigate();

  const isWishlisted = wishlist?.includes(product._id);
  const isInCart = addToCart.some((item) => item._id === product._id);
  const inStock = product.quantity > 0;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  // TOGGLE behavior: Add if not in cart, Remove if already in cart
  const handleToggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) {
      toast.error("Product is out of stock");
      return;
    }

    const result = toggleCart(product);

    if (result.success) {
      if (result.action === "added") {
        toast.success(result.message);
      } else {
        toast.success(result.message);
      }
    }
  };

  // Buy Now still uses the original add behavior
  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!inStock) {
      toast.error("Product is out of stock");
      return;
    }

    const result = handleAddToCart(product);

    if (result.success) {
      navigate("/add-to-cart");
    } else {
      toast.error(result.message);
      navigate("/add-to-cart");
    }
  };

  return (
    <div className="group bg-white overflow-hidden transition-all">
      {/* Image Container - Clickable */}
      <Link to={`/shop/${product._id}`} className="block">
        <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
          <img
            src={
              product.image
                ? `${import.meta.env.VITE_API_URL}/image/${product.image}`
                : "https://via.placeholder.com/500x600?text=No+Image"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Quick Action Icons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* TOGGLE BUTTON - Click to add/remove */}
            <button
              onClick={handleToggleCart}
              disabled={!inStock}
              className={`w-9 h-9 transition-all flex items-center justify-center ${
                isInCart
                  ? "bg-gray-900 text-white opacity-0 group-hover:opacity-100"
                  : "bg-white hover:bg-gray-900 hover:text-white opacity-0 group-hover:opacity-100"
              } ${!inStock && "cursor-not-allowed opacity-50"}`}
              title={isInCart ? "Remove from cart" : "Add to cart"}
            >
              <ShoppingCart
                className={`w-4 h-4 ${isInCart ? "fill-current" : ""}`}
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={handleWishlistClick}
              className={`w-9 h-9 transition-all flex items-center justify-center ${
                isWishlisted
                  ? "bg-gray-900 text-white opacity-0 group-hover:opacity-100"
                  : "bg-white hover:bg-gray-900 hover:text-white opacity-0 group-hover:opacity-100"
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Discount Badge */}
          {product.oldPrice && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900 text-white text-xs font-medium tracking-wide">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-900 tracking-wide">
                OUT OF STOCK
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="pt-4 pb-3 space-y-2">
        {/* Category */}
        <p className="text-xs uppercase tracking-widest text-gray-500 font-light">
          {product.category?.name || "Uncategorized"}
        </p>

        {/* Title - Clickable */}
        <Link to={`/shop/${product._id}`}>
          <h3 className="text-sm font-normal text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-medium text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className={`w-full h-11 text-sm font-medium transition-all mt-3 ${
            inStock
              ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {inStock ? "Buy Now" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;