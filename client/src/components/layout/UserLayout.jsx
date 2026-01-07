// components/layout/UserLayout.jsx
import React from 'react';  
import { LayoutDashboard, Package, Heart, MapPin, Settings, LogOut, User } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const UserLayout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
      isActive
        ? 'text-gray-900 bg-gray-50 font-medium'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`;

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* LOGO/BRAND SECTION */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center">
              <User size={20} strokeWidth={1.5} className="text-gray-700" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                {auth?.user?.name || 'User'}
              </h2>
              <p className="text-xs text-gray-600">{auth?.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <NavLink to="/dashboard" className={navLinkClass} end>
              <LayoutDashboard size={18} strokeWidth={1.5} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/orders" className={navLinkClass}>
              <Package size={18} strokeWidth={1.5} />
              <span>My Orders</span>
            </NavLink>
            <NavLink to="/dashboard/wishlist" className={navLinkClass}>
              <Heart size={18} strokeWidth={1.5} />
              <span>Wishlist</span>
            </NavLink>
            <NavLink to="/dashboard/addresses" className={navLinkClass}>
              <MapPin size={18} strokeWidth={1.5} />
              <span>Addresses</span>
            </NavLink>
            <NavLink to="/dashboard/settings" className={navLinkClass}>
              <Settings size={18} strokeWidth={1.5} />
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;