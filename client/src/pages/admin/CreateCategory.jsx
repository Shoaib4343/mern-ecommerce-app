import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ArrowLeft, FolderPlus, Grid } from 'lucide-react';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const existingCategories = [
    { id: 1, name: 'Clothing', products: 45, status: 'Active', created: 'Jan 15, 2024' },
    { id: 2, name: 'Accessories', products: 23, status: 'Active', created: 'Feb 20, 2024' },
    { id: 3, name: 'Shoes', products: 18, status: 'Active', created: 'Mar 10, 2024' },
    { id: 4, name: 'Bags', products: 12, status: 'Active', created: 'Dec 5, 2023' },
    { id: 5, name: 'Jewelry', products: 8, status: 'Inactive', created: 'Jan 28, 2024' },
  ];

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'text-green-700 bg-green-50 border border-green-200' 
      : 'text-gray-700 bg-gray-50 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">Categories Management</h1>
        <p className="text-sm text-gray-600">Create and manage product categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Category Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 border border-gray-200">
                <FolderPlus className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Create New Category</h2>
            </div>
            
            <div className="space-y-5">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter category description"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Parent Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white">
                  <option value="">None (Top Level)</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="shoes">Shoes</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <button className="w-full px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" strokeWidth={1.5} />
                  Create Category
                </button>
                
                <button className="w-full px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all">
                  Reset Form
                </button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Category Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Categories</span>
                <span className="text-lg font-semibold text-gray-900">24</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Active Categories</span>
                <span className="text-lg font-semibold text-green-700">21</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Inactive Categories</span>
                <span className="text-lg font-semibold text-gray-600">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 shadow-sm">
            {/* Header with Search */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Existing Categories</h2>
                  <p className="text-xs text-gray-600 mt-1">Manage all product categories</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-gray-200">
                    <Grid className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm bg-white"
                />
              </div>
            </div>

            {/* Categories Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {existingCategories.map((category) => (
                    <tr key={category.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 border border-gray-200">
                            <Grid className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-gray-900">{category.products}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 text-xs font-medium ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-600">{category.created}</span>
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

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 5 of 24 categories</p>
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                View all categories →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;