import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Shield, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { ForgotPasswordApi } from "../../services/auth.api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

    // Answer validation
    if (!formData.answer.trim()) {
      validation.answer = "Security answer is required";
    } else if (formData.answer.trim().length < 3) {
      validation.answer = "Answer must be at least 3 characters long";
    }

    // New Password validation
    if (!formData.newPassword) {
      validation.newPassword = "New password is required";
    } else {
      const passwordErrors = [];

      if (formData.newPassword.length < 8) {
        passwordErrors.push("Password must be at least 8 characters long");
      }
      if (formData.newPassword.length > 128) {
        passwordErrors.push("Password cannot exceed 128 characters");
      }
      if (!/[a-z]/.test(formData.newPassword)) {
        passwordErrors.push(
          "Password must contain at least one lowercase letter"
        );
      }
      if (!/[A-Z]/.test(formData.newPassword)) {
        passwordErrors.push(
          "Password must contain at least one uppercase letter"
        );
      }
      if (!/\d/.test(formData.newPassword)) {
        passwordErrors.push("Password must contain at least one number");
      }
      if (!/[@$!%*?&]/.test(formData.newPassword)) {
        passwordErrors.push(
          "Password must contain at least one special character (@$!%*?&)"
        );
      }

      if (passwordErrors.length > 0) {
        validation.newPassword = passwordErrors[0];
        validation.passwordErrors = passwordErrors;
      }
    }

    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const validation = validateForm();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);

      // If there are multiple password errors, show them all in separate toasts
      if (validation.passwordErrors && validation.passwordErrors.length > 1) {
        validation.passwordErrors.forEach((err) => {
          toast.error(err, {
            duration: 4000,
          });
        });
      } else {
        // Show first error as toast for other fields
        const firstError = Object.values(validation)[0];
        toast.error(firstError);
      }
      return;
    }

    // Call the API to reset password
    try {
      setLoading(true);
      setErrors({});

      // Replace this with your actual API call
      const res = await ForgotPasswordApi(formData);
      if (res.data.success) {
        toast.success(res.data.message);

        // Reset form
        setFormData({
          email: "",
          answer: "",
          newPassword: "",
        });

        // Redirect to login page
        navigate("/login");
      } else {
        toast.error(
          res.data.message || "Password reset failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Password reset failed:", error);

      const errorData =
        error.response?.data?.error || error.response?.data?.message;

      if (Array.isArray(errorData)) {
        errorData.forEach((err) => toast.error(err, { duration: 4000 }));
      } else {
        const errorMessage =
          error.code === "ERR_NETWORK"
            ? "Unable to connect to server. Please check your connection."
            : errorData || "Password reset failed. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your email and security answer to reset your password
          </p>
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

            {/* Security Answer Input */}
            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Security Answer
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="text"
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.answer ? "border-red-300" : "border-gray-200"
                  } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                  placeholder="Your security answer"
                />
              </div>
              {errors.answer ? (
                <p className="mt-1 text-xs text-red-600">{errors.answer}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  The answer you provided during registration
                </p>
              )}
            </div>

            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} strokeWidth={1.5} className="text-gray-400" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border ${
                    errors.newPassword ? "border-red-300" : "border-gray-200"
                  } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.newPassword ? (
                <p className="mt-1 text-xs text-red-600">
                  {errors.newPassword}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Min 8 characters with uppercase, lowercase, number & special
                  character
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          For security reasons, make sure to use a strong password that you
          haven't used before.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
