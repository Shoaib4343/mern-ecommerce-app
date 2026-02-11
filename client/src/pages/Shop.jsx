import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { filterProductsApi } from "../services/product.api";
import { getAllCategoryApi } from "../services/category.api";
import { toast } from "react-hot-toast";
import Dropdown from "../components/ui/Dropdown";
import { Grid, List, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import FilterSidebar from "../components/ui/FilterSidebar";

const Shop = () => {
  // URL Search Params
  const [searchParams, setSearchParams] = useSearchParams();

  // UI State
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter State (immediate - updates as user types/drags)
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  // ✅ NEW: Debounced filter state (delayed - used for API calls)
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedPriceRange, setDebouncedPriceRange] = useState([0, 100000]);

  // API State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;

  const MAX_PRICE = 100000;

  // ✅ NEW: Read search from URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearch(urlSearch);
      setDebouncedSearch(urlSearch);
    }
  }, [searchParams]);

  // ✅ PERFORMANCE FIX: Debounce search (500ms delay)
  // Prevents API call on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ PERFORMANCE FIX: Debounce price range (500ms delay)
  // Prevents API call on every slider movement
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 500);

    return () => clearTimeout(timer);
  }, [priceRange]);

  // ✅ UX FIX: Reset to page 1 when filters change
  useEffect(() => {
    if (isInitialized) {
      setCurrentPage(1);
    }
  }, [debouncedSearch, selectedCategories, debouncedPriceRange, selectedAvailability, isInitialized]);

  // Fetch categories on mount (runs once)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategoryApi();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsInitialized(true);
      }
    };

    fetchCategories();
  }, []);

  // ✅ PERFORMANCE: Memoized fetch function with proper error handling
  const fetchProducts = useCallback(async () => {
    if (!isInitialized) return;

    try {
      setLoading(true);

      const filters = {
        search: debouncedSearch.trim(),
        categories: selectedCategories,
        minPrice: debouncedPriceRange[0],
        maxPrice: debouncedPriceRange[1],
        availability: selectedAvailability,
        sortBy,
        page: currentPage,
        limit,
      };

      const { data } = await filterProductsApi(filters);

      if (data?.success) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.totalProducts || 0);
      } else {
        toast.error(data?.message || "Failed to load products");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [
    isInitialized,
    debouncedSearch,
    selectedCategories,
    debouncedPriceRange,
    selectedAvailability,
    sortBy,
    currentPage,
    limit,
  ]);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setPriceRange([0, MAX_PRICE]);
    setSearch("");
    setCurrentPage(1);
    // Clear URL params
    setSearchParams({});
  }, [MAX_PRICE, setSearchParams]);

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Convert categories to dropdown options
  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Best Rating" },
  ];

  const showClearButton =
    selectedCategories.length > 0 ||
    selectedAvailability.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < MAX_PRICE ||
    search.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header with Image */}
      {/* <div className="h-56 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            <div className="flex flex-col justify-center space-y-2">
              <h1 className="text-3xl font-light tracking-tight text-gray-900">
                All Products
              </h1>
              <p className="text-sm text-gray-600 max-w-md">
                Discover our complete collection of carefully curated furniture
                and home decor
              </p>
            </div>

            <div className="hidden md:h-full md:flex items-center justify-center overflow-hidden">
              <img
                src={category_5}
                alt="Shop Collection"
                className="h-[120%] scale-140 w-auto object-cover absolute bottom-0 right-8 lg:right-20"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 ">
            <FilterSidebar
              search={search}
              onSearchChange={handleSearchChange}
              categoryOptions={categoryOptions}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              MAX_PRICE={MAX_PRICE}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={setSelectedAvailability}
              onClearAll={clearAllFilters}
              showClearButton={showClearButton}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                  Filters
                </button>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {totalProducts}
                  </span>{" "}
                  Products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Dropdown
                  placeholder="Sort by"
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-56"
                />

                {/* View Toggle */}
                <div className="hidden sm:flex border border-gray-300">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 border-l border-gray-300 transition-colors ${
                      viewMode === "list"
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {showClearButton && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-gray-600">Filters:</span>
                {search.length > 0 && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                    Search: {search}
                    <button onClick={() => setSearch("")}>
                      <X className="w-3 h-3 cursor-pointer" strokeWidth={2} />
                    </button>
                  </span>
                )}
                {selectedCategories.map((categoryId) => {
                  const category = categories.find((c) => c._id === categoryId);
                  return (
                    <span
                      key={categoryId}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {category?.name}
                      <button
                        onClick={() =>
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== categoryId)
                          )
                        }
                      >
                        <X className="w-3 h-3" strokeWidth={2} />
                      </button>
                    </span>
                  );
                })}
                {selectedAvailability.map((status) => (
                  <span
                    key={status}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {status === "inStock" ? "In Stock" : "Out of Stock"}
                    <button
                      onClick={() =>
                        setSelectedAvailability(
                          selectedAvailability.filter((s) => s !== status)
                        )
                      }
                    >
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </span>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < MAX_PRICE) && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                    Price: ${priceRange[0].toLocaleString()} - $
                    {priceRange[1].toLocaleString()}
                    <button onClick={() => setPriceRange([0, MAX_PRICE])}>
                      <X className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-900 hover:underline ml-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Loading State with Skeletons */}
            {loading ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                } gap-6`}
              >
                {[...Array(limit)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  } gap-6`}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      wishlist={wishlist}
                      toggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-gray-200">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2.5 border border-gray-300 text-sm font-medium transition-colors  ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = idx + 1;
                      } else if (currentPage <= 3) {
                        pageNum = idx + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + idx;
                      } else {
                        pageNum = currentPage - 2 + idx;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            currentPage === pageNum
                              ? "bg-gray-900 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border border-gray-300 text-sm font-medium transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-6">
                  No products found matching your filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                isMobile
                search={search}
                onSearchChange={handleSearchChange}
                categoryOptions={categoryOptions}
                selectedCategories={selectedCategories}
                onCategoriesChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                MAX_PRICE={MAX_PRICE}
                selectedAvailability={selectedAvailability}
                onAvailabilityChange={setSelectedAvailability}
                onClearAll={clearAllFilters}
                showClearButton={showClearButton}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;