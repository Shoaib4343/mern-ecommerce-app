import fs from "fs";
import path from "path";
import slugify from "slugify";

import productModel from "../models/product.model.js";
import {
  productValidation,
  updateProductValidation,
} from "../validator/product.validator.js";
import {
  idParamValidator,
  slugParamValidator,
} from "../validator/category.validator.js";

// CREATE PORDUCT CONTROLLE || METHOD POST
export const createProductController = async (req, res) => {
  try {
    // joi Product validation
    const { error } = productValidation.validate(req.body);
    if (error) {
      console.log("Error in product validation", error);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, description, category, quantity, shipping } = req.body;
    const image = req.file ? req.file.filename : null;

    // if not image
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }
    // Create new porduct
    const product = new productModel({
      name,
      slug: slugify(name),
      description,
      category,
      quantity,
      shipping: shipping || false,
      image,
    });

   const saveProduct =  await product.save();

   const prodcutWithCategory = await productModel.findById(saveProduct._id).populate("category");

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product: prodcutWithCategory,
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
      return res.status(400).json({
        success: false,
        message: "No products found.",
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

// READ - Get single product by ID
export const getSingleProductController = async (req, res) => {
  try {
    // Joi id validaiton ;
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
      return res.status(400).json({
        success: false,
        message: "Product is not added yet.",
      });
    }

    res.status(200).json({
      success: true,
      message: "product fetch successfully.",
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
      return res.status(400).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetch successfully.",
      product,
    });
  } catch (error) {
    console.log("Error in fetching product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in fetch product.",
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
    const { name, description, category, quantity, shipping } = req.body;

    // find existing product by id
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Prepare update data
    const updateData = {
      name: name ?? existingProduct.name,
      slug: name ? slugify(name) : existingProduct.slug,
      description: description ?? existingProduct.description,
      category: category ?? existingProduct.category,
      quantity: quantity ?? existingProduct.quantity,
      shipping: shipping ?? existingProduct.shipping,
    };

    // If new image is uploaded
    if (req.file) {
      // Delete old image
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
      updateProduct,
    });
  } catch (error) {
    console.log("Error in update product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in update product.",
    });
  }
};

// DELETE - Delete signle product by id
export const deleteProductController = async (req, res) => {
  try {
    const { error } = idParamValidator.validate(req.params);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }


    // params
    const {id} = req.params;

    // find product
    const product = await productModel.findById(id);

    if(!product){
      return res.status(400).json({
        success: false,
        message: "Product not found."
      })
    };

    // Delete iamge
    const imagePath = path.join("server/uploads",product.image);
    if(fs.existsSync(imagePath)){
      fs.unlinkSync(imagePath);
    };

    // delete prodcut 
    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    })

  } catch (error) {
    console.log("Error in deleting product.", error.message);
    res.status(500).json({
      success: false,
      message: "Error in deleting products",
    });
  }
};
