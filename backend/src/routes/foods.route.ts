import {Router, Request, Response, NextFunction,Express} from "express";
import { sample_foods, sample_tags } from "../sample_data";

const router = Router();

router.get("/", (req: Request, res: Response, next:NextFunction) => {
    res.send(sample_foods)
});

router.get("/search/:searchTerm", (req: Request, res: Response, next:NextFunction) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
        .filter((food) => food.name.toLowerCase()
            .includes(searchTerm.toLowerCase()));
    res.send(foods);
});

router.get("/tags", (req: Request, res: Response,next:NextFunction) => {
    res.send(sample_tags)
});

router.get("/tags/:tag", (req: Request, res: Response,next:NextFunction) => {
    const reqtag = req.params.tag;
    const foods = sample_foods
        .filter((food) => food.tags
            .includes(reqtag));
    res.send(foods);
});

router.get("/:foodId", (req: Request, res: Response,next:NextFunction) => {
    const foodId = req.params.foodId;
    const food = sample_foods
        .filter((food) => food.id == foodId);
    res.send(food);
});

export default router;
