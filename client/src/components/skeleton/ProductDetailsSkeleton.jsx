import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery Skeleton */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="w-full aspect-[4/5] bg-gray-50 overflow-hidden">
              <Skeleton height="100%" />
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-gray-50 overflow-hidden">
                  <Skeleton height="100%" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6 lg:pt-2">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  {/* Category */}
                  <Skeleton width="30%" height={12} />
                  {/* Title */}
                  <Skeleton height={32} />
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-2">
                  <Skeleton width={36} height={36} />
                  <Skeleton width={36} height={36} />
                </div>
              </div>

              {/* Rating */}
              <Skeleton width="40%" height={14} />

              {/* Price */}
              <div className="pt-2">
                <Skeleton width="35%" height={28} />
              </div>
            </div>

            {/* Description */}
            <div className="py-6 border-t border-gray-200">
              <Skeleton count={3} height={14} className="mb-2" />
            </div>

            {/* Stock Status */}
            <Skeleton width="30%" height={14} />

            {/* Quantity & Actions */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              {/* Quantity with Price */}
              <div className="flex items-center justify-between">
                <Skeleton width={120} height={44} />
                <div className="text-right">
                  <Skeleton width={60} height={24} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Skeleton height={48} containerClassName="flex-1" />
                <Skeleton height={48} containerClassName="flex-1" />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 pb-6 border-t border-gray-200">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton width={20} height={20} />
                  <Skeleton width="80%" height={14} />
                  <Skeleton width="60%" height={12} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-16 lg:mt-24 border-t border-gray-200">
          <div className="flex items-center gap-8 border-b border-gray-200">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} width={120} height={16} className="my-4" />
            ))}
          </div>

          <div className="py-8 lg:py-12">
            <div className="max-w-3xl space-y-4">
              <Skeleton width="40%" height={20} />
              <Skeleton count={4} height={14} className="mb-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;