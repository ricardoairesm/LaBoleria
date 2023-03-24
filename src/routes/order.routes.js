import { Router } from "express";
import { validateSchema } from "../middleware/schemaValidator.js";
import orderSchema from "../schemas/orderSchema.js";
import { createOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/order", validateSchema(orderSchema), createOrder);

export default router;