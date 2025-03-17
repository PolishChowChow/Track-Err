import express from "express";
import  controller from "./controllers.js"
import { body } from "express-validator";
import errorHandler from "./errorHandler.js";
const app = express();
const workstations = [
    "LP1",
    "LP2"
]
const tableIds = [
    "t101",
    "t102",
    "t301",
    "t302",
    "t303",
    "t304",
    "t50",
    "t60"
]
const robotIds = [
    "r01",
    "r02",
    "r03",
    "r04",
    "r05",
    "r06",
    "r07",
    "r08",
    "r09",
    "r10",
    "r11"
]

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get("/records", controller.get_all_error_records);
app.get("/records/:id", controller.get_error_record);
app.post("/records",
    body('workstation')
    .notEmpty()
    .withMessage("No workstation specified.")
    .custom(workstation => {
        return workstations.includes(workstation)
    })  
    .withMessage('Invalid workstation'),
    body('tableId')
    .notEmpty()
    .custom(tableId => {
        console.log(tableId)
        if(!tableIds.includes(tableId)){
            throw new Error('This tableId does not exist.')
        }
    }),
    body('robotId')
    .notEmpty()
    .custom(robotId => {
        if(!robotIds.includes(robotId)){
            throw new Error('This robotId does not exist.')
        }
    }),
    body('content')
    .trim()
    .notEmpty()
    .isLength({
        max: 50
    }),
    errorHandler,
    controller.save_error_record);
app.put("/records/:id", controller.update_error_record);
app.delete("/records", controller.delete_all_error_records);
app.delete("/records/:id", controller.delete_error_record);
app.listen(3000, () => console.log(`server listening on port ${3000}`));
