import express from "express";
import { createProductController, deleteProductController, getAllProductController, getSingleProductController, getSingleProductWithSlugController, updateProductController } from "../controllers/product.controller.js";
import upload from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/product",upload.single("image"), createProductController)    // CREATE PORDUCT || METHOD POST
router.get("/product", getAllProductController)    // GET ALL PRODUCTS || METHOD GET
router.get("/product/:id", getSingleProductController)    // GET SINGLE PRODUCT WITH ID || METHOD GET
router.get("/product/slug/:slug", getSingleProductWithSlugController)    // GET SINGLE PRODUCT WITH ID || METHOD GET
router.post("/product/:id",upload.single("image"), updateProductController)    // UPDATE PRODUCT WITH ID || METHOD POST
router.delete("/product/:id", deleteProductController)    // delete PRODUCT WITH ID || METHOD DELETE


export default router;