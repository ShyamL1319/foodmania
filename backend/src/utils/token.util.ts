import jwt from "jsonwebtoken"
export const generateTokenResponse = (user: any) => { 
    return  jwt.sign({ email: user.email, isAdmin: user.isAdmin }, "JWT_SECRET_KEY", { expiresIn: "30d" });
}