import { Router } from "express";
import structureController from "../controllers/structureControllers.js";
const structureRouter = Router();

structureRouter.get("/", structureController.get_all_structures);
structureRouter.get("/:id", structureController.get_structure);
structureRouter.post("/", structureController.save_structure);
structureRouter.put("/:id", structureController.update_structure);
structureRouter.delete("/", structureController.get_all_structures);
structureRouter.delete("/:id", structureController.delete_structure);

export default structureRouter;