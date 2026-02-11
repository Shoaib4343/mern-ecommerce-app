import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="group bg-white overflow-hidden transition-all">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
        <Skeleton height="100%" />
      </div>

      {/* Content Skeleton */}
      <div className="pt-4 pb-3 space-y-2">
        {/* Category */}
        <Skeleton width="40%" height={12} />
        
        {/* Title */}
        <Skeleton height={16} count={1} />
        
        {/* Price */}
        <div className="pt-1">
          <Skeleton width="35%" height={20} />
        </div>
        
        {/* Add to Cart Button */}
        <div className="mt-3">
          <Skeleton height={44} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;