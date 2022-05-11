import express from "express";
import { getTransations, getSaldo, postTransitions } from "../controllers/transacoesController.js";

const transacoesRouter = express.Router();

transacoesRouter.post("/transation", postTransitions);

transacoesRouter.get("/saldo", getSaldo);

transacoesRouter.get("/transations", getTransations);

export default transacoesRouter;