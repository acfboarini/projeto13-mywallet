import express from "express";
import { logout, postCadastro, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/cadastro", postCadastro);

userRouter.post("/login", postLogin);

userRouter.delete("/logout", logout);

export default userRouter;