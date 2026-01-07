import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { checkAuthApi } from "../services/auth.api";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

const ProtectedRoute = () => {
  const { auth , loading: authLoading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await checkAuthApi();
        if ( res?.data?.success === true) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Error in protected route.", error);
        setIsAuthenticated(false);
      }
    };

    if (!authLoading) {
      if (auth?.token) {
        checkAuthentication();
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [auth?.token, authLoading]);
  
  if (authLoading || isAuthenticated === null) {
    return <Spinner  text="Checking authentication..."  />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{from: location.pathname}} />;
};

export default ProtectedRoute;
