import express from "express"
import cors from "cors"
import { sample_foods, sample_tags } from "./sample_data";

const app = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req: express.Request, res: express.Response) => {
    res.send(sample_foods)
});

app.get("/api/foods/search/:searchTerm", (req: express.Request, res: express.Response) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
        .filter((food) => food.name.toLowerCase()
            .includes(searchTerm.toLowerCase()));
    res.send(foods);
});

app.get("/api/foods/tags", (req: express.Request, res: express.Response) => {
    res.send(sample_tags)
});

app.get("/api/foods/tags/:tag", (req: express.Request, res: express.Response) => {
    const reqtag = req.params.tag;
    const foods = sample_foods
        .filter((food) => food.tags
            .includes(reqtag));
    res.send(foods);
});

app.get("/api/foods/:foodId", (req: express.Request, res: express.Response) => {
    const foodId = req.params.foodId;
    const food = sample_foods
        .filter((food) => food.id == foodId);
    res.send(food);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { 
    console.log("Website served on http://localhost:" + PORT);
})