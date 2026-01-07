import Joi from 'joi';

// Registration - REMOVE role or set default in controller
export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Name is required'
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/\d/, 'number')
    .pattern(/[@$!%*?&]/, 'special character')
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'Password is required'
    }),

  phone: Joi.string()
    .trim()
    .optional()
    .allow('')
    .pattern(/^\+?[\d\s\-()]+$/)
    .min(10)
    .max(20)
    .messages({
      'string.pattern.base': 'Phone number format is invalid',
      'string.min': 'Phone number must be at least 10 characters',
      'string.max': 'Phone number cannot exceed 20 characters'
    }),

  address: Joi.string()
    .trim()
    .max(256)
    .optional()
    .allow('')
    .messages({
      'string.base': 'Address must be a string',
      'string.max': 'Address cannot exceed 256 characters'
    }),
     answer: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Answer must be a string',
      'string.empty': 'Answer cannot be empty',
      'string.min': 'Answer must be at least 3 characters long',
      'string.max': 'Answer cannot exceed 100 characters',
      'any.required': 'Security answer is required'
    }),
  // REMOVED role field - set in controller instead
});

// Login - simplified
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required'
    }),
});


// Forgot Password
export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),

  answer: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Answer must be a string',
      'string.empty': 'Answer cannot be empty',
      'string.min': 'Answer must be at least 3 characters long',
      'string.max': 'Answer cannot exceed 100 characters',
      'any.required': 'Security answer is required'
    }),

  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(/[a-z]/, 'lowercase letter')
    .pattern(/[A-Z]/, 'uppercase letter')
    .pattern(/\d/, 'number')
    .pattern(/[@$!%*?&]/, 'special character')
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 128 characters',
      'string.pattern.name': 'Password must contain at least one {#name}',
      'any.required': 'New password is required'
    }),
});
