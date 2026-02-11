import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Edit2, Trash2, ShoppingBag, ChevronRight, Info } from 'lucide-react';
import { getSingleProductApi, deleteProductApi } from '../../services/product.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import DeleteModal from '../../components/modal/DeleteModal';
import Spinner from '../../components/ui/Spinner';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: null,
    productName: ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await getSingleProductApi(id);
      if (data.success) {
        setProduct(data.product);
      } else {
        toast.error('Product not found');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch product');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = () => {
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
        navigate('/admin/products');
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

  const getStatusBadge = (product) => {
    if (product.quantity === 0) {
      return { text: 'Out of Stock', class: 'bg-red-50 text-red-700 border-red-200' };
    } else if (product.quantity < 50) {
      return { text: 'Low Stock', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
    } else {
      return { text: 'In Stock', class: 'bg-green-50 text-green-700 border-green-200' };
    }
  };

  if (loading) {
   return <Spinner text="Loading product..." />;   
  }

  if (!product) {
    return null;
  }

  const status = getStatusBadge(product);

  return (
     <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/admin/products')}
              className="text-gray-600 hover:text-gray-900 transition-colors font-light"
            >
              Products
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="aspect-square bg-gray-50 border border-gray-200 overflow-hidden">
                <img
                  src={product.image ? `${import.meta.env.VITE_API_URL}/image/${product.image}` : 'https://via.placeholder.com/800'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800';
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-8">
                {/* Title & Category */}
                <div className="space-y-3">
                  {product.category?.name && (
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                      {product.category.name}
                    </p>
                  )}
                  <h1 className="text-4xl font-light tracking-tight text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-sm text-gray-500 font-mono">{product.slug}</p>
                </div>

                {/* Price */}
                <div className="py-6 border-y border-gray-200">
                  <p className="text-3xl font-medium text-gray-900">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                    Description
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-4">
                  <span className={`inline-flex px-4 py-2 text-xs font-medium border uppercase tracking-wide ${status.class}`}>
                    {status.text}
                  </span>
                  <span className="text-sm text-gray-600">
                    {product.quantity} units available
                  </span>
                </div>

                {/* Shipping */}
                {product.shipping && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info className="w-4 h-4" strokeWidth={1.5} />
                    <span className="font-light">Shipping available</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-8 space-y-3">
                <button
                  onClick={() => navigate(`/admin/update-product/${product._id}`)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
                >
                  <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                  Edit Product
                </button>
                <button
                  onClick={openDeleteModal}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors uppercase tracking-wide"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Inventory Details */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-900 font-semibold pb-4 border-b border-gray-200">
              Inventory
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Current Stock</p>
                <p className={`text-2xl font-medium ${
                  product.quantity === 0 
                    ? 'text-red-600' 
                    : product.quantity < 50 
                    ? 'text-yellow-600' 
                    : 'text-gray-900'
                }`}>
                  {product.quantity}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Total Value</p>
                <p className="text-2xl font-medium text-gray-900">
                  ${((product.price || 0) * (product.quantity || 0)).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Unit Price</p>
                <p className="text-lg font-medium text-gray-900">
                  ${product.price ? product.price.toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-900 font-semibold pb-4 border-b border-gray-200">
              Specifications
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-start py-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wide text-gray-500">SKU</span>
                <span className="text-sm font-mono text-gray-900">{product.slug}</span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wide text-gray-500">Category</span>
                <span className="text-sm text-gray-900">{product.category?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wide text-gray-500">Shipping</span>
                <span className="text-sm text-gray-900">
                  {product.shipping ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wide text-gray-500">Status</span>
                <span className="text-sm text-gray-900">{status.text}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-900 font-semibold pb-4 border-b border-gray-200">
              Management
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate(`/admin/update-product/${product._id}`)}
                className="w-full text-left py-3 px-4 border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                      Edit Details
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                </div>
              </button>
              
              <button
                onClick={openDeleteModal}
                className="w-full text-left py-3 px-4 border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" strokeWidth={1.5} />
                    <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                      Delete Product
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
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

export default ProductDetail;