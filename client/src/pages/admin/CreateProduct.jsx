import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Eye, Package, TrendingUp, DollarSign, MoreVertical } from 'lucide-react';

const CreateProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { 
      id: 1, 
      name: 'Minimal Tote Bag', 
      category: 'Bags',
      price: '$89.00',
      stock: 45,
      sold: 234,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop'
    },
    { 
      id: 2, 
      name: 'Classic White Shirt', 
      category: 'Clothing',
      price: '$45.00',
      stock: 23,
      sold: 189,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop'
    },
    { 
      id: 3, 
      name: 'Leather Wallet', 
      category: 'Accessories',
      price: '$65.00',
      stock: 67,
      sold: 143,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop'
    },
    { 
      id: 4, 
      name: 'Wool Blazer', 
      category: 'Clothing',
      price: '$189.00',
      stock: 12,
      sold: 156,
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop'
    },
    { 
      id: 5, 
      name: 'Canvas Sneakers', 
      category: 'Shoes',
      price: '$79.00',
      stock: 89,
      sold: 128,
      status: 'Published',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop'
    },
    { 
      id: 6, 
      name: 'Leather Belt', 
      category: 'Accessories',
      price: '$35.00',
      stock: 0,
      sold: 98,
      status: 'Out of Stock',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=200&h=200&fit=crop'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'text-green-700 bg-green-50 border border-green-200';
      case 'draft':
        return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'out of stock':
        return 'text-red-700 bg-red-50 border border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-700';
    if (stock < 20) return 'text-orange-700';
    return 'text-gray-900';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Products Management</h1>
        <p className="text-sm text-gray-600">Manage your store products and inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 border border-gray-200">
              <Package className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Products</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">156</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 border border-green-200">
              <TrendingUp className="w-5 h-5 text-green-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Published</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">143</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-50 border border-red-200">
              <Package className="w-5 h-5 text-red-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Out of Stock</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">8</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all hover:shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 border border-purple-200">
              <DollarSign className="w-5 h-5 text-purple-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Value</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">$45,231</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search products by name, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white"
          >
            <option value="all">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
          </select>

          {/* Status Filter */}
          <select className="px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white">
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="outofstock">Out of Stock</option>
          </select>

          {/* Add Product Button */}
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sold</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((product) => (
                <tr key={product.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">{product.name}</p>
                        <p className="text-xs text-gray-600">SKU: PRD-{product.id}0{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-700">{product.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-sm font-medium ${getStockColor(product.stock)}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-gray-900">{product.sold}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                        <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-200">
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Showing 1 to 6 of 156 products</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Wool Blazer</span>
              <span className="text-sm font-medium text-red-700">12 left</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Classic White Shirt</span>
              <span className="text-sm font-medium text-orange-700">23 left</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Leather Wallet</span>
              <span className="text-sm font-medium text-orange-700">18 left</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Best Sellers</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Minimal Tote Bag</span>
              <span className="text-sm font-medium text-green-700">234 sold</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Classic White Shirt</span>
              <span className="text-sm font-medium text-green-700">189 sold</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Wool Blazer</span>
              <span className="text-sm font-medium text-green-700">156 sold</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Category</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Bags</span>
              <span className="text-sm font-medium text-gray-900">$20,826</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">Clothing</span>
              <span className="text-sm font-medium text-gray-900">$12,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Accessories</span>
              <span className="text-sm font-medium text-gray-900">$8,725</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

 