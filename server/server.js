import "dotenv/config";
import express from "express";
import cors from "cors";
import recordRouter from "./routes/recordRoutes.js";
import headerChecker from "./utils/headerChecker.js";
import internalServerErrorHandler from "./utils/internalServerErrorHandler.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(headerChecker);
app.use("/records", recordRouter);
app.use(internalServerErrorHandler);
app.listen(process.env.PORT_FOR_LISTENING, process.env.WORKING_PORT, () =>
  console.log(`server listening on port ${process.env.PORT_FOR_LISTENING}`)
);
