import React, { useCallback, useRef, useEffect } from "react";
import Dropdown from "./Dropdown";

const FilterSidebar = ({
  isMobile,
  search,
  onSearchChange,
  categoryOptions,
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
  MAX_PRICE,
  selectedAvailability,
  onAvailabilityChange,
  onClearAll,
  showClearButton,
}) => {
  // ✅ PERFORMANCE: Memoized handlers prevent unnecessary re-renders
  const handleMinChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value) || 0;
      onPriceRangeChange([Math.min(value, priceRange[1]), priceRange[1]]);
    },
    [onPriceRangeChange, priceRange]
  );

  const handleMaxChange = useCallback(
    (e) => {
      const value = parseInt(e.target.value) || 0;
      onPriceRangeChange([priceRange[0], Math.max(value, priceRange[0])]);
    },
    [onPriceRangeChange, priceRange]
  );

  // ✅ NEW: Dual range slider handlers
  const handleMinSliderChange = useCallback(
    (e) => {
      const value = Math.min(Number(e.target.value), priceRange[1] - 1000);
      onPriceRangeChange([value, priceRange[1]]);
    },
    [onPriceRangeChange, priceRange]
  );

  const handleMaxSliderChange = useCallback(
    (e) => {
      const value = Math.max(Number(e.target.value), priceRange[0] + 1000);
      onPriceRangeChange([priceRange[0], value]);
    },
    [onPriceRangeChange, priceRange]
  );

  const handleAvailabilityChange = useCallback(
    (status) => {
      if (selectedAvailability.includes(status)) {
        onAvailabilityChange(selectedAvailability.filter((s) => s !== status));
      } else {
        onAvailabilityChange([...selectedAvailability, status]);
      }
    },
    [selectedAvailability, onAvailabilityChange]
  );

  return (
    <div
      className={`${
        isMobile ? "h-full overflow-y-auto pb-20" : "sticky top-30"
      } space-y-8`}
    >
      {/* Search */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Search</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={onSearchChange}
          className="w-full px-3 py-2 border border-gray-200 text-sm focus:border-gray-900 focus:outline-none"
        />
      </div>

      {/* Categories using Dropdown */}
      <Dropdown
        label="Categories"
        placeholder="Select categories"
        options={categoryOptions}
        value={selectedCategories}
        onChange={onCategoriesChange}
        multiple
        searchable
        clearable
      />

      {/* Price Range with Dual Slider */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          {/* Dual Range Slider */}
          <div className="relative pt-2 pb-4">
            {/* Min slider */}
            <input
              type="range"
              min="0"
              max={MAX_PRICE}
              step="1000"
              value={priceRange[0]}
              onChange={handleMinSliderChange}
              className="absolute w-full h-0 pointer-events-none outline-none"
              style={{
                zIndex: priceRange[0] > MAX_PRICE - 10000 ? 5 : 3,
              }}
            />
            {/* Max slider */}
            <input
              type="range"
              min="0"
              max={MAX_PRICE}
              step="1000"
              value={priceRange[1]}
              onChange={handleMaxSliderChange}
              className="absolute w-full h-0 pointer-events-none outline-none"
              style={{ zIndex: 4 }}
            />
            
            {/* Slider track background */}
            <div className="relative w-full">
              <div className="absolute w-full h-1 bg-gray-200 rounded" />
              <div
                className="absolute h-1 bg-gray-900 rounded"
                style={{
                  left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / MAX_PRICE) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Min/Max Input Fields */}
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={handleMinChange}
              min="0"
              max={priceRange[1]}
              placeholder="Min"
              className="w-24 px-3 py-2 border border-gray-200 text-sm text-gray-700 focus:border-gray-900 focus:outline-none"
            />
            <span className="text-gray-400">—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={handleMaxChange}
              min={priceRange[0]}
              max={MAX_PRICE}
              placeholder="Max"
              className="w-24 px-3 py-2 border border-gray-200 text-sm text-gray-700 focus:border-gray-900 focus:outline-none"
            />
          </div>

          {/* Price Display */}
          <div className="text-center p-2 bg-gray-50 rounded text-sm text-gray-700">
            ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Availability */}
      {/* <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Availability
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedAvailability.includes("inStock")}
              onChange={() => handleAvailabilityChange("inStock")}
              className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              In Stock
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedAvailability.includes("outOfStock")}
              onChange={() => handleAvailabilityChange("outOfStock")}
              className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Out of Stock
            </span>
          </label>
        </div>
      </div> */}

      {/* Clear Filters */}
      {showClearButton && (
        <button
          onClick={onClearAll}
          className="w-full py-2.5 text-sm text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Clear All Filters
        </button>
      )}

      {/* Dual Range Slider Styles */}
      <style jsx>{`
        /* Remove default styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: all;
          width: 16px;
          height: 16px;
          background-color: #fff;
          border: 2px solid #111827;
          border-radius: 50%;
          cursor: pointer;
          margin-top: -6px;
        }

        input[type="range"]::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background-color: #fff;
          border: 2px solid #111827;
          border-radius: 50%;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          background-color: #f9fafb;
        }

        input[type="range"]::-moz-range-thumb:hover {
          background-color: #f9fafb;
        }

        input[type="range"]::-webkit-slider-thumb:active {
          background-color: #111827;
        }

        input[type="range"]::-moz-range-thumb:active {
          background-color: #111827;
        }
      `}</style>
    </div>
  );
};

export default FilterSidebar;