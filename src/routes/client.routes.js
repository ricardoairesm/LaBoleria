import { Router } from "express";
import { validateSchema } from "../middleware/schemaValidator.js";
import clientSchema from "../schemas/clientSchema.js";
import { createClient } from "../controllers/clients.controller.js";


const router = Router();

router.post("/clients", validateSchema(clientSchema), createClient);

export default router;