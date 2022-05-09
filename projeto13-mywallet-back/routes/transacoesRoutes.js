import express from "express";
import { getHistorico, getSaldo, postTransitions } from "../controllers/transacoesController.js";

const transacoesRouter = express.Router();

/*transacoesRouter.delete("/logout", (req, res) => {

});*/

transacoesRouter.post("/transation", postTransitions);

transacoesRouter.get("/saldo", getSaldo);

transacoesRouter.get("/historico", getHistorico);

export default transacoesRouter;