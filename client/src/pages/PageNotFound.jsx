import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-light text-gray-900 tracking-tight">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-900">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all font-medium w-full sm:w-auto"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            Go Back
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all font-medium w-full sm:w-auto"
          >
            <Home size={18} strokeWidth={1.5} />
            Back to Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <p className="text-gray-600 text-sm mb-6">
            Looking for something specific?
          </p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors font-medium"
          >
            <Search size={18} strokeWidth={1.5} />
            Search Products
          </Link>
        </div>

        {/* Popular Links */}
        <div className="mt-12">
          <p className="text-gray-600 text-sm mb-4">Popular Pages</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Shop
            </Link>
            <Link
              to="/new-arrivals"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              New Arrivals
            </Link>
            <Link
              to="/best-sellers"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Best Sellers
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;