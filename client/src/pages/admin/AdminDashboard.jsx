// import React from 'react';
// import { Package, Users, ShoppingCart, TrendingUp, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// const AdminDashboard = () => {
//   const stats = [
//     {
//       label: 'Total Revenue',
//       value: '$45,231',
//       change: '+12.5%',
//       icon: DollarSign,
//       trend: 'up'
//     },
//     {
//       label: 'Total Orders',
//       value: '1,234',
//       change: '+8.2%',
//       icon: ShoppingCart,
//       trend: 'up'
//     },
//     {
//       label: 'Total Products',
//       value: '156',
//       change: '+3',
//       icon: Package,
//       trend: 'up'
//     },
//     {
//       label: 'Total Users',
//       value: '2,847',
//       change: '+15.3%',
//       icon: Users,
//       trend: 'up'
//     }
//   ];

//   const recentOrders = [
//     { id: '#ORD-001', customer: 'John Smith', product: 'Minimal Tote Bag', amount: '$89.00', status: 'Delivered' },
//     { id: '#ORD-002', customer: 'Sarah Johnson', product: 'Classic White Shirt', amount: '$45.00', status: 'Processing' },
//     { id: '#ORD-003', customer: 'Michael Brown', product: 'Leather Wallet', amount: '$65.00', status: 'Shipped' },
//     { id: '#ORD-004', customer: 'Emily Davis', product: 'Wool Blazer', amount: '$189.00', status: 'Delivered' },
//     { id: '#ORD-005', customer: 'David Wilson', product: 'Canvas Sneakers', amount: '$79.00', status: 'Processing' }
//   ];

//   const topProducts = [
//     { name: 'Minimal Tote Bag', sales: 234, revenue: '$20,826' },
//     { name: 'Classic White Shirt', sales: 189, revenue: '$8,505' },
//     { name: 'Wool Blazer', sales: 156, revenue: '$29,484' },
//     { name: 'Leather Wallet', sales: 143, revenue: '$9,295' },
//     { name: 'Canvas Sneakers', sales: 128, revenue: '$10,112' }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'text-gray-900 bg-gray-100';
//       case 'processing':
//         return 'text-gray-600 bg-gray-50';
//       case 'shipped':
//         return 'text-gray-700 bg-gray-100';
//       default:
//         return 'text-gray-600 bg-gray-50';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-1">Dashboard</h1>
//         <p className="text-sm text-gray-600">Welcome back, here's what's happening with your store</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           const isPositive = stat.trend === 'up';
//           return (
//             <div key={index} className="border border-gray-200 p-4 transition-colors hover:border-gray-300">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="p-2 bg-white border border-gray-200">
//                   <Icon className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {isPositive ? (
//                     <ArrowUpRight className="w-3 h-3 text-gray-900" strokeWidth={1.5} />
//                   ) : (
//                     <ArrowDownRight className="w-3 h-3 text-gray-600" strokeWidth={1.5} />
//                   )}
//                   <span className="text-xs text-gray-900">{stat.change}</span>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
//               <p className="text-xl font-medium text-gray-900">{stat.value}</p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Recent Orders */}
//         <div className="lg:col-span-2 border border-gray-200">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-sm font-medium text-gray-900">Recent Orders</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-gray-200 bg-white">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {recentOrders.map((order, index) => (
//                   <tr key={index} className="transition-colors hover:bg-gray-50">
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.id}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.customer}</td>
//                     <td className="px-4 py-3 text-xs text-gray-600">{order.product}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.amount}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs">
//                       <button className="text-gray-600 hover:text-gray-900 transition-colors">
//                         <Eye className="w-4 h-4" strokeWidth={1.5} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="p-3 border-t border-gray-200 text-center">
//             <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
//               View all orders
//             </button>
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="border border-gray-200">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-sm font-medium text-gray-900">Top Products</h2>
//           </div>
//           <div className="p-4">
//             <div className="space-y-4">
//               {topProducts.map((product, index) => (
//                 <div key={index} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                   <div className="flex-1">
//                     <p className="text-xs text-gray-900 mb-1">{product.name}</p>
//                     <p className="text-xs text-gray-600">{product.sales} sales</p>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">{product.revenue}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="p-3 border-t border-gray-200 text-center">
//             <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
//               View all products
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <button className="p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <Package className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">Add New Product</h3>
//           <p className="text-xs text-gray-600">Create and publish a new product</p>
//         </button>
        
//         <button className="p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <ShoppingCart className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">Manage Orders</h3>
//           <p className="text-xs text-gray-600">View and process customer orders</p>
//         </button>
        
//         <button className="p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <TrendingUp className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">View Analytics</h3>
//           <p className="text-xs text-gray-600">Check your store performance</p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;









// import React from 'react';
// import { Package, Users, ShoppingCart, TrendingUp, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// const AdminDashboard = () => {
//   const stats = [
//     {
//       label: 'Total Revenue',
//       value: '$45,231',
//       change: '+12.5%',
//       icon: DollarSign,
//       trend: 'up'
//     },
//     {
//       label: 'Total Orders',
//       value: '1,234',
//       change: '+8.2%',
//       icon: ShoppingCart,
//       trend: 'up'
//     },
//     {
//       label: 'Total Products',
//       value: '156',
//       change: '+3',
//       icon: Package,
//       trend: 'up'
//     },
//     {
//       label: 'Total Users',
//       value: '2,847',
//       change: '+15.3%',
//       icon: Users,
//       trend: 'up'
//     }
//   ];

//   const recentOrders = [
//     { id: '#ORD-001', customer: 'John Smith', product: 'Minimal Tote Bag', amount: '$89.00', status: 'Delivered' },
//     { id: '#ORD-002', customer: 'Sarah Johnson', product: 'Classic White Shirt', amount: '$45.00', status: 'Processing' },
//     { id: '#ORD-003', customer: 'Michael Brown', product: 'Leather Wallet', amount: '$65.00', status: 'Shipped' },
//     { id: '#ORD-004', customer: 'Emily Davis', product: 'Wool Blazer', amount: '$189.00', status: 'Delivered' },
//     { id: '#ORD-005', customer: 'David Wilson', product: 'Canvas Sneakers', amount: '$79.00', status: 'Processing' }
//   ];

//   const topProducts = [
//     { name: 'Minimal Tote Bag', sales: 234, revenue: '$20,826' },
//     { name: 'Classic White Shirt', sales: 189, revenue: '$8,505' },
//     { name: 'Wool Blazer', sales: 156, revenue: '$29,484' },
//     { name: 'Leather Wallet', sales: 143, revenue: '$9,295' },
//     { name: 'Canvas Sneakers', sales: 128, revenue: '$10,112' }
//   ];

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return 'text-gray-900 bg-gray-100';
//       case 'processing':
//         return 'text-gray-600 bg-gray-50';
//       case 'shipped':
//         return 'text-gray-700 bg-gray-100';
//       default:
//         return 'text-gray-600 bg-gray-50';
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-1">Dashboard</h1>
//         <p className="text-sm text-gray-600">Welcome back, here's what's happening with your store</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           const isPositive = stat.trend === 'up';
//           return (
//             <div key={index} className="bg-white border border-gray-200 p-4 transition-colors hover:border-gray-300">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="p-2 bg-gray-50 border border-gray-200">
//                   <Icon className="w-4 h-4 text-gray-900" strokeWidth={1.5} />
//                 </div>
//                 <div className="flex items-center gap-1">
//                   {isPositive ? (
//                     <ArrowUpRight className="w-3 h-3 text-gray-900" strokeWidth={1.5} />
//                   ) : (
//                     <ArrowDownRight className="w-3 h-3 text-gray-600" strokeWidth={1.5} />
//                   )}
//                   <span className="text-xs text-gray-900">{stat.change}</span>
//                 </div>
//               </div>
//               <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
//               <p className="text-xl font-medium text-gray-900">{stat.value}</p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         {/* Recent Orders */}
//         <div className="lg:col-span-2 bg-white border border-gray-200">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-sm font-medium text-gray-900">Recent Orders</h2>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-gray-200 bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Order ID</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Customer</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {recentOrders.map((order, index) => (
//                   <tr key={index} className="transition-colors hover:bg-gray-50">
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.id}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.customer}</td>
//                     <td className="px-4 py-3 text-xs text-gray-600">{order.product}</td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">{order.amount}</td>
//                     <td className="px-4 py-3 whitespace-nowrap">
//                       <span className={`px-2 py-1 text-xs ${getStatusColor(order.status)}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 whitespace-nowrap text-xs">
//                       <button className="text-gray-600 hover:text-gray-900 transition-colors">
//                         <Eye className="w-4 h-4" strokeWidth={1.5} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
//             <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
//               View all orders
//             </button>
//           </div>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white border border-gray-200">
//           <div className="p-4 border-b border-gray-200">
//             <h2 className="text-sm font-medium text-gray-900">Top Products</h2>
//           </div>
//           <div className="p-4 bg-white">
//             <div className="space-y-4">
//               {topProducts.map((product, index) => (
//                 <div key={index} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
//                   <div className="flex-1">
//                     <p className="text-xs text-gray-900 mb-1">{product.name}</p>
//                     <p className="text-xs text-gray-600">{product.sales} sales</p>
//                   </div>
//                   <p className="text-xs font-medium text-gray-900">{product.revenue}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="p-3 border-t border-gray-200 bg-gray-50 text-center">
//             <button className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
//               View all products
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <button className="bg-white p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <Package className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">Add New Product</h3>
//           <p className="text-xs text-gray-600">Create and publish a new product</p>
//         </button>
        
//         <button className="bg-white p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <ShoppingCart className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">Manage Orders</h3>
//           <p className="text-xs text-gray-600">View and process customer orders</p>
//         </button>
        
//         <button className="bg-white p-4 border border-gray-200 text-left transition-all hover:border-gray-300 group">
//           <TrendingUp className="w-5 h-5 text-gray-900 mb-2" strokeWidth={1.5} />
//           <h3 className="text-xs font-medium text-gray-900 mb-1">View Analytics</h3>
//           <p className="text-xs text-gray-600">Check your store performance</p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







import React from 'react';
import { Package, Users, ShoppingCart, TrendingUp, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up'
    },
    {
      label: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      trend: 'up'
    },
    {
      label: 'Total Products',
      value: '156',
      change: '+3',
      icon: Package,
      trend: 'up'
    },
    {
      label: 'Total Users',
      value: '2,847',
      change: '+15.3%',
      icon: Users,
      trend: 'up'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Smith', product: 'Minimal Tote Bag', amount: '$89.00', status: 'Delivered' },
    { id: '#ORD-002', customer: 'Sarah Johnson', product: 'Classic White Shirt', amount: '$45.00', status: 'Processing' },
    { id: '#ORD-003', customer: 'Michael Brown', product: 'Leather Wallet', amount: '$65.00', status: 'Shipped' },
    { id: '#ORD-004', customer: 'Emily Davis', product: 'Wool Blazer', amount: '$189.00', status: 'Delivered' },
    { id: '#ORD-005', customer: 'David Wilson', product: 'Canvas Sneakers', amount: '$79.00', status: 'Processing' }
  ];

  const topProducts = [
    { name: 'Minimal Tote Bag', sales: 234, revenue: '$20,826' },
    { name: 'Classic White Shirt', sales: 189, revenue: '$8,505' },
    { name: 'Wool Blazer', sales: 156, revenue: '$29,484' },
    { name: 'Leather Wallet', sales: 143, revenue: '$9,295' },
    { name: 'Canvas Sneakers', sales: 128, revenue: '$10,112' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-700 bg-green-50 border border-green-200';
      case 'processing':
        return 'text-blue-700 bg-blue-50 border border-blue-200';
      case 'shipped':
        return 'text-purple-700 bg-purple-50 border border-purple-200';
      default:
        return 'text-gray-700 bg-gray-50 border border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back, here's what's happening with your store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <div key={index} className="bg-white border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-100 border border-gray-200">
                  <Icon className="w-6 h-6 text-gray-900" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200">
                  {isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-green-600" strokeWidth={2} />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-red-600" strokeWidth={2} />
                  )}
                  <span className="text-xs font-medium text-gray-900">{stat.change}</span>
                </div>
              </div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
            <p className="text-xs text-gray-600 mt-1">Latest customer orders and their status</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-50">
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{order.product}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-sm">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              View all orders →
            </button>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-base font-semibold text-gray-900">Top Products</h2>
            <p className="text-xs text-gray-600 mt-1">Best selling items this month</p>
          </div>
          <div className="p-5 bg-white">
            <div className="space-y-5">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-start justify-between pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1.5">{product.name}</p>
                    <p className="text-xs text-gray-600 bg-gray-50 inline-block px-2 py-1 border border-gray-200">{product.sales} sales</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              View all products →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white p-6 border border-gray-200 text-left transition-all hover:border-gray-300 hover:shadow-sm group">
          <div className="p-3 bg-gray-100 border border-gray-200 inline-flex mb-4 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
            <Package className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Add New Product</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Create and publish a new product to your store catalog</p>
        </button>
        
        <button className="bg-white p-6 border border-gray-200 text-left transition-all hover:border-gray-300 hover:shadow-sm group">
          <div className="p-3 bg-gray-100 border border-gray-200 inline-flex mb-4 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
            <ShoppingCart className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Manage Orders</h3>
          <p className="text-xs text-gray-600 leading-relaxed">View and process all customer orders efficiently</p>
        </button>
        
        <button className="bg-white p-6 border border-gray-200 text-left transition-all hover:border-gray-300 hover:shadow-sm group">
          <div className="p-3 bg-gray-100 border border-gray-200 inline-flex mb-4 group-hover:bg-gray-900 group-hover:border-gray-900 transition-all">
            <TrendingUp className="w-6 h-6 text-gray-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">View Analytics</h3>
          <p className="text-xs text-gray-600 leading-relaxed">Check detailed performance metrics and insights</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;