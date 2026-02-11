import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

/**
 * Minimal Dropdown Component
 * Save this as: src/components/ui/Dropdown.jsx
 */
const Dropdown = ({label,placeholder = 'Select an option',options = [],value,onChange,error = false,errorMessage = '',disabled = false,searchable = false,multiple = false,clearable = false,className = ''}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get selected option(s) label
  const getSelectedLabel = () => {
    if (multiple) {
      if (!value || value.length === 0) return placeholder;
      const selectedOptions = options.filter(opt => value.includes(opt.value));
      return selectedOptions.map(opt => opt.label).join(', ');
    } else {
      const selected = options.find(opt => opt.value === value);
      return selected ? selected.label : placeholder;
    }
  };

  // Check if option is selected
  const isSelected = (optionValue) => {
    if (multiple) {
      return value && value.includes(optionValue);
    }
    return value === optionValue;
  };

  // Handle option click
  const handleOptionClick = (optionValue) => {
    if (multiple) {
      const newValue = value || [];
      if (newValue.includes(optionValue)) {
        onChange(newValue.filter(v => v !== optionValue));
      } else {
        onChange([...newValue, optionValue]);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : '');
  };

  const hasValue = multiple ? value && value.length > 0 : value;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div ref={dropdownRef} className="relative">
        {/* Dropdown Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error ? 'border-red-300' : 'border-gray-200'
          } ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white cursor-pointer'
          } focus:border-gray-900 focus:outline-none transition-colors text-sm text-left flex items-center justify-between`}
        >
          <span className={hasValue ? 'text-gray-900' : 'text-gray-500'}>
            {getSelectedLabel()}
          </span>
          
          <div className="flex items-center gap-2">
            {clearable && hasValue && !disabled && (
              <X
                className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
                strokeWidth={1.5}
                onClick={handleClear}
              />
            )}
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={1.5}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 max-h-64 overflow-hidden">
            {/* Search Input */}
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto max-h-52">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleOptionClick(option.value)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between ${
                      isSelected(option.value)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected(option.value) && (
                      <Check className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default Dropdown;