import express from "express";
import  controller from "./controllers.js"
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient()



app.get("/records", controller.get_all_error_records);
app.get("/records/:id", controller.get_error_record);
app.post("/records", controller.save_error_record);
app.put("/records/:id", controller.update_error_record);
app.delete("/records", controller.delete_all_error_records);
app.delete("/records/:id", controller.delete_error_record);


prisma.$connect().then(() => {
    app.listen(3000, () => console.log(`server listening on port ${3000}`));
}).catch(error => {
    console.log(error)
})
