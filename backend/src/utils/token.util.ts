import jwt from "jsonwebtoken"
export const generateTokenResponse = (user: any) => {
    return  jwt.sign({ id:user.id,email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET!, { expiresIn: "30d" });
}