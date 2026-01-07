import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react';

const UserWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Minimal Tote Bag',
      price: '$89.00',
      category: 'Bags',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Classic White Shirt',
      price: '$45.00',
      category: 'Clothing',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Leather Wallet',
      price: '$65.00',
      category: 'Accessories',
      inStock: false,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Wool Blazer',
      price: '$189.00',
      category: 'Clothing',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Canvas Sneakers',
      price: '$79.00',
      category: 'Shoes',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Leather Belt',
      price: '$35.00',
      category: 'Accessories',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=300&h=300&fit=crop'
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-sm text-gray-600">Save your favorite items for later</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 border border-gray-200">
              <Heart className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Items</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{wishlistItems.length}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 border border-green-200">
              <ShoppingCart className="w-5 h-5 text-green-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">In Stock</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {wishlistItems.filter(item => item.inStock).length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 border border-purple-200">
              <Heart className="w-5 h-5 text-purple-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Value</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">$502.00</p>
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-sm text-gray-600 mb-6">Start adding items you love!</p>
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 overflow-hidden group hover:border-gray-300 hover:shadow-sm transition-all">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-all opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
                {!item.inStock && (
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs text-gray-600 mb-2">{item.category}</p>
                <h3 className="text-base font-semibold text-gray-900 mb-3">{item.name}</h3>
                <p className="text-lg font-semibold text-gray-900 mb-4">{item.price}</p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    disabled={!item.inStock}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all inline-flex items-center justify-center gap-2 ${
                      item.inStock
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2.5 border border-gray-200 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserWishlist;