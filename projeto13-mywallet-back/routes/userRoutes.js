import express from "express";
import { logout, postCadastro, postLogin } from "../controllers/userController.js";
import { validateCadastro, validateLogin } from "../middlewares/validateUserMiddlewares.js";

const userRouter = express.Router();

userRouter.post("/cadastro", validateCadastro, postCadastro);
userRouter.post("/login", validateLogin, postLogin);
userRouter.delete("/logout", logout);

export default userRouter;