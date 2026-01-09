import Joi from "joi";

// Validate product data
export const productValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  category: Joi.string().required(), // assuming client sends category _id
  quantity: Joi.number().min(1).required(),
  shipping: Joi.boolean().optional(),
});


// NEW: Validate product data for UPDATE (all fields optional)
export const updateProductValidation = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  category: Joi.string().optional(),
  quantity: Joi.number().min(0).optional(),
  shipping: Joi.boolean().optional(),
}).min(1); // At least one field required