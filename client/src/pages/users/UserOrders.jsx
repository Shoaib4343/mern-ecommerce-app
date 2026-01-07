import React, { useState } from 'react';
import { Search, Package, Eye, Download } from 'lucide-react';

const UserOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    { 
      id: '#ORD-001', 
      product: 'Minimal Tote Bag',
      quantity: 1,
      date: 'Jan 05, 2024',
      amount: '$89.00', 
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-002', 
      product: 'Classic White Shirt',
      quantity: 2,
      date: 'Jan 03, 2024',
      amount: '$90.00', 
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-003', 
      product: 'Leather Wallet',
      quantity: 1,
      date: 'Dec 28, 2023',
      amount: '$65.00', 
      status: 'Shipped',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-004', 
      product: 'Wool Blazer',
      quantity: 1,
      date: 'Dec 20, 2023',
      amount: '$189.00', 
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-005', 
      product: 'Canvas Sneakers',
      quantity: 1,
      date: 'Dec 15, 2023',
      amount: '$79.00', 
      status: 'Cancelled',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-700 bg-green-50 border border-green-200';
      case 'processing':
        return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'shipped':
        return 'text-purple-700 bg-purple-50 border border-purple-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">My Orders</h1>
        <p className="text-sm text-gray-600">Track and manage your orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Total Orders</p>
          <p className="text-2xl font-semibold text-gray-900">24</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Processing</p>
          <p className="text-2xl font-semibold text-blue-700">3</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Completed</p>
          <p className="text-2xl font-semibold text-green-700">19</p>
        </div>
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-2">Cancelled</p>
          <p className="text-2xl font-semibold text-red-700">2</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by order ID or product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200 bg-gray-50">
          <h2 className="text-base font-semibold text-gray-900">Order History</h2>
          <p className="text-xs text-gray-600 mt-1">View all your past and current orders</p>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Product Image & Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-20 h-20 bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{order.product}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="font-medium">{order.id}</span>
                      <span>•</span>
                      <span>Qty: {order.quantity}</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-left md:text-right">
                  <p className="text-xs text-gray-600 mb-1">Amount</p>
                  <p className="text-base font-semibold text-gray-900">{order.amount}</p>
                </div>

                {/* Status */}
                <div className="text-left md:text-center min-w-[120px]">
                  <p className="text-xs text-gray-600 mb-2">Status</p>
                  <span className={`px-3 py-1.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-200 hover:border-gray-300">
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-gray-200 hover:border-gray-300">
                    <Download className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">Showing 1 to 5 of 24 orders</p>
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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;