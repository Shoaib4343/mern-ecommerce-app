import Joi from "joi";

// Validate product data for CREATE
export const productValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  shipping: Joi.boolean().optional(),
});

// ✅ FIXED: All fields optional for UPDATE
export const updateProductValidation = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().min(0).optional(), // ✅ Now optional
  category: Joi.string().optional(),
  quantity: Joi.number().min(0).optional(),
  shipping: Joi.boolean().optional(),
}).min(1); // At least one field required




// ✅ NEW: Validate filter query parameters
export const filterProductValidation = Joi.object({
  // Search with max length to prevent abuse
  search: Joi.string().allow('').max(100).optional(),
  
  // Categories
  categories: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.array().items(Joi.string()).max(50) // ✅ Limit to 50 categories
    )
    .optional(),
  
  // Price range
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
  
  // Availability
  availability: Joi.alternatives()
    .try(
      Joi.string().valid('inStock', 'outOfStock'),
      Joi.array().items(Joi.string().valid('inStock', 'outOfStock')).max(2)
    )
    .optional(),
  
  // Sorting
  sortBy: Joi.string()
    .valid('featured', 'price-low', 'price-high', 'newest', 'rating')
    .optional()
    .default('featured'),
  
  // Pagination
  page: Joi.number().min(1).max(1000).optional().default(1), // ✅ Max page limit
  limit: Joi.number().min(1).max(100).optional().default(12),
})
.custom((value, helpers) => {
  // ✅ Validate that minPrice <= maxPrice
  if (value.minPrice !== undefined && value.maxPrice !== undefined) {
    if (value.minPrice > value.maxPrice) {
      return helpers.error('any.invalid', { 
        message: 'minPrice cannot be greater than maxPrice' 
      });
    }
  }
  return value;
});