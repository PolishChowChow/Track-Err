import { Router } from "express";
import controller from "../controllers/recordControllers.js";
import { body } from "express-validator";
import errorHandler from "../utils/errorHandler.js";
import { PrismaClient } from "@prisma/client";
const recordRouter = Router();
const prisma = new PrismaClient()

recordRouter.get("/", controller.get_all_error_records);
recordRouter.get("/:id", controller.get_error_record);
recordRouter.post(
  "/",
  body("workstation")
    .notEmpty()
    .withMessage("No workstation specified.")
    .custom(async (workstation) => {
      const result = await prisma.structures.findFirst({
        where: {
          type: "workstation",
          name: workstation,
        },
      });
      if (!result) {
        throw new Error("Invalid workstation");
      }
    }),
  body("tableId")
    .notEmpty()
    .withMessage("No tableId specified")
    .custom(async (tableId) => {
      const result = await prisma.structures.findFirst({
        where: {
          type: "table",
          name: tableId,
        },
      });
      if (!result) {
        throw new Error("Invalid tableId");
      }
    }),
  body("robotId")
    .notEmpty()
    .withMessage("No robotId specified")
    .custom(async (robotId) => {
      const result = await prisma.structures.findFirst({
        where: {
          type: "robot",
          name: robotId,
        },
      });
      if (!result) {
        throw new Error("Invalid robotId");
      }
    }),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("No content provided")
    .isLength({
      max: 50,
    })
    .withMessage("Content too long"),
  errorHandler,
  controller.save_error_record
);
recordRouter.put("/:id", controller.update_error_record);
recordRouter.delete("/", controller.delete_all_error_records);
recordRouter.delete("/:id", controller.delete_error_record);

export default recordRouter;
