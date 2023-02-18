import {Router, Request, Response, NextFunction,Express} from "express";
import { sample_foods, sample_tags, sample_users } from "../sample_data";
import { generateTokenResponse } from "../utils/token.util";
const router = Router();
router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email == email && user.password == password);
    if (user) {
        res.json({...user, token : generateTokenResponse(user) });
        res.end();
    } else {
        res.status(400).send("User name or passord is not valid!");
    }
});

export default router;