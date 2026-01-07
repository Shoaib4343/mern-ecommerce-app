import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, FolderKanban, Users, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
      isActive
        ? "text-gray-900 bg-gray-50 font-medium"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Brand Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-light tracking-wide text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-600 mt-1">Manage your store</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6">
          <div className="space-y-1 px-3">
            <NavLink to="/admin/dashboard" className={navLinkClass} end>
              <LayoutDashboard size={18} strokeWidth={1.5} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/create-product" className={navLinkClass}>
              <Package size={18} strokeWidth={1.5} />
              <span>Create Product</span>
            </NavLink>
            <NavLink to="/admin/create-category" className={navLinkClass}>
              <FolderKanban size={18} strokeWidth={1.5} />
              <span>Create Category</span>
            </NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>
              <Users size={18} strokeWidth={1.5} />
              <span>Users</span>
            </NavLink>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-200">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
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

export default AdminLayout;