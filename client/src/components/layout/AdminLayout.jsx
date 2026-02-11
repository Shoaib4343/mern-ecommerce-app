// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { LayoutDashboard, Package, FolderKanban, Users, LogOut, ShoppingBag } from "lucide-react";

// const AdminLayout = () => {
//   const navLinkClass = ({ isActive }) =>
//     `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
//       isActive
//         ? "text-gray-900 bg-gray-50 font-medium"
//         : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//     }`;

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* LEFT SIDEBAR */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
//         {/* Logo/Brand Section */}
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-lg font-light tracking-wide text-gray-900">Admin Panel</h2>
//           <p className="text-xs text-gray-600 mt-1">Manage your store</p>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 py-6">
//           <div className="space-y-1 px-3">
//             <NavLink to="/admin/dashboard" className={navLinkClass} end>
//               <LayoutDashboard size={18} strokeWidth={1.5} />
//               <span>Dashboard</span>
//             </NavLink>
//              <NavLink to="/admin/products" className={navLinkClass}>
//               <ShoppingBag size={18} strokeWidth={1.5} />
//               <span>Products</span>
//             </NavLink>
//             <NavLink to="/admin/create-product" className={navLinkClass}>
//               <Package size={18} strokeWidth={1.5} />
//               <span>Create Product</span>
//             </NavLink>
//             <NavLink to="/admin/create-category" className={navLinkClass}>
//               <FolderKanban size={18} strokeWidth={1.5} />
//               <span>Create Category</span>
//             </NavLink>
//             <NavLink to="/admin/users" className={navLinkClass}>
//               <Users size={18} strokeWidth={1.5} />
//               <span>Users</span>
//             </NavLink>
//           </div>
//         </nav>

//         {/* Footer Section */}
//         <div className="p-6 border-t border-gray-200">
//           <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
//             <LogOut size={18} strokeWidth={1.5} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* RIGHT CONTENT */}
//       <main className="flex-1 overflow-auto bg-gray-50">
//         <div className="p-8">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

















import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Package, FolderKanban, Users, LogOut, ShoppingBag, ChevronLeft } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileSidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('admin-sidebar');
        const menuButton = document.getElementById('admin-menu-button');
        if (sidebar && !sidebar.contains(e.target) && !menuButton.contains(e.target)) {
          setIsMobileSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSidebarOpen]);

  // Prevent scroll on body when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileSidebarOpen]);

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 text-sm transition-all group relative ${
      isActive
        ? 'text-gray-900 bg-gray-100 font-medium'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`;

  return (
    <div className="flex bg-white h-[calc(100vh-64px)]">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR - Desktop & Mobile */}
      <aside
        id="admin-sidebar"
        className={`
          fixed lg:relative
          bg-white border-r border-gray-200
          flex flex-col z-40
          transition-all duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isSidebarOpen ? 'lg:w-56' : 'lg:w-16'}
          w-56
          h-[calc(100vh-64px)]
        `}
      >
        {/* Collapse Button - Desktop Only */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors z-10 cursor-pointer"
        >
          <ChevronLeft 
            size={14} 
            strokeWidth={2}
            className={`transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Logo/Brand Section */}
        <div className={`p-4 border-b border-gray-200 shrink-0 ${!isSidebarOpen ? 'lg:px-2' : ''}`}>
          <div className="flex items-center justify-between">
            <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0'}`}>
              <h2 className="text-base font-medium text-gray-900 whitespace-nowrap">Admin Panel</h2>
              <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">Manage store</p>
            </div>
            {!isSidebarOpen && (
              <div className="hidden lg:flex w-full justify-center">
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">A</span>
                </div>
              </div>
            )}
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Navigation - Flexible space */}
        <nav className="flex-1 py-3 min-h-0">
          <div className={`space-y-0.5 ${isSidebarOpen ? 'px-2' : 'lg:px-1'}`}>
            <NavLink 
              to="/admin/dashboard" 
              className={navLinkClass}
              onClick={handleNavClick}
              end
              title={!isSidebarOpen ? 'Dashboard' : ''}
            >
              <LayoutDashboard size={18} strokeWidth={1.5} className="shrink-0" />
              <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                Dashboard
              </span>
            </NavLink>
            <NavLink 
              to="/admin/products" 
              className={navLinkClass}
              onClick={handleNavClick}
              title={!isSidebarOpen ? 'Products' : ''}
            >
              <ShoppingBag size={18} strokeWidth={1.5} className="shrink-0" />
              <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                Products
              </span>
            </NavLink>
            <NavLink 
              to="/admin/create-product" 
              className={navLinkClass}
              onClick={handleNavClick}
              title={!isSidebarOpen ? 'Create Product' : ''}
            >
              <Package size={18} strokeWidth={1.5} className="shrink-0" />
              <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                Create Product
              </span>
            </NavLink>
            <NavLink 
              to="/admin/create-category" 
              className={navLinkClass}
              onClick={handleNavClick}
              title={!isSidebarOpen ? 'Create Category' : ''}
            >
              <FolderKanban size={18} strokeWidth={1.5} className="shrink-0" />
              <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                Create Category
              </span>
            </NavLink>
            <NavLink 
              to="/admin/users" 
              className={navLinkClass}
              onClick={handleNavClick}
              title={!isSidebarOpen ? 'Users' : ''}
            >
              <Users size={18} strokeWidth={1.5} className="shrink-0" />
              <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
                Users
              </span>
            </NavLink>
          </div>
        </nav>

        {/* Footer Section - Logout (Always visible) */}
        <div className={`p-2 border-t border-gray-200 shrink-0`}>
          <button 
            className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all cursor-pointer ${!isSidebarOpen ? 'lg:justify-center' : ''}`}
            title={!isSidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={18} strokeWidth={1.5} className="shrink-0" />
            <span className={`transition-all duration-300 whitespace-nowrap ${isSidebarOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:hidden'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 shrink-0">
          <div className="flex items-center justify-between">
            <button
              id="admin-menu-button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <h1 className="text-sm font-medium text-gray-900">Admin Panel</h1>
            <div className="w-6" />
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;