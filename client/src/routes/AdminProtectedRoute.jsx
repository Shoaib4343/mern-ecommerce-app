import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { checkAdminAuthApi } from "../services/auth.api";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

const AdminProtectedRoute = () => {
  const { auth, loading: authLoading } = useAuth();
  const [IsAdminAuthorize, setIsAdminAuthorize] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await checkAdminAuthApi();
        if (res?.data?.success) {
          setIsAdminAuthorize(true);
        } else {
          setIsAdminAuthorize(false);
        }
      } catch (error) {
        console.log("Error in admin auth check:", error);
        toast.error(
          error?.response?.data?.message || "Please login as admin to continue"
        );
        setIsAdminAuthorize(false);
      }
    };
    // Wait for auth context to load before checking
    if (!authLoading) {
      if (auth?.token && auth?.user?.role === 1) {
        checkAdminAuth();
      } else {
        setIsAdminAuthorize(false);
      }
    }
  }, [auth?.token, auth?.user?.role, authLoading]);

  // Show loading while auth context is initializing or while checking admin authorization
  if (authLoading || IsAdminAuthorize === null) {
   return <Spinner text="Checking admin authorization..." />
  }

  return IsAdminAuthorize ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} replace />
  );
};

export default AdminProtectedRoute;
