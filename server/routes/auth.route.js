import express from 'express';
import { forgotPasswordController, loginUserController, registerUserController } from '../controllers/auth.controller.js';
import { validateMiddleware } from '../middlewares/joiValidate.middleware.js';
import { forgotPasswordSchema, loginSchema, registerSchema } from '../validator/auth.validator.js';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
const router = express.Router();


// Define authentication routes here


router.post('/register',validateMiddleware(registerSchema), registerUserController);                  // Register route || METHOD POST
router.post('/login',validateMiddleware(loginSchema), loginUserController);                           // Login route || METHOD POST
router.post("/forgot-password",validateMiddleware(forgotPasswordSchema), forgotPasswordController);   // Forget Password || METHOD POST
router.get("/user-auth", requireSignIn, (req, res) => {res.status(200).json({success: true})});       // protected route user auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{res.status(200).json({success:true});});   // protected route admin auth
router.get('/test', requireSignIn, isAdmin, (req, res) => {res.send("TEST route is working...");});   // test route
export default router;