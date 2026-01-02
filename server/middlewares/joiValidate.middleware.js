export const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false, // ✅ Collects all validation errors instead of stopping at the first one
      stripUnknown: true, // ✅ Automatically removes any fields from the request that are not defined in the schema
    });
    if (error) {
      return res.status(400).json({
        success: false,
        // message: error.details[0].message
        error: error.details.map((err) => err.message),
      });
    }
    next();
  };
};





// Optional small improvement

// You could make it even more reusable by allowing validation for body, params, or query:

// const validate = (schema, property = 'body') => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req[property], {
//       abortEarly: false,
//       stripUnknown: true,
//     });
//     if (error) {
//       return res.status(400).json({
//         success: false,
//         error: error.details.map((err) => err.message),
//       });
//     }
//     next();
//   };
// };


// Usage examples:

// route.post('/register', validate(registerSchema), register) // body
// route.get('/user/:id', validate(idSchema, 'params'), getUser) // params
// route.get('/users', validate(querySchema, 'query'), getUsers) // query


// 💡 Conclusion:
// Your current middleware is already professional and works perfectly for most MERN apps. The optional tweak just makes it even more flexible for different request types