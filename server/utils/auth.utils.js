import bcrypt from 'bcrypt';

export const hashedPassword = async (password)=>{
    try {
        return await bcrypt.hash(password,10)  
    } catch (error) {
       throw new Error(`Failed to hash password: ${error.message}`);
    }
};

export const comparePassword = async (plainPassword,hash)=>{
    try {
        return await bcrypt.compare(plainPassword,hash)
    } catch (error) {
        throw new Error(`Failed to compare password: ${error.message}`);
    }
}