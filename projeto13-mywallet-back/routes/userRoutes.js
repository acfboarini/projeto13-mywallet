import express from "express";
import { postCadastro, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/cadastro", postCadastro);

userRouter.post("/login", postLogin);

export default userRouter;