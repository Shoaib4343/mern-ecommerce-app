import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingCart, Star, Quote, Truck, RotateCcw, Shield, Headphones } from 'lucide-react';
import category_1 from "../assets/images/category (1).png"
import category_2 from "../assets/images/category (2).png"
import category_3 from "../assets/images/category (3).png"
import category_4 from "../assets/images/category (4).png"
import category_6 from "../assets/images/category (6).png"
import category_7 from "../assets/images/category (7).png"
import category_8 from "../assets/images/category (8).png"
import category_9 from "../assets/images/category (9).png"
import category_10 from "../assets/images/category (10).png"
import category_11 from "../assets/images/category (11).png"
import category_12 from "../assets/images/category (12).png"
import category_13 from "../assets/images/category (13).png"
import category_14 from "../assets/images/category (14).png"
import category_15 from "../assets/images/category (15).png"
import category_16 from "../assets/images/category (16).png"


const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentHero, setCurrentHero] = useState(0);

  // Hero slides with full background images
  const heroSlides = [
    {
      id: 1,
      badge: 'New Collection 2024',
      title: 'Minimalist Living',
      subtitle: 'Transform your space with carefully curated furniture designed for modern living',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop&auto=format',
      textPosition: 'left'
    },
    {
      id: 2,
      badge: 'Premium Quality',
      title: 'Scandinavian Design',
      subtitle: 'Experience timeless elegance with pieces that blend form and function',
      image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&h=1080&fit=crop&auto=format',
      textPosition: 'left'
    },
    {
      id: 3,
      badge: 'Best Sellers',
      title: 'Comfort Meets Style',
      subtitle: 'Discover furniture that elevates your everyday moments',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop&auto=format',
      textPosition: 'left'
    }
  ];

  // Dynamic grid categories
  const categories = [
    {
      id: 1,
      name: 'Living Room',
      count: '120+ Items',
      image: category_7,
      size: 'large' // Takes more space
    },
    {
      id: 2,
      name: 'Bedroom',
      count: '85+ Items',
     image: category_8,
      size: 'medium'
    },
    {
      id: 3,
      name: 'Office',
      count: '65+ Items',
     image: category_10,
      size: 'medium'
    },
    {
      id: 4,
      name: 'Dining',
      count: '45+ Items',
     image: category_15,
      size: 'medium'
    },
    {
      id: 5,
      name: 'Outdoor',
      count: '30+ Items',
     image: category_9,
      size: 'medium'
    }
  ];


  // Featured Products
  const featuredProducts = [
    {
      id: 1,
      name: 'Minimalist Desk Lamp',
      price: 122.00,
      oldPrice: 145.00,
      category: 'Lighting',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 2,
      name: 'Elegant Lounge Chair',
      price: 298.00,
      category: 'Furniture',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 3,
      name: 'Scandinavian Chair',
      price: 178.00,
      oldPrice: 215.00,
      category: 'Furniture',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 4,
      name: 'Modern Side Table',
      price: 104.00,
      category: 'Furniture',
      rating: 4.6,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop',
      inStock: true
    }
  ];

  // Trending Products
  const trendingProducts = [
    {
      id: 5,
      name: 'Wooden Cabinet',
      price: 386.00,
      category: 'Storage',
      rating: 4.8,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 6,
      name: 'Designer Sofa',
      price: 1254.00,
      category: 'Furniture',
      rating: 5.0,
      reviews: 43,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 7,
      name: 'Ceramic Vase Set',
      price: 89.00,
      category: 'Decor',
      rating: 4.5,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 8,
      name: 'Wall Mirror',
      price: 156.00,
      oldPrice: 189.00,
      category: 'Decor',
      rating: 4.7,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1618220924273-69b7c93b6d3d?w=500&h=600&fit=crop',
      inStock: true
    }
  ];

  // Sale Products
  const saleProducts = [
    {
      id: 9,
      name: 'Leather Ottoman',
      price: 198.00,
      oldPrice: 289.00,
      category: 'Furniture',
      rating: 4.6,
      reviews: 56,
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 10,
      name: 'Floor Lamp',
      price: 145.00,
      oldPrice: 198.00,
      category: 'Lighting',
      rating: 4.8,
      reviews: 102,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 11,
      name: 'Dining Chair Set',
      price: 456.00,
      oldPrice: 599.00,
      category: 'Furniture',
      rating: 4.9,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=600&fit=crop',
      inStock: true
    },
    {
      id: 12,
      name: 'Accent Table',
      price: 124.00,
      oldPrice: 168.00,
      category: 'Furniture',
      rating: 4.5,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&h=600&fit=crop',
      inStock: true
    }
  ];

  // Featured collections
  const collections = [
    {
      id: 1,
      title: 'Nordic Essentials',
      description: 'Curated pieces for minimalist homes',
      image: category_14,
      itemCount: 24
    },
    {
      id: 2,
      title: 'Modern Workspace',
      description: 'Elevate your productivity',
      image: category_10,
      itemCount: 18
    }
  ];

  // Benefits
  const benefits = [
    {
      icon: Truck,
      title: 'Fast & Free Shipping',
      description: 'Free shipping on all US order or order above $100'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Simply return it within 30 days for an exchange'
    },
    {
      icon: Shield,
      title: 'Money Back Guarantee',
      description: 'We ensure secure payment with PEV'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Contact us 24 hours a day, 7 days a week'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const ProductCard = ({ product }) => (
    <div className="group cursor-pointer bg-white border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all">
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white border border-gray-200 hover:bg-gray-900 hover:border-gray-900 hover:text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`}
            strokeWidth={1.5}
          />
        </button>

        {/* Discount Badge */}
        {product.oldPrice && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-gray-900 text-white text-xs font-medium">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          {product.category}
        </p>

        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-gray-900 text-gray-900'
                    : 'text-gray-300'
                }`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full background with overlay text */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-full">
                <div className="max-w-2xl space-y-8">
                  <div className="inline-block">
                    <span className="text-xs uppercase tracking-widest text-white/90 font-medium border border-white/40 px-4 py-2">
                      {slide.badge}
                    </span>
                  </div>
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-none">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/90 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>
                  <button className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 text-sm font-medium hover:bg-gray-100 transition-all">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHero(idx)}
                  className={`transition-all ${
                    idx === currentHero ? 'w-12 h-0.5 bg-white' : 'w-0.5 h-0.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Category Cards - Split Layout with Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
              Shop by Room
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect pieces for every space in your home
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Side - Large Card */}
            <div className="group relative bg-gray-50 overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="grid grid-cols-2 gap-0 items-center min-h-[416px]">
                {/* Left Side - Text */}
                <div className="p-8">
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-medium block mb-2">
                    {categories[0].count}
                  </span>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {categories[0].name}
                  </h3>
                  <button className="group-hover:gap-3 inline-flex items-center gap-2 text-sm font-medium text-gray-900 transition-all">
                    Shop Now
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Right Side - Image */}
                <div className="h-full">
                  <img
                    src={categories[0].image}
                    alt={categories[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - 2x2 Grid of Smaller Cards */}
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(1, 5).map((category) => (
                <div
                  key={category.id}
                  className="group relative bg-gray-50 overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="grid grid-cols-2 gap-0 items-center min-h-[200px]">
                    {/* Left Side - Text */}
                    <div className="p-6">
                      <span className="text-xs uppercase tracking-widest text-gray-500 font-medium block mb-2">
                        {category.count}
                      </span>
                      <h3 className="text-base font-semibold text-gray-900 mb-3">
                        {category.name}
                      </h3>
                      <button className="group-hover:gap-2 inline-flex items-center gap-1 text-xs font-medium text-gray-900 transition-all">
                        Shop
                        <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Right Side - Image */}
                    <div className="h-full">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-sm text-gray-600">Hand-picked favorites just for you</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    

      

      {/* Featured Collections - Two Card Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="grid grid-cols-3 gap-0 items-center">
                  {/* Left - Content */}
                  <div className="p-12 col-span-2">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-medium block mb-4">
                      Collection
                    </span>
                    <h3 className="text-3xl font-light text-gray-900 mb-4">
                      {collection.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-8">
                      {collection.itemCount} Items
                    </div>
                    <button className="group-hover:gap-3 inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 transition-all">
                      View Collection
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Right - Image */}
                  <div className="h-full">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
                Sale
              </h2>
              <p className="text-sm text-gray-600">Limited time offers on selected items</p>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-tight text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600">Experience the difference with our exceptional service</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-gray-200 mb-6 group-hover:border-gray-900 transition-colors">
                    <Icon className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;