import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import cors from "cors"
import foodRoutes from "./routes/foods.route";
import userRoutes from "./routes/user.route"
import { dbConnect } from './configs/db.config';
dbConnect();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.use("/api/foods",foodRoutes);
app.use("/api/users",userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { 
    console.log("Website served on http://localhost:" + PORT);
})