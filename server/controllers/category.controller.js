import {
  createCategoryValidator,
  idParamValidator,
  slugParamValidator,
  updateCategoryValidator,
} from "../validator/category.validator.js";
import categoryModel from "../models/category.model.js";
import slugify from "slugify";

// CREATE CATEGORY || METHOD POST
export const createCategoryController = async (req, res) => {
  try {
    //  Validate the request body
    const { error } = createCategoryValidator.validate(req.body);
    if (error)
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });

    //   Destruing the name from the req.body
    const { name } = req.body;

    //  Check if category already exists
    const existingCategory = await categoryModel.findOne({
      slug: slugify(name),
    });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    //  Create new category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    //  Send success response
    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Error in create category:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in create category.",
    });
  }
};

// UPDATE CATEGORY || METHOD POST
export const updateCategoryController = async (req, res) => {
  try {
    // validate the req.body
    const { error } = updateCategoryValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // validate the req.params id
    const { error: idParamsError } = idParamValidator.validate(req.params);
    if (idParamsError) {
      return res.status(400).json({
        success: false,
        message: idParamsError.details[0].message,
      });
    }
    const { id } = req.params;
    const { name } = req.body;

    // Find existing category
    const existingCategory = await categoryModel.findOne({
      slug: slugify(name),
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Another category with this name already exists.",
      });
    }

    // update category
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.log("Error in updating category.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in updating category.",
    });
  }
};

// GET ALL CATEGORIES|| METHOD GET
export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (categories.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No categories found.",
        categories: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully.",
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching categories.",
    });
  }
};

// GET SINGLE CATEGORY  || METHOD GET
export const getSingleCategoryController = async (req, res) => {
  try {
    // validate slug params
    const { error } = slugParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });

    // 3️⃣ Handle not found
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.", // Slug valid but doesn't exist
      });
    }

    res.status(200).json({
      success: true,
      message: "Category fetch successfully.",
      category,
    });
  } catch (error) {
    console.log("Error fetching category", error);
    res.status(500).json({
      success: false,
      message: "Error fetching category",
    });
  }
};

// DELETE CATEGORY || METHOD DELETE
export const deleteCategoryController = async (req, res) => {
  try {
    // validate id || req.params
    const { error } = idParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;

    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `${category.name} Category deleted successfully.`,
      category,
    });
  } catch (error) {
    console.log("Error in deleting category.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in deleting category.",
    });
  }
};
