import jwt from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    // Check if authorization headers are present
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeaders.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing or malformed",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("✅ Decoded user:", decoded); // Debug

    // Attach to req.user
    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT verification error:", error.message);

    // Provide specifine errro 
    if(error.name === "TokenExpiredError"){
        return res.status(401).json({
            success: false,
            message : 'Token has expired.'
        })
    }
    if(error.name === 'JsonWebTokenError'){
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
    return res.status(401).json({
      success: false,
      message: "Authenticatoin failed.",
    });
  }
};




// admin middlewaer
export const isAdmin = (req,res,next)=>{
    //  console.log("🔐 Checking admin access for:", req.user); // Debug
    if(!req.user){
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        })
    }
    if(req.user.role !== 1){
        return res.status(403).json({
            success: false,
            message: 'Admin access required'
        })
    }

    next();
}
