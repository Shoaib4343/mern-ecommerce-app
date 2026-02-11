import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Package, TrendingUp, DollarSign, ShoppingBag, ArrowLeft } from 'lucide-react';
import { getAllCategoryApi } from '../../services/category.api';
import { getAllProductApi, deleteProductApi } from '../../services/product.api';
import Dropdown from '../../components/ui/Dropdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DeleteModal from '../../components/modal/DeleteModal';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
    productName: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategoryApi();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getAllProductApi();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (product) => {
    setDeleteModal({
      isOpen: true,
      productId: product._id,
      productName: product.name
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      productId: null,
      productName: ''
    });
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      const { data } = await deleteProductApi(deleteModal.productId);
      
      if (data.success) {
        toast.success('Product deleted successfully');
        closeDeleteModal();
        fetchProducts();
      } else {
        toast.error(data.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(cat => ({
      value: cat._id,
      label: cat.name
    }))
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);
  const lowStockItems = products.filter(p => p.quantity > 0 && p.quantity < 50).length;
  const outOfStockItems = products.filter(p => p.quantity === 0).length;

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      icon: Package,
      change: `${totalProducts}`,
      changeType: 'positive'
    },
    {
      title: 'Total Value',
      value: `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      change: `${totalQuantity} items`,
      changeType: 'positive'
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems.toString(),
      icon: TrendingUp,
      change: lowStockItems > 0 ? `${lowStockItems}` : '0',
      changeType: lowStockItems > 0 ? 'negative' : 'positive'
    },
    {
      title: 'Out of Stock',
      value: outOfStockItems.toString(),
      icon: ShoppingBag,
      change: outOfStockItems > 0 ? `${outOfStockItems}` : '0',
      changeType: outOfStockItems > 0 ? 'negative' : 'positive'
    }
  ];

  const getStatusBadge = (product) => {
    if (product.quantity === 0) {
      return { text: 'Out of Stock', class: 'bg-red-50 text-red-700 border-red-200' };
    } else if (product.quantity < 50) {
      return { text: 'Low Stock', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    } else {
      return { text: 'In Stock', class: 'bg-green-50 text-green-700 border-green-200' };
    }
  };

  return (
     <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
           Products
          </h1>
          <p className="text-sm text-gray-600">
            Manage your store products and inventory
          </p>
        </div>
        <button 
           onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-700 bg-green-50' 
                    : 'text-red-700 bg-red-50'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600 uppercase tracking-wide">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
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

          <div className="lg:w-64">
            <Dropdown
              placeholder="All Categories"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              searchable
              clearable
            />
          </div>

          <button 
            onClick={() => navigate("/admin/create-product")}
            className="px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Shipping</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const status = getStatusBadge(product);
                  return (
                    <tr key={product._id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 border border-gray-200 shrink-0 overflow-hidden">
                            <img
                              src={product.image ? `${import.meta.env.VITE_API_URL}/image/${product.image}` : 'https://via.placeholder.com/200'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200';
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">{product.name}</p>
                            <p className="text-xs text-gray-600">SKU: {product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm text-gray-700">{product.category?.name || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-gray-900">
                          ${product.price ? product.price.toFixed(2) : '0.00'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-sm font-medium ${
                          product.quantity === 0 
                            ? 'text-red-600' 
                            : product.quantity < 50 
                            ? 'text-yellow-600' 
                            : 'text-gray-900'
                        }`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium border ${
                          product.shipping 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {product.shipping ? 'Available' : 'Not Available'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium border ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/product/${product._id}`)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 cursor-pointer"
                            title="View product"
                          >
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button 
                            onClick={() => navigate(`/admin/update-product/${product._id}`)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 cursor-pointer"
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(product)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-200 cursor-pointer"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {totalProducts} products
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer">
              Previous
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer">
              1
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer">
              2
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-white transition-colors cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone and will permanently remove the product from your inventory."
        itemName={deleteModal.productName}
        loading={isDeleting}
      />
    </div>
  );
};

export default Products;