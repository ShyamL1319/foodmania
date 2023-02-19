import jwt from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req:any, res:any, next:any) => { 
    const token = req.headers.access_token as string;
    console.log("token=========", token)
    if (!token) return res.status(HTTP_UNAUTHORIZED).send("Unauthorized User");
    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser;
        console.log("ddddasadd",decodedUser);
    } catch(error) { 
        res.status(HTTP_UNAUTHORIZED).send("Unauthorize User");
    }
    return next();
}