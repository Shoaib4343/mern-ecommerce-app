import express from "express";
import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  getSingleProductWithSlugController,
  updateProductController,
  filterProductController,
  getRelatedProductsController, 
} from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// CREATE PRODUCT || METHOD POST
router.post("/product", upload.single("image"), createProductController);

// GET ALL PRODUCTS || METHOD GET
router.get("/product", getAllProductController);

//  CRITICAL: Keep specific routes BEFORE dynamic routes to avoid collision

// FILTER PRODUCTS || METHOD GET (and POST for large queries)
router.get("/product/filter", filterProductController);
router.post("/product/filter", filterProductController);

// GET SINGLE PRODUCT WITH SLUG || METHOD GET
router.get("/product/slug/:slug", getSingleProductWithSlugController);

//   GET RELATED PRODUCTS BY ID || METHOD GET
router.get("/product/:id/related", getRelatedProductsController);

// GET SINGLE PRODUCT WITH ID || METHOD GET
router.get("/product/:id", getSingleProductController);

// UPDATE PRODUCT WITH ID || METHOD POST
router.post("/product/:id", upload.single("image"), updateProductController);

// DELETE PRODUCT WITH ID || METHOD DELETE
router.delete("/product/:id", deleteProductController);

export default router;