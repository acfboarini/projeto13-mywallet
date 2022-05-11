import express from "express";
import { getTransations, getSaldo, postTransations } from "../controllers/transacoesController.js";
import { getUser } from "../middlewares/userMiddlewares.js";

const transacoesRouter = express.Router();

transacoesRouter.post("/transation", getUser, postTransations);
transacoesRouter.get("/saldo", getUser, getSaldo);
transacoesRouter.get("/transations", getUser, getTransations);

export default transacoesRouter;