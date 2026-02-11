import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSingleProductApi,
  getRelatedProductsApi,
} from "../services/product.api";
import { toast } from "react-hot-toast";
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  RotateCcw,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import ProductDetailsSkeleton from "../components/skeleton/ProductDetailsSkeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (product?._id) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getSingleProductApi(id);

      if (data.success) {
        setProduct(data.product);
      } else {
        toast.error("Product not found");
        navigate("/shop");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
      navigate("/shop");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Use backend API for related products
  const fetchRelatedProducts = async () => {
    try {
      setRelatedLoading(true);
      const { data } = await getRelatedProductsApi(product._id, 8);

      if (data.success) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      setRelatedProducts([]);
    } finally {
      setRelatedLoading(false);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < product.quantity) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const productImages = product
    ? [product.image, product.image, product.image].map(
        (img) => `${import.meta.env.VITE_API_URL}/image/${img}`,
      )
    : [];

if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) return null;

  const inStock = product.quantity > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery - ✅ FIXED: Height constraint + sticky positioning */}
          <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
            {/* Main Image */}
            <div className="relative w-full h-96 bg-gray-50 overflow-hidden group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {!inStock && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Image Navigation */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? productImages.length - 1 : prev - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white hover:bg-gray-900 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === productImages.length - 1 ? 0 : prev + 1,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white hover:bg-gray-900 hover:text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={` h-24 overflow-hidden border transition-colors ${
                    selectedImage === index
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:pt-2">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                    {product.category?.name || "Furniture"}
                  </p>
                  <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-9 h-9 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 cursor-pointer ${
                        isWishlisted ? "fill-gray-900 stroke-gray-900" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 border border-gray-200 hover:border-gray-900 cursor-pointer hover:bg-gray-50 flex items-center justify-center transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-gray-900 stroke-gray-900"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <p className="text-2xl font-medium text-gray-900">
                  ${product.price.toLocaleString()}
                </p>
                {product.oldPrice && (
                  <p className="text-lg text-gray-400 line-through">
                    ${product.oldPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  inStock ? "bg-gray-900" : "bg-gray-300"
                }`}
              />
              <span className="text-gray-600">
                {inStock
                  ? `${product.quantity} in stock`
                  : "Currently unavailable"}
              </span>
            </div>

            {/* Quantity, Price & Actions Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              {/* Quantity Selector with Live Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity === 1}
                    className="w-11 h-11 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-11 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    disabled={!inStock || quantity === product.quantity}
                    className="w-11 h-11 flex items-center cursor-pointer justify-center hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Live Total Price */}
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-xl font-medium text-gray-900">
                    ${(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action Buttons - Two in a row */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="flex-1 h-12 flex items-center justify-center gap-2 cursor-pointer border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400"
                >
                  <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                  <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
                </button>

                <button
                  disabled={!inStock}
                  className="flex-1 h-12 bg-gray-900 cursor-pointer text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features Grid - 3 columns, responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 pb-6 border-t border-gray-200">
              <div className="flex flex-col items-start gap-2">
                <Truck className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    On orders over $500
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2">
                <RotateCcw
                  className="w-5 h-5 text-gray-900"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    30-day return policy
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2">
                <Shield className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    2 Year Warranty
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Quality guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 lg:mt-24 border-gray-200">
          <div className="flex items-center gap-8 border-b border-gray-200">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium uppercase cursor-pointer tracking-wide transition-colors relative ${
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-900" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8 lg:py-12">
            {activeTab === "description" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Product Description
                </h3>
                <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                  <p>{product.description}</p>
                  <p>
                    This carefully crafted piece combines timeless design with
                    exceptional quality. Each item is made with attention to
                    detail and built to last, bringing both beauty and
                    functionality to your space.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "SKU", value: product._id?.slice(-8) || "N/A" },
                    {
                      label: "Category",
                      value: product.category?.name || "N/A",
                    },
                    {
                      label: "Availability",
                      value: inStock ? "In Stock" : "Out of Stock",
                    },
                    {
                      label: "Shipping",
                      value: product.shipping
                        ? "Free Shipping"
                        : "Standard Shipping",
                    },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-gray-200 text-sm"
                    >
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Customer Reviews
                  </h3>
                  <button className="text-sm font-medium text-gray-900 underline hover:no-underline">
                    Write a Review
                  </button>
                </div>

                {/* Average Rating */}
                <div className="flex items-start gap-12 py-6 border-y border-gray-200">
                  <div className="text-center">
                    <p className="text-4xl font-light text-gray-900 mb-2">
                      5.0
                    </p>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-gray-900 stroke-gray-900"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">24 reviews</p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-2">
                          {rating}
                        </span>
                        <Star
                          className="w-3 h-3 fill-gray-400 stroke-gray-400"
                          strokeWidth={1.5}
                        />
                        <div className="flex-1 h-1.5 bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-gray-900"
                            style={{ width: rating === 5 ? "100%" : "0%" }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-6">
                          {rating === 5 ? 24 : 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Review */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-gray-900 stroke-gray-900"
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        Sarah M.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Absolutely love this piece! The quality is exceptional and
                    it looks even better in person. Highly recommend.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-t-gray-200 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light tracking-wide">
                You May Also Like
              </h2>
              <button
                onClick={() => navigate("/shop")}
                className="text-sm text-gray-900 underline hover:no-underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {relatedLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct._id}
                    product={relatedProduct}
                    wishlist={[]} // Pass your actual wishlist state
                    toggleWishlist={(id) => {
                      // Pass your actual wishlist toggle function
                      console.log("Toggle wishlist for:", id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;



