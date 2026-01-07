// layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import  { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-center"  />
      <main className="grow bg-gray-100 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;