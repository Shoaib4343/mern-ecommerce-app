import express from 'express';
import { loginUserController, registerUserController } from '../controllers/auth.controller.js';
import { validateMiddleware } from '../middlewares/joiValidate.middleware.js';
import { loginSchema, registerSchema } from '../../validator/auth.validator.js';
import { isAdmin, requireSignIn } from '../middlewares/auth.middleware.js';
const router = express.Router();


// Define authentication routes here

// Register route || METHOD POST
router.post('/register',validateMiddleware(registerSchema), registerUserController);
// Login route || METHOD POST
router.post('/login',validateMiddleware(loginSchema), loginUserController);
// test route
router.get('/test', requireSignIn, isAdmin, (req, res) => {
    res.send("TEST route is working...");
}); 


export default router;