import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}

export const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}