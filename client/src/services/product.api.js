

// import API from "./api";

// // CREATE PRODUCT || METHOD POST
// export const createProductApi = async (data) => {
//   return API.post("/product", data);
// };

// // GET ALL PRODUCTS || METHOD GET
// export const getAllProductApi = async () => {
//   return API.get("/product");
// };

// // GET SINGLE PRODUCT || METHOD GET
// export const getSingleProductApi = async (id) => {
//   return API.get(`/product/${id}`);
// };

// // UPDATE PRODUCT || METHOD POST
// export const updateProductApi = async (id, data) => {
//   return API.post(`/product/${id}`, data);
// };

// // DELETE PRODUCT || METHOD DELETE
// export const deleteProductApi = async (id) => {
//   return API.delete(`/product/${id}`);
// };



// // ✅ NEW: FILTER PRODUCTS || METHOD GET (with automatic POST fallback)
// export const filterProductsApi = async (filters) => {
//   try {
//     // Build query string from filters
//     const params = new URLSearchParams();

//     if (filters.search) {
//       params.append("search", filters.search);
//     }

//     if (filters.categories && filters.categories.length > 0) {
//       filters.categories.forEach((cat) => params.append("categories", cat));
//     }

//     if (filters.minPrice !== undefined && filters.minPrice !== null) {
//       params.append("minPrice", filters.minPrice);
//     }

//     if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
//       params.append("maxPrice", filters.maxPrice);
//     }

//     if (filters.availability && filters.availability.length > 0) {
//       filters.availability.forEach((avail) =>
//         params.append("availability", avail)
//       );
//     }

//     if (filters.sortBy) {
//       params.append("sortBy", filters.sortBy);
//     }

//     if (filters.page) {
//       params.append("page", filters.page);
//     }

//     if (filters.limit) {
//       params.append("limit", filters.limit);
//     }

//     const queryString = params.toString();

//     // ✅ PERFORMANCE: Auto-switch to POST if URL too long
//     // Prevents "Request URI too long" errors with many filters
//     if (queryString.length > 1500) {
//       console.log("Query too long, using POST instead of GET");
//       return API.post("/product/filter", filters);
//     }

//     // Use GET for normal queries (better for caching & bookmarking)
//     return API.get(`/product/filter?${queryString}`);
//   } catch (error) {
//     console.error("Error filtering products:", error);
//     throw error;
//   }
// };
























import API from "./api";

// CREATE PRODUCT || METHOD POST
export const createProductApi = async (data) => {
  return API.post("/product", data);
};

// GET ALL PRODUCTS || METHOD GET
export const getAllProductApi = async () => {
  return API.get("/product");
};

// GET SINGLE PRODUCT || METHOD GET
export const getSingleProductApi = async (id) => {
  return API.get(`/product/${id}`);
};

// UPDATE PRODUCT || METHOD POST
export const updateProductApi = async (id, data) => {
  return API.post(`/product/${id}`, data);
};

// DELETE PRODUCT || METHOD DELETE
export const deleteProductApi = async (id) => {
  return API.delete(`/product/${id}`);
};

// ✅ NEW: GET RELATED PRODUCTS || METHOD GET
export const getRelatedProductsApi = async (id, limit = 8) => {
  return API.get(`/product/${id}/related?limit=${limit}`);
};

// ✅ FILTER PRODUCTS || METHOD GET (with automatic POST fallback)
export const filterProductsApi = async (filters) => {
  try {
    // Build query string from filters
    const params = new URLSearchParams();

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((cat) => params.append("categories", cat));
    }

    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      params.append("minPrice", filters.minPrice);
    }

    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      params.append("maxPrice", filters.maxPrice);
    }

    if (filters.availability && filters.availability.length > 0) {
      filters.availability.forEach((avail) =>
        params.append("availability", avail)
      );
    }

    if (filters.sortBy) {
      params.append("sortBy", filters.sortBy);
    }

    if (filters.page) {
      params.append("page", filters.page);
    }

    if (filters.limit) {
      params.append("limit", filters.limit);
    }

    const queryString = params.toString();

    // ✅ PERFORMANCE: Auto-switch to POST if URL too long
    // Prevents "Request URI too long" errors with many filters
    if (queryString.length > 1500) {
      console.log("Query too long, using POST instead of GET");
      return API.post("/product/filter", filters);
    }

    // Use GET for normal queries (better for caching & bookmarking)
    return API.get(`/product/filter?${queryString}`);
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};