import API from "./api"

// GET ALL CATEGORIES || METHOD GET
export const getAllCategoryApi = async()=>{
    return API.get("/category")
}

// CREATE CATEGORY || METHOD POST
export const createCategoryApi = async(data)=>{
    return API.post("/category",data)
}

// DELETE CATEGORY || METHOD DELETE
export const deleteCategoryApi = async(id)=>{
    return API.delete(`/category/${id}`)
}


// UPDATE CATEGORY || METHOD POST
export const updateCategoryApi = async(id,data)=>{
    return API.post(`/category/${id}`,data)
}