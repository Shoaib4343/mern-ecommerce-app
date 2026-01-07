import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { LoginUserApi } from "../../services/auth.api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Frontend validation
  const validateForm = () => {
    const validation = {};

    // Email validation
    if (!formData.email.trim()) {
      validation.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validation.email = "Email must be a valid email address";
    }

    // Password validation
    if (!formData.password) {
      validation.password = "Password is required";
    } else if (formData.password.length < 8) {
      validation.password = "Password must be at least 8 characters long";
    }

    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const validation = validateForm();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstError = Object.values(validation)[0];
      toast.error(firstError);
      return;
    }

    // Call the API to login the user
    try {
      setLoading(true);
      setErrors({});
      const response = await LoginUserApi(formData);

      if (response.data.success) {
        toast.success(
          response.data.message || "Login successful! Welcome back."
        );

        // Reset form
        setFormData({
          email: "",
          password: "",
        });

        // Update auth context
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        // Persist auth data in localStorage
        localStorage.setItem("auth", JSON.stringify(response.data));

        // Redirect to dashboard or home
        // navigate(location.state || "/");

        // const from = location.state?.from || "/";
        // navigate(from, { replace: true });

        const from = location.state?.from;
        const isAdmin = response.data.user.role === 1;

        // Determine safe redirect path
        let redirectPath;
        if (from) {
          const isAdminRoute = from.startsWith("/admin");
          // Only use 'from' if role matches the route type
          redirectPath =
            (isAdmin && isAdminRoute) || (!isAdmin && !isAdminRoute)
              ? from
              : (isAdmin ? '/admin/dashboard' : '/dashboard');
        } else {
          // No 'from' path, use default dashboard
          redirectPath = isAdmin ? "/admin/dashboard" : "/dashboard";
        }

        navigate(redirectPath, { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error);

      const errorData =
        error.response?.data?.error || error.response?.data?.message;

      if (Array.isArray(errorData)) {
        // Handle multiple validation errors
        errorData.forEach((err) => toast.error(err, { duration: 4000 }));
      } else {
        // Handle single error or network error
        const errorMessage =
          error.code === "ERR_NETWORK"
            ? "Unable to connect to server. Please check your connection."
            : errorData || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12 min-h-screen">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">Sign in to continue shopping</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border ${
                    errors.password ? "border-red-300" : "border-gray-200"
                  } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
