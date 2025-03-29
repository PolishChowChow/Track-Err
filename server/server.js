import "dotenv/config"
import express from "express";
import cors from "cors"
import recordRouter from "./routes/recordRoutes.js";
const app = express();

app.use(cors())
app.use(express.json())
app.use('/records', recordRouter)

app.listen(3000 , "0.0.0.0", () => console.log(`server listening on port ${3000}`));
