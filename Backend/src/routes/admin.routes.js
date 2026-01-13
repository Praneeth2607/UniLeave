import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { getStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authenticate, allowRoles("ADMIN"));
router.get("/stats", getStats);

export default router;
