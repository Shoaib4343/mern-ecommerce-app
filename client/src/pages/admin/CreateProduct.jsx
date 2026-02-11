import React, { useState, useEffect } from "react";
import { ArrowLeft, Package, Upload, X } from "lucide-react";
import { getAllCategoryApi } from "../../services/category.api";
import { createProductApi } from "../../services/product.api";
import { toast } from "react-hot-toast";
import Dropdown from "../../components/ui/Dropdown";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: false,
    image: null,
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // navigate
  const navigate = useNavigate();

  // fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await getAllCategoryApi();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handler specifically for dropdown (receives value directly, not event)
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));

    // Clear error for category field
    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Only image files are allowed",
        }));
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size must be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear image error
      if (errors.image) {
        setErrors((prev) => ({
          ...prev,
          image: "",
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
  };

  // validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }

    if (!formData.image) {
      newErrors.image = "Product image is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("category", formData.category);
      submitData.append("quantity", formData.quantity);
      submitData.append("shipping", formData.shipping);
      submitData.append("image", formData.image);

      // Make API call
      const { data } = await createProductApi(submitData);

      if (data.success) {
        navigate("/admin/products");
        // Success - show message
        toast.success("Product created successfully!");

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          shipping: false,
          image: null,
        });
        setImagePreview(null);
      } else {
        // Handle error from API
        toast.error(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error creating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      shipping: false,
      image: null,
    });
    setImagePreview(null);
    setErrors({});
  };

  // Transform categories to dropdown format
  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Create New Product
          </h1>
          <p className="text-sm text-gray-600">
            Add a new product to your inventory
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Products
        </button>
      </div>

      <div className="max-w-4xl">
        <div className="bg-white border border-gray-200 p-8">
          {/* Form Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
            <div className="p-2 bg-gray-100 border border-gray-200">
              <Package className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Product Information
            </h2>
          </div>

          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-300" : "border-gray-200"
                } focus:border-gray-900 focus:outline-none transition-colors text-sm`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="4"
                className={`w-full px-4 py-3 border ${
                  errors.description ? "border-red-300" : "border-gray-200"
                } focus:border-gray-900 focus:outline-none transition-colors text-sm resize-none`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price, Category and Quantity Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border ${
                    errors.price ? "border-red-300" : "border-gray-200"
                  } focus:border-gray-900 focus:outline-none transition-colors text-sm`}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Category Dropdown */}
              <Dropdown
                label="Category *"
                placeholder="Select a category"
                options={categoryOptions}
                value={formData.category}
                onChange={handleCategoryChange}
                error={!!errors.category}
                errorMessage={errors.category}
                searchable
                clearable
              />

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 border ${
                    errors.quantity ? "border-red-300" : "border-gray-200"
                  } focus:border-gray-900 focus:outline-none transition-colors text-sm`}
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>

              {!imagePreview ? (
                <label
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed ${
                    errors.image ? "border-red-300" : "border-gray-200"
                  } hover:border-gray-300 transition-colors cursor-pointer bg-gray-50`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className="w-10 h-10 mb-3 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-medium">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative w-full h-64 border border-gray-200 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    <X
                      className="w-4 h-4 text-gray-600 hover:text-red-600"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              )}

              {errors.image && (
                <p className="mt-1 text-xs text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="shipping"
                name="shipping"
                checked={formData.shipping}
                onChange={handleInputChange}
                className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <label htmlFor="shipping" className="text-sm text-gray-700">
                Free shipping available
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-white border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Use clear, descriptive product names</li>
            <li>
              • Write detailed descriptions to help customers understand the
              product
            </li>
            <li>• Set competitive prices based on market research</li>
            <li>• Upload high-quality images with good lighting</li>
            <li>• Keep your inventory quantities accurate</li>
            <li>• Select the appropriate category for better organization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
