
import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, User, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import logo from "../../assets/images/logo.png";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-gray-900 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900"
    : "text-gray-600 hover:text-gray-900 transition-colors relative hover:after:w-full after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  }, [location.pathname]);

  // Handle Logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    setIsMenuOpen(false);
    setIsDesktopDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container-custom py-4 flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Elon store logo"
            className="h-8 w-auto object-contain"
          />
          <span className="text-2xl font-light tracking-wide text-gray-900">
            Elon
          </span>
        </Link>

        {/* Center Navigation links - Desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Side - Icons and Buttons */}
        <div className="flex items-center gap-5">
          {/* Search Icon */}
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>

          {/* Favorite Icon */}
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer hidden sm:block"
            aria-label="Favorites"
          >
            <Heart size={22} strokeWidth={1.5} />
          </button>

          {/* Cart Icon with Badge */}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white text-xs font-medium rounded-full flex items-center justify-center">
              2
            </span>
          </Link>

          {/* Divider - Desktop */}
          <div className="hidden md:block w-px h-6 bg-gray-200"></div>

          {!auth.user ? (
            <>
              {/* Sign In Link - Desktop */}
              <Link
                to="/login"
                className="hidden md:block bg-gray-50 px-6 py-2.5 text-gray-600 hover:text-gray-900 transition-colors font-medium cursor-pointer"
              >
                Sign In
              </Link>

              {/* Sign Up Button - Desktop */}
              <Link
                to="/register"
                className="hidden md:inline-flex px-6 py-2.5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="hidden md:block relative" ref={dropdownRef}>
              {/* User Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsDesktopDropdownOpen(!isDesktopDropdownOpen)}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-950 transition-colors cursor-pointer"
              >
                <User size={18} strokeWidth={1.5} className="text-gray-100" />
                <span className="text-gray-100 font-medium text-sm">
                  {auth.user.name}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className={`text-gray-100 transition-transform duration-200 ${
                    isDesktopDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Dropdown Menu */}
              {isDesktopDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-sm">
                  <div className="py-1">
                    {/* Dashboard Link */}
                    <Link
                      to={
                        
                          auth?.user?.role === 1
                            ? "/admin/dashboard"
                            : "/dashboard"
                      }
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setIsDesktopDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} strokeWidth={1.5} />
                      <span>Dashboard</span>
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Logout Button */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <LogOut size={16} strokeWidth={1.5} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900 cursor-pointer transition-all duration-300"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="container-custom py-6 px-6">
            {/* Navigation Links */}
            <div className="flex flex-col gap-1 mb-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-3 text-base cursor-pointer ${
                    isActive
                      ? "text-gray-900 font-medium bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } transition-all`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `px-4 py-3 text-base cursor-pointer ${
                    isActive
                      ? "text-gray-900 font-medium bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } transition-all`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-4 py-3 text-base cursor-pointer ${
                    isActive
                      ? "text-gray-900 font-medium bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } transition-all`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-3 text-base cursor-pointer ${
                    isActive
                      ? "text-gray-900 font-medium bg-gray-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } transition-all`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </div>

            {/* Authentication Section - Mobile */}
            <div className="pt-6 border-t border-gray-100">
              {!auth.user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-3 text-center border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-3 text-center bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {/* Mobile User Info - Clickable to toggle dropdown */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileDropdownOpen(prev => !prev);
                    }}
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 hover:bg-gray-950 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <User size={20} strokeWidth={1.5} className="text-gray-100" />
                      <span className="text-gray-100 font-medium">
                        {auth.user.name}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.5}
                      className={`text-gray-100 transition-transform duration-200 ${
                        isMobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Menu */}
                  {isMobileDropdownOpen && (
                    <div className="flex flex-col">
                      {/* Dashboard Link */}
                      <Link
                        to={
                          auth?.user?.role === 1
                            ? "/admin/dashboard"
                            : "/dashboard"
                        }
                        className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-200"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileDropdownOpen(false);
                        }}
                      >
                        <LayoutDashboard size={16} strokeWidth={1.5} />
                        <span>Dashboard</span>
                      </Link>

                      {/* Logout Button */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer border-t border-gray-200"
                      >
                        <LogOut size={16} strokeWidth={1.5} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;