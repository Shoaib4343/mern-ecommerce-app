import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  ArrowLeft,
  FolderPlus,
  Grid,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  createCategoryApi,
  deleteCategoryApi,
  getAllCategoryApi,
  updateCategoryApi,
} from "../../services/category.api";
import { dateConverted } from "../../utils/date.uitls";
import DeleteModal from "../../components/modal/DeleteModal";

const CreateCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
  });

  // ========================================
  // DELETE MODAL STATE
  // ========================================
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    categoryId: null,
    categoryName: "",
    loading: false,
  });

  // ========================================
  // EDIT MODE STATE
  // ========================================

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // fetch category funciton
  const fetchCategory = async () => {
    try {
      const res = await getAllCategoryApi();
      setCategories(res.data.categories);
      console.log(res.data.categories);
    } catch (error) {
      console.log("Error in fetching category client side.", error.message);
      toast.error("Something went wrong.");
    }
  };

  // onchange handleForm
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((pre) => ({
        ...pre,
        [name]: "",
      }));

      // setErrors({
      //   ...errors,
      //   [name]: ""
      // })
    }
  };

  // validate form data
  const validatFormData = () => {
    const validation = {};
    // Name validation
    if (!formData.name.trim()) {
      validation.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      validation.name = "Name must be at least 3 characters long";
    } else if (formData.name.trim().length > 20) {
      validation.name = "Name cannot exceed 20 characters";
    }

    return validation;
  };

  // Form submition
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // fronted validation
    const validation = validatFormData();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    try {
      setLoading(true);
      setErrors({});

      // ========================================
      // CHECK IF EDIT MODE OR CREATE MODE
      // ========================================

      if (isEditMode) {
        // UPDATE CATEGORY
        const res = await updateCategoryApi(editingId, formData);
        if (res?.status === 200 && res?.data?.success) {
          toast.success(res.data.message || "Category updated successfully");
          setFormData({ name: "" });
          setIsEditMode(false);
          setEditingId(null);

          fetchCategory();
        } else {
          toast.error(res?.data?.message || "Failed to update category");
        }
      } else {
        // CREATE CATEGORY
        const res = await createCategoryApi(formData);
        console.log("this is res:", res);
        if (res?.status === 201 && res?.data?.success) {
          toast.success(res.data.message);
          setFormData({ name: "" });

          // REFETCH CATEGORIES AFTER SUCCESSFUL CREATION
          await fetchCategory();
        } else {
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Error in creating category.", error.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // filter category
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ========================================
  // EDIT FUNCTIONS
  // ========================================

  // Handle Edit Click - Populate form with category data
  const handleEditClick = (category) => {
    setIsEditMode(true);
    setFormData({ name: category.name });
    setEditingId(category._id);
    setErrors({});
    // Scroll to top so user can see the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel Edit - Reset form to create mode
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setFormData({ name: "" });
    setEditingId(null);
    setErrors({});
  };

  // ========================================
  // DELETE MODAL FUNCTIONS
  // ========================================

  // STEP 1: Open the delete modal
  const openDeleteModal = (category) => {
    setDeleteModal({
      isOpen: true,
      categoryId: category._id,
      categoryName: category.name,
      loading: false,
    });
  };

  // STEP 2: Close the delete modal
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      categoryId: null,
      categoryName: "",
      loading: false,
    });
  };

  // STEP 3: Confirm and execute deletion
  const confirmDelete = async () => {
    try {
      // Show loading state in modal
      setDeleteModal((prev) => ({ ...prev, loading: true }));

      // Make API call to delete
      const res = await deleteCategoryApi(deleteModal.categoryId);

      // Check if deletion was successful
      if (res.status === 200 || res.status === 204) {
        toast.success(res.data.message || "Category deleted successfully");

        // Refresh the category list
        await fetchCategory();

        // Close the modal
        closeDeleteModal();
      } else {
        toast.error(res?.data?.message || "Failed to delete category");

        // Keep modal open but stop loading
        setDeleteModal((prev) => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.log("Error in delete", error.message);
      toast.error(
        error?.response?.data?.message || "Error in Delete category."
      );

      // Keep modal open but stop loading
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Fecth all categories
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-gray-900 mb-2">
            Categories Management
          </h1>
          <p className="text-sm text-gray-600">
            Create and manage product categories
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create/Update Category Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 p-6">
            {/* ========================================
                FORM HEADER - Changes based on mode
                ======================================== */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 border border-gray-200">
                <FolderPlus
                  className="w-5 h-5 text-gray-900"
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-base font-semibold text-gray-900">
                {isEditMode ? "Update Category" : "Create New Category"}
              </h2>
              {/* Show X button only in edit mode */}
              {isEditMode && (
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Edit Mode Indicator */}
            {isEditMode && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700">
                  You are currently editing a category. Click X to cancel.
                </p>
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="space-y-5">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormData}
                    placeholder="Enter category name"
                    className={`w-full px-4 py-3 border ${
                      errors.name ? "border-red-300" : "border-gray-200"
                    }  focus:border-gray-900 focus:outline-none transition-colors text-sm`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-700"
                    disabled={loading}
                  >
                    {/* ========================================
                        BUTTON CHANGES BASED ON MODE
                        ======================================== */}
                    {isEditMode ? (
                      <>
                        <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                        {loading ? "Updating..." : "Update Category"}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" strokeWidth={1.5} />
                        {loading ? "Creating..." : "Create Category"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={
                      isEditMode
                        ? handleCancelEdit
                        : () => setFormData({ name: "" })
                    }
                    className="w-full px-6 py-3 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    {isEditMode ? "Cancel Edit" : "Reset Form"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Stats Card */}
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Category Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Categories</span>
                <span className="text-lg font-semibold text-gray-900">
                  {categories.length}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Active Categories</span>
                <span className="text-lg font-semibold text-green-700">
                  {categories.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Inactive Categories
                </span>
                <span className="text-lg font-semibold text-gray-600">0</span>
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
                  <h2 className="text-base font-semibold text-gray-900">
                    Existing Categories
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Manage all product categories
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white border border-gray-200">
                    <Grid className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  strokeWidth={1.5}
                />
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-8 text-center text-sm text-gray-500"
                      >
                        {searchQuery
                          ? "No categories found matching your search"
                          : "No categories yet. Create your first one!"}
                      </td>
                    </tr>
                  ) : (
                    filteredCategories.map((category) => (
                      <tr
                        key={category._id}
                        className={`transition-colors hover:bg-gray-50 ${
                          isEditMode && editingId === category._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 border border-gray-200">
                              <Grid
                                className="w-4 h-4 text-gray-600"
                                strokeWidth={1.5}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="text-sm text-gray-600">
                            {dateConverted(category.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditClick(category)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200 cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(category)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-200 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span>Showing {filteredCategories.length} of {categories.length} categories</span>
              </p>
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                View all categories →
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 
        ========================================
        DELETE CONFIRMATION MODAL
        ========================================
        This modal appears when user clicks delete button
        It asks for confirmation before actually deleting
      */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone and may affect associated products."
        itemName={deleteModal.categoryName}
        loading={deleteModal.loading}
      />
    </div>
  );
};

export default CreateCategory;
