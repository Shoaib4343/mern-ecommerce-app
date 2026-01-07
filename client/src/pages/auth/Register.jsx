// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from "lucide-react";
// import { RegisterUserApi } from "../../services/auth.api";
// import toast from "react-hot-toast";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
//   };

//   // Frontend validation
//   const validateForm = () => {
//     const validation = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       validation.name = "Name is required";
//     } else if (formData.name.trim().length < 3) {
//       validation.name = "Name must be at least 3 characters long";
//     } else if (formData.name.trim().length > 100) {
//       validation.name = "Name cannot exceed 100 characters";
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       validation.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       validation.email = "Email must be a valid email address";
//     }

//     // Password validation - match backend Joi schema
//     if (!formData.password) {
//       validation.password = "Password is required";
//     } else {
//       const passwordErrors = [];
      
//       if (formData.password.length < 8) {
//         passwordErrors.push("Password must be at least 8 characters long");
//       }
//       if (formData.password.length > 128) {
//         passwordErrors.push("Password cannot exceed 128 characters");
//       }
//       if (!/[a-z]/.test(formData.password)) {
//         passwordErrors.push("Password must contain at least one lowercase letter");
//       }
//       if (!/[A-Z]/.test(formData.password)) {
//         passwordErrors.push("Password must contain at least one uppercase letter");
//       }
//       if (!/\d/.test(formData.password)) {
//         passwordErrors.push("Password must contain at least one number");
//       }
//       if (!/[@$!%*?&]/.test(formData.password)) {
//         passwordErrors.push("Password must contain at least one special character (@$!%*?&)");
//       }

//       if (passwordErrors.length > 0) {
//         validation.password = passwordErrors[0]; // Show first error in form
//         validation.passwordErrors = passwordErrors; // Store all errors for toast
//       }
//     }

//     // Phone validation (optional but if provided, validate)
//     if (formData.phone && formData.phone.trim()) {
//       if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
//         validation.phone = "Phone number format is invalid";
//       } else if (formData.phone.length < 10) {
//         validation.phone = "Phone number must be at least 10 characters";
//       } else if (formData.phone.length > 15) {
//         validation.phone = "Phone number cannot exceed 15 characters";
//       }
//     }

//     // Address validation
//     if (formData.address && formData.address.trim().length > 256) {
//       validation.address = "Address cannot exceed 256 characters";
//     }

//     // Terms agreement validation
//     if (!agreedToTerms) {
//       validation.terms = "You must agree to the Terms and Privacy Policy";
//     }

//     return validation;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Frontend validation
//     const validation = validateForm();

//     if (Object.keys(validation).length > 0) {
//       setErrors(validation);
      
//       // If there are multiple password errors, show them all in separate toasts
//       if (validation.passwordErrors && validation.passwordErrors.length > 1) {
//         validation.passwordErrors.forEach((err) => {
//           toast.error(err, {
//             duration: 4000,
//           });
//         });
//       } else {
//         // Show first error as toast for other fields
//         const firstError = Object.values(validation)[0];
//         toast.error(firstError);
//       }
//       return;
//     }

//     // Call the API to register the user
//     try {
//       setLoading(true);
//       setErrors({});
//       const response = await RegisterUserApi(formData);

//       if (response.data.success) {
//         toast.success(
//           response.data.message || "Registration successful! Please log in."
//         );

//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           phone: "",
//           address: "",
//         });
//         setAgreedToTerms(false);

//         // Redirect to login page
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
      
//       const errorData = error.response?.data?.error || error.response?.data?.message;
      
//       if (Array.isArray(errorData)) {
//         // Handle multiple validation errors
//         errorData.forEach((err) => toast.error(err, { duration: 4000 }));
//       } else {
//         // Handle single error or network error
//         const errorMessage = error.code === 'ERR_NETWORK' 
//           ? "Unable to connect to server. Please check your connection."
//           : errorData || "Registration failed. Please try again.";
//         toast.error(errorMessage);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-50 flex items-center justify-center px-6 py-12">
//       <div className="max-w-xl w-full">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-light text-gray-900 mb-3">
//             Create Account
//           </h1>
//           <p className="text-gray-600 text-sm">
//             Join us and start shopping today
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white border border-gray-100 p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name and Email Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Name Input */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-900 mb-2"
//                 >
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User
//                       size={18}
//                       strokeWidth={1.5}
//                       className="text-gray-400"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-3 border ${
//                       errors.name ? "border-red-300" : "border-gray-200"
//                     } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 {errors.name && (
//                   <p className="mt-1 text-xs text-red-600">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-900 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail
//                       size={18}
//                       strokeWidth={1.5}
//                       className="text-gray-400"
//                     />
//                   </div>
//                   <input
//                     type="text"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-4 py-3 border ${
//                       errors.email ? "border-red-300" : "border-gray-200"
//                     } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
//                     placeholder="john@example.com"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-1 text-xs text-red-600">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             {/* Phone and Password Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Phone Input */}
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-900 mb-2"
//                 >
//                   Phone Number{" "}
//                   <span className="text-gray-400 font-normal">(Optional)</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Phone
//                       size={18}
//                       strokeWidth={1.5}
//                       className="text-gray-400"
//                     />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     maxLength={15}
//                     className={`w-full pl-10 pr-4 py-3 border ${
//                       errors.phone ? "border-red-300" : "border-gray-200"
//                     } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
//                     placeholder="+1234567890"
//                   />
//                 </div>
//                 {errors.phone && (
//                   <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-900 mb-2"
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock
//                       size={18}
//                       strokeWidth={1.5}
//                       className="text-gray-400"
//                     />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`w-full pl-10 pr-12 py-3 border ${
//                       errors.password ? "border-red-300" : "border-gray-200"
//                     } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
//                     placeholder="********"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={18} strokeWidth={1.5} />
//                     ) : (
//                       <Eye size={18} strokeWidth={1.5} />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password ? (
//                   <p className="mt-1 text-xs text-red-600">{errors.password}</p>
//                 ) : (
//                   <p className="mt-1 text-xs text-gray-500">
//                     Min 8 characters with uppercase, lowercase, number & special character
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Address Input */}
//             <div>
//               <label
//                 htmlFor="address"
//                 className="block text-sm font-medium text-gray-900 mb-2"
//               >
//                 Address{" "}
//                 <span className="text-gray-400 font-normal">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute top-3 left-0 pl-3 pointer-events-none">
//                   <MapPin
//                     size={18}
//                     strokeWidth={1.5}
//                     className="text-gray-400"
//                   />
//                 </div>
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
//                   placeholder="123 Main Street, City, State, ZIP"
//                 />
//               </div>
//             </div>

//             {/* Terms Checkbox */}
//             <div>
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={agreedToTerms}
//                   onChange={(e) => {
//                     setAgreedToTerms(e.target.checked);
//                     if (errors.terms) {
//                       setErrors({ ...errors, terms: "" });
//                     }
//                   }}
//                   className={`mt-1 w-4 h-4 border-gray-300 focus:ring-0 ${
//                     errors.terms ? "border-red-300" : ""
//                   }`}
//                 />
//                 <label htmlFor="terms" className="text-sm text-gray-600">
//                   I agree to the{" "}
//                   <Link
//                     to="/terms"
//                     className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
//                   >
//                     Terms of Service
//                   </Link>{" "}
//                   and{" "}
//                   <Link
//                     to="/privacy"
//                     className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </label>
//               </div>
//               {errors.terms && (
//                 <p className="mt-1 text-xs text-red-600 ml-7">{errors.terms}</p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           {/* Sign In Link */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
//               >
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Additional Info */}
//         <p className="text-center text-xs text-gray-500 mt-6">
//           By creating an account, you'll be able to track orders, save items to
//           your wishlist, and receive exclusive offers.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;





















import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Shield } from "lucide-react";
import { RegisterUserApi } from "../../services/auth.api";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
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

    // Name validation
    if (!formData.name.trim()) {
      validation.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      validation.name = "Name must be at least 3 characters long";
    } else if (formData.name.trim().length > 100) {
      validation.name = "Name cannot exceed 100 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      validation.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validation.email = "Email must be a valid email address";
    }

    // Password validation - match backend Joi schema
    if (!formData.password) {
      validation.password = "Password is required";
    } else {
      const passwordErrors = [];
      
      if (formData.password.length < 8) {
        passwordErrors.push("Password must be at least 8 characters long");
      }
      if (formData.password.length > 128) {
        passwordErrors.push("Password cannot exceed 128 characters");
      }
      if (!/[a-z]/.test(formData.password)) {
        passwordErrors.push("Password must contain at least one lowercase letter");
      }
      if (!/[A-Z]/.test(formData.password)) {
        passwordErrors.push("Password must contain at least one uppercase letter");
      }
      if (!/\d/.test(formData.password)) {
        passwordErrors.push("Password must contain at least one number");
      }
      if (!/[@$!%*?&]/.test(formData.password)) {
        passwordErrors.push("Password must contain at least one special character (@$!%*?&)");
      }

      if (passwordErrors.length > 0) {
        validation.password = passwordErrors[0];
        validation.passwordErrors = passwordErrors;
      }
    }

    // Answer validation
    if (!formData.answer.trim()) {
      validation.answer = "Security answer is required";
    } else if (formData.answer.trim().length < 3) {
      validation.answer = "Answer must be at least 3 characters long";
    } else if (formData.answer.trim().length > 100) {
      validation.answer = "Answer cannot exceed 100 characters";
    }

    // Phone validation (optional but if provided, validate)
    if (formData.phone && formData.phone.trim()) {
      if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
        validation.phone = "Phone number format is invalid";
      } else if (formData.phone.length < 10) {
        validation.phone = "Phone number must be at least 10 characters";
      } else if (formData.phone.length > 15) {
        validation.phone = "Phone number cannot exceed 15 characters";
      }
    }

    // Address validation
    if (formData.address && formData.address.trim().length > 256) {
      validation.address = "Address cannot exceed 256 characters";
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      validation.terms = "You must agree to the Terms and Privacy Policy";
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

    // Call the API to register the user
    try {
      setLoading(true);
      setErrors({});
      const response = await RegisterUserApi(formData);

      if (response.data.success) {
        toast.success(
          response.data.message || "Registration successful! Please log in."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          answer: "",
        });
        setAgreedToTerms(false);

        // Redirect to login page
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      
      const errorData = error.response?.data?.error || error.response?.data?.message;
      
      if (Array.isArray(errorData)) {
        errorData.forEach((err) => toast.error(err, { duration: 4000 }));
      } else {
        const errorMessage = error.code === 'ERR_NETWORK' 
          ? "Unable to connect to server. Please check your connection."
          : errorData || "Registration failed. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Join us and start shopping today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.name ? "border-red-300" : "border-gray-200"
                    } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

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
                    <Mail
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
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
            </div>

            {/* Phone and Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Phone Number{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={15}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.phone ? "border-red-300" : "border-gray-200"
                    } text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors`}
                    placeholder="+1234567890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
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
                    <Lock
                      size={18}
                      strokeWidth={1.5}
                      className="text-gray-400"
                    />
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
                {errors.password ? (
                  <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    Min 8 characters with uppercase, lowercase, number & special character
                  </p>
                )}
              </div>
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
                  placeholder="Your mother's maiden name"
                />
              </div>
              {errors.answer ? (
                <p className="mt-1 text-xs text-red-600">{errors.answer}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Used for account recovery. Choose something memorable.
                </p>
              )}
            </div>

            {/* Address Input */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Address{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-400"
                  />
                </div>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  placeholder="123 Main Street, City, State, ZIP"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors({ ...errors, terms: "" });
                    }
                  }}
                  className={`mt-1 w-4 h-4 border-gray-300 focus:ring-0 ${
                    errors.terms ? "border-red-300" : ""
                  }`}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-gray-900 underline underline-offset-2 hover:text-gray-600"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-600 ml-7">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
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
          By creating an account, you'll be able to track orders, save items to
          your wishlist, and receive exclusive offers.
        </p>
      </div>
    </div>
  );
};

export default Register;