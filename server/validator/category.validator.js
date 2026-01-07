import Joi from "joi";

// Create Category Validator
export const createCategoryValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .trim()
    .required()
    .label("Category Name"), // <-- This makes built-in messages more readable
});

// Update Category Validator
export const updateCategoryValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .trim()
    .required()
    .label("Category Name"),
});


// slug param validatoer
export const slugParamValidator = Joi.object({
  slug: Joi.string().lowercase().trim().required(),
});

// id params validator
export const idParamValidator = Joi.object({
  id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
});