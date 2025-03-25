import express from "express";
import  controller from "./controllers.js"
import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./errorHandler.js";
import cors from "cors"
const app = express();

const prisma = new PrismaClient()
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
app.use(cors())
app.use(express.json())
app.get("/records", controller.get_all_error_records);
app.get("/records/:id", controller.get_error_record);
app.post("/records",
    body('workstation')
    .notEmpty()
    .withMessage("No workstation specified.")
    .custom(async workstation => {
        const workstations = await prisma.structures.findMany({
            where: {
                type: 'workstation'
            }
        })
        const result = workstations.filter(fullWorkstation => {
            console.log('workstation: ',workstation, 'fullWorkstation: ', fullWorkstation.name)
            return fullWorkstation.name == workstation
        })
        if(result.length !== 1){
            throw new Error('Invalid workstation')
        }
    }),
    body('tableId')
    .notEmpty()
    .withMessage('No tableId specified')
    .custom(async tableId => {
        const records = await prisma.structures.findMany({
            where: {
                type: 'table'
            }
        })
        const result = records.filter(record => {
            return record.tableId === tableId
        })
        if(result.length !== 1){
            throw new Error('Invalid tableId')
        }
    }),
    body('robotId')
    .notEmpty()
    .withMessage('No robotId specified')
    .custom(async robotId => {
        const records = await prisma.structures.findMany({
            where: {
                type: 'robot'
            }
        })
        const result = records.filter(record => {
            return record.robotId === robotId
        })
        if(result.length !== 1){
            throw new Error('Invalid robotId')
        }
    }),
    body('content')
    .trim()
    .notEmpty()
    .withMessage('No content provided')
    .isLength({
        max: 50
    })
    .withMessage('Content too long'),
    errorHandler,
    controller.save_error_record);
app.put("/records/:id", controller.update_error_record);
app.delete("/records", controller.delete_all_error_records);
app.delete("/records/:id", controller.delete_error_record);
app.listen(3000, () => console.log(`server listening on port ${3000}`));
