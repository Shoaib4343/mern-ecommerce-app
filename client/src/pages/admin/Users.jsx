import React, { useState } from 'react';
import { Search, UserPlus, Mail, Phone, Calendar, MoreVertical, Edit2, Trash2, Shield, User } from 'lucide-react';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const users = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@example.com', 
      phone: '+1 234 567 8900', 
      role: 'Admin', 
      status: 'Active',
      joinDate: 'Jan 15, 2024',
      orders: 45
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com', 
      phone: '+1 234 567 8901', 
      role: 'Customer', 
      status: 'Active',
      joinDate: 'Feb 20, 2024',
      orders: 12
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com', 
      phone: '+1 234 567 8902', 
      role: 'Customer', 
      status: 'Active',
      joinDate: 'Mar 10, 2024',
      orders: 8
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily.davis@example.com', 
      phone: '+1 234 567 8903', 
      role: 'Customer', 
      status: 'Inactive',
      joinDate: 'Dec 5, 2023',
      orders: 23
    },
    { 
      id: 5, 
      name: 'David Wilson', 
      email: 'david.w@example.com', 
      phone: '+1 234 567 8904', 
      role: 'Customer', 
      status: 'Active',
      joinDate: 'Jan 28, 2024',
      orders: 5
    },
    { 
      id: 6, 
      name: 'Lisa Anderson', 
      email: 'lisa.anderson@example.com', 
      phone: '+1 234 567 8905', 
      role: 'Admin', 
      status: 'Active',
      joinDate: 'Nov 12, 2023',
      orders: 67
    }
  ];

  const getRoleColor = (role) => {
    return role === 'Admin' 
      ? 'text-purple-700 bg-purple-50 border border-purple-200' 
      : 'text-blue-700 bg-blue-50 border border-blue-200';
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'text-green-700 bg-green-50 border border-green-200' 
      : 'text-gray-700 bg-gray-50 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Users Management</h1>
        <p className="text-sm text-gray-600">Manage all users and their permissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 border border-gray-200">
              <User className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Total Users</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">2,847</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 border border-green-200">
              <User className="w-5 h-5 text-green-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Active Users</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">2,453</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 border border-purple-200">
              <Shield className="w-5 h-5 text-purple-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Admins</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">12</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 border border-blue-200">
              <UserPlus className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">New This Month</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">127</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search users by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>

          {/* Add User Button */}
          <button className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2 whitespace-nowrap">
            <UserPlus className="w-4 h-4" strokeWidth={1.5} />
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" strokeWidth={1.5} />
                      {user.phone}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-gray-900">{user.orders}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
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
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1 to 6 of 2,847 users</p>
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
    </div>
  );
};

export default Users;