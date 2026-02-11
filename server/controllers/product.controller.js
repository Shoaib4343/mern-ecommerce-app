import fs from "fs";
import path from "path";
import slugify from "slugify";

import productModel from "../models/product.model.js";
import {
  productValidation,
  updateProductValidation,
  filterProductValidation,
} from "../validator/product.validator.js";
import {
  idParamValidator,
  slugParamValidator,
} from "../validator/category.validator.js";

//  Helper function to escape regex special characters (SECURITY)
const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// CREATE PRODUCT CONTROLLER || METHOD POST
export const createProductController = async (req, res) => {
  try {
    const { error } = productValidation.validate(req.body);
    if (error) {
      console.log("Error in product validation", error);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, description, price, category, quantity, shipping } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping: shipping || false,
      image,
    });

    const saveProduct = await product.save();
    const productWithCategory = await productModel
      .findById(saveProduct._id)
      .populate("category");

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: productWithCategory,
    });
  } catch (error) {
    console.log("error ", error.message);
    res.status(500).json({
      success: false,
      message: "Error in product",
    });
  }
};

// GET ALL PRODUCTS CONTROLLER || METHOD GET
export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found.",
        products: [],
      });
    }

    res.status(200).json({
      success: true,
      totalCount: products.length,
      products,
    });
  } catch (error) {
    console.log("Error in fetching all products.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in fetching all products.",
    });
  }
};

//  NEW: FILTER PRODUCTS CONTROLLER || METHOD GET/POST
export const filterProductController = async (req, res) => {
  try {
    // Validate query parameters
    const { error, value } = filterProductValidation.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      search,
      categories,
      minPrice,
      maxPrice,
      availability,
      sortBy,
      page,
      limit,
    } = value;

    // Build filter query
    let filterQuery = {};

    //  SECURITY: Escape regex special characters in search
    if (search && search.trim()) {
      const sanitizedSearch = escapeRegex(search.trim());
      filterQuery.$or = [
        { name: { $regex: sanitizedSearch, $options: "i" } },
        { description: { $regex: sanitizedSearch, $options: "i" } },
      ];
    }

    // Category filter
    if (categories) {
      const categoryArray = Array.isArray(categories) ? categories : [categories];
      if (categoryArray.length > 0) {
        filterQuery.category = { $in: categoryArray };
      }
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filterQuery.price = {};
      if (minPrice !== undefined) {
        filterQuery.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        filterQuery.price.$lte = maxPrice;
      }
    }

    // Availability filter
    if (availability) {
      const availabilityArray = Array.isArray(availability)
        ? availability
        : [availability];

      if (availabilityArray.length === 1) {
        if (availabilityArray.includes("inStock")) {
          filterQuery.quantity = { $gt: 0 };
        } else if (availabilityArray.includes("outOfStock")) {
          filterQuery.quantity = { $lte: 0 };
        }
      }
    }

    // Build sort query
    let sortQuery = {};
    switch (sortBy) {
      case "price-low":
        sortQuery = { price: 1 };
        break;
      case "price-high":
        sortQuery = { price: -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      case "rating":
        sortQuery = { createdAt: -1 }; // Fallback to newest since no rating field
        break;
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    //  PERFORMANCE: Run queries in parallel
    const [products, totalProducts] = await Promise.all([
      productModel
        .find(filterQuery)
        .populate("category")
        .sort(sortQuery)
        .limit(limit)
        .skip(skip),
      productModel.countDocuments(filterQuery)
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error in filtering products:", error);
    res.status(500).json({
      success: false,
      message: "Error in filtering products.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// READ - Get single product by ID
export const getSingleProductController = async (req, res) => {
  try {
    const { error } = idParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;
    const product = await productModel.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    console.log("Error in fetching product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in fetching product",
    });
  }
};

// READ - Get single product by slug
export const getSingleProductWithSlugController = async (req, res) => {
  try {
    const { error } = slugParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { slug } = req.params;
    const product = await productModel.findOne({ slug }).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      product,
    });
  } catch (error) {
    console.log("Error in fetching product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in fetching product.",
    });
  }
};

// UPDATE - Update single product by id
export const updateProductController = async (req, res) => {
  try {
    const { error: idError } = idParamValidator.validate(req.params);
    if (idError) {
      return res.status(400).json({
        success: false,
        message: idError.details[0].message,
      });
    }

    const { error: bodyError } = updateProductValidation.validate(req.body);
    if (bodyError) {
      return res.status(400).json({
        success: false,
        message: bodyError.details[0].message,
      });
    }

    const { id } = req.params;
    const { name, description, price, category, quantity, shipping } = req.body;

    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const updateData = {
      name: name ?? existingProduct.name,
      slug: name ? slugify(name) : existingProduct.slug,
      description: description ?? existingProduct.description,
      price: price ?? existingProduct.price,
      category: category ?? existingProduct.category,
      quantity: quantity ?? existingProduct.quantity,
      shipping: shipping ?? existingProduct.shipping,
    };

    if (req.file) {
      const oldImagePath = path.join("server/uploads", existingProduct.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.image = req.file.filename;
    }

    const updateProduct = await productModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("category");

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updateProduct,
    });
  } catch (error) {
    console.log("Error in update product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in update product.",
    });
  }
};

// DELETE - Delete single product by id
export const deleteProductController = async (req, res) => {
  try {
    const { error } = idParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const imagePath = path.join("server/uploads", product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in deleting product",
    });
  }
};




//  GET RELATED PRODUCTS CONTROLLER || METHOD GET
export const getRelatedProductsController = async (req, res) => {
  try {
    const { error } = idParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 8;

    // Get the current product
    const currentProduct = await productModel.findById(id);
    
    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    //  SMART ALGORITHM: Find related products based on:
    // 1. Same category (priority)
    // 2. Similar price range (±30%)
    // 3. Exclude current product
    // 4. Only in-stock items
    
    const priceMin = currentProduct.price * 0.7;
    const priceMax = currentProduct.price * 1.3;

    const relatedProducts = await productModel
      .find({
        _id: { $ne: id },
        category: currentProduct.category,
        quantity: { $gt: 0 },
        price: { $gte: priceMin, $lte: priceMax },
      })
      .populate("category")
      .limit(limit)
      .select("-__v");

    //  FALLBACK: If not enough related products, get more from same category
    if (relatedProducts.length < limit) {
      const additionalProducts = await productModel
        .find({
          _id: { 
            $ne: id,
            $nin: relatedProducts.map(p => p._id)
          },
          category: currentProduct.category,
          quantity: { $gt: 0 },
        })
        .populate("category")
        .limit(limit - relatedProducts.length)
        .select("-__v");

      relatedProducts.push(...additionalProducts);
    }

    res.status(200).json({
      success: true,
      message: "Related products fetched successfully.",
      totalCount: relatedProducts.length,
      products: relatedProducts,
    });

  } catch (error) {
    console.error("Error in fetching related products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in fetching related products.",
    });
  }
};
