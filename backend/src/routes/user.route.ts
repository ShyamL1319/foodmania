import {Router, Request, Response, NextFunction,Express} from "express";
import { IUser, UserModel } from "../models/user.model";
import { sample_users } from "../sample_data";
import { generateTokenResponse } from "../utils/token.util";
import asyncHandler from "express-async-handler";
import bcryptjs from "bcryptjs"
const router = Router();

router.post("/seed", async (req: Request, res: Response) => { 
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
        res.send("Seeding already has been done!");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seeding completed!")

})
router.post("/login",asyncHandler( async(req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }) as any;
    if (!user) { 
        res.send("With this Email id No User exists");
    }
    const passwordMatch = await bcryptjs.compare(password, user.password);
    const token = await generateTokenResponse(user)

    if (passwordMatch) {
        res.json({ ...user?._doc,token });
        res.end();
    } else {
        res.status(400).send("User name or password is not valid!");
    }
}));

router.post("/register", asyncHandler( async(req: Request, res: Response) => {
    const {name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    
    if (user) { 
        res.status(400)
            .send("User already exist, Please login!");
        return;
    }
    const encPwd = await bcryptjs.hash(password, 10);
    const newUser: IUser = {
        id: '',
        name,
        email: email.toLowerCase(),
        password:encPwd,
        address,
        isAdmin:false
    }

    const dbUser = await UserModel.create(newUser) as any;
    const token = await generateTokenResponse({ dbUser });
    const data = { ...dbUser?._doc, token };
    delete data["password"];
    res.json(data);
    res.end();
}))

export default router;