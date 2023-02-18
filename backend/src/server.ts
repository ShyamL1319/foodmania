import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import { sample_foods, sample_tags, sample_users } from "./sample_data";
const app = express();

app.use(express.json());
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


app.use("/api/users/login", (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email == email && user.password == password);
    if (user) {
        res.json({...user, token : generateTokenResponse(user) });
        res.end();
    } else {
        res.status(400).send("User name or passord is not valid!");
    }
});


const generateTokenResponse =  (user:any) => { 
    return  jwt.sign({ email: user.email, isAdmin: user.isAdmin }, "JWT_SECRET_KEY", { expiresIn: "30d" });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { 
    console.log("Website served on http://localhost:" + PORT);
})