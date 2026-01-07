import React from 'react';
import { Package, Clock, CheckCircle, XCircle, ArrowRight, ShoppingBag, Heart, MapPin } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      label: 'Total Orders',
      value: '24',
      icon: Package,
      color: 'gray'
    },
    {
      label: 'Pending Orders',
      value: '3',
      icon: Clock,
      color: 'blue'
    },
    {
      label: 'Completed',
      value: '19',
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Cancelled',
      value: '2',
      icon: XCircle,
      color: 'red'
    }
  ];

  const recentOrders = [
    { 
      id: '#ORD-001', 
      product: 'Minimal Tote Bag', 
      date: 'Jan 05, 2024',
      amount: '$89.00', 
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-002', 
      product: 'Classic White Shirt', 
      date: 'Jan 03, 2024',
      amount: '$45.00', 
      status: 'Processing',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop'
    },
    { 
      id: '#ORD-003', 
      product: 'Leather Wallet', 
      date: 'Dec 28, 2023',
      amount: '$65.00', 
      status: 'Shipped',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop'
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

  const getIconColor = (color) => {
    const colors = {
      gray: 'bg-gray-100 border-gray-200 text-gray-900',
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      red: 'bg-red-50 border-red-200 text-red-700'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Welcome Back!</h1>
        <p className="text-sm text-gray-600">Here's an overview of your account</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 border ${getIconColor(stat.color)}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">{stat.label}</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-xs text-gray-600 mt-1">Your latest purchases</p>
            </div>
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors inline-flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          
          <div className="p-5">
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 hover:bg-gray-50 p-3 -m-3 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{order.product}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{order.id}</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{order.amount}</p>
                    <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              View all orders →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Account Info Card */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Account Info</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="text-sm font-medium text-gray-900">Jan 2024</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Spent</span>
                <span className="text-sm font-medium text-gray-900">$1,247.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Wishlist Items</span>
                <span className="text-sm font-medium text-gray-900">8</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                <span>Continue Shopping</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                <span>View Wishlist</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span>Manage Addresses</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;