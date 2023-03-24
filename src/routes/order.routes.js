import { Router } from "express";
import { validateSchema } from "../middleware/schemaValidator.js";
import orderSchema from "../schemas/orderSchema.js";
import { createOrder, listOrdersById } from "../controllers/order.controller.js";
import { listOrders } from "../controllers/order.controller.js";

const router = Router();

router.post("/order", validateSchema(orderSchema), createOrder);
router.get("/orders",listOrders);
router.get("/orders/:id",listOrdersById);

export default router;