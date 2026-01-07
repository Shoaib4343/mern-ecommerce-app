import express from 'express';
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/category.controller.js';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/category",requireSignIn,isAdmin, createCategoryController)           // CREATE CATEGORY || METHOD POST
router.post("/category/:id",requireSignIn,isAdmin,updateCategoryController)        // UPDATE CATEGORY || METHOD POST
router.get("/category",getAllCategoryController)                                   // GET ALL CATEGORIES || METHOD GET
router.get("/category/:slug",getSingleCategoryController)                          // GET SINGLE CATEGORY || METHOD GET
router.delete("/category/:id",requireSignIn,isAdmin,deleteCategoryController)      // DElETE CATEGORY || METHOD DELETE

export default router