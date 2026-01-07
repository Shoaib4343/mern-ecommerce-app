// components/Spinner.jsx
import React from "react";

const Spinner = ({ text = "Loading...", fullScreen = true, size = "md" }) => {

    
  // Size configurations
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const content = (
    <div className="text-center">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4`}
      ></div>
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">{content}</div>
  );
};

export default Spinner;





// // Basic usage with custom text
// <Spinner text="Checking authentication..." />

// // Small spinner
// <Spinner text="Loading data..." size="sm" />

// // Large spinner
// <Spinner text="Please wait..." size="lg" />

// // Inline spinner (not full screen)
// <Spinner text="Loading..." fullScreen={false} />

// // No text, just spinner
// <Spinner text="" />