import { Router } from "express";
import { validateSchema } from "../middleware/schemaValidator.js";
import cakeSchema from "../schemas/cakeSchema.js";
import { createCake } from "../controllers/cakes.controller.js";


const router = Router();

router.post("/cakes", validateSchema(cakeSchema), createCake);

export default router;