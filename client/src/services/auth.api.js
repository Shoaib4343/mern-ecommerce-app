import API from "./api";


// Register User
export const RegisterUserApi = async(userData) =>{
    return await API.post('/register', userData);
}

// Login User
export const LoginUserApi = async(loginData) =>{
    return await API.post('/login', loginData);
}

// check user Auth
export const checkAuthApi = async()=>{
    const auth = JSON.parse(localStorage.getItem("auth"));
    if(!auth?.token){
        throw new Error("No auth token found");
    }
    return await API.get("/user-auth",{
        headers:{
            Authorization: `Bearer ${auth?.token}`
        }
    })
}


export const checkAdminAuthApi = async()=>{
    const auth = JSON.parse(localStorage.getItem("auth"));
    if(!auth?.token){
        throw new Error("No auth token found");
    }

    return await API.get("/admin-auth",{
        headers:{
            Authorization: `Bearer ${auth?.token}`
        }
    })
}



// Forgot Password
export const ForgotPasswordApi = async(formData)=>{
    return await API.post('/forgot-password', formData);
}