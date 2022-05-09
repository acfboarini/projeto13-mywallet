import express from "express";
import transacoesRoutes from "./transacoesRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();
router.use(transacoesRoutes);
router.use(userRoutes);

export default router;