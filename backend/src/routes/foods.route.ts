import {Router, Request, Response, NextFunction,Express} from "express";
import { sample_foods, sample_tags } from "../sample_data";
import asyncHandler from "express-async-handler"
import { FoodModel } from "../models/food.model";
import { UserModel } from "../models/user.model";
const router = Router();

router.post("/seed", asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const foodsCount = await FoodModel.countDocuments();
        if (foodsCount > 0) { 
            res.send("Seed is already done");
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seeding completed!");
    }
));

router.get("/", asyncHandler(async (req: Request, res: Response, next:NextFunction) => {
    const foods = await FoodModel.find();
    res.send(foods)
}));

router.get("/search/:searchTerm", asyncHandler( async (req: Request, res: Response, next:NextFunction) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({name:{$regex:searchRegex}})
    res.send(foods);
}));

router.get("/tags", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const tags = await FoodModel.aggregate([
        { $unwind: '$tags' },
        {
            $group: {
                _id: '$tags',
                count:{$sum:1}
            }
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                count:'$count'
            }
        }
    ]).sort({ couont: -1 });
    
    const all = {
        name: 'All',
        count : await FoodModel.countDocuments()
    }
    tags.unshift(all);
    res.send(tags)
}));

router.get("/tags/:tag", asyncHandler(async(req: Request, res: Response,next:NextFunction) => {
    const foods = await FoodModel.find({tags:req.params.tag})
    res.send(foods);
}));

router.get("/:foodId", asyncHandler(async(req: Request, res: Response,next:NextFunction) => {
    const food = await FoodModel.findById({_id:req.params.foodId})
    res.send(food);
}));

export default router;
