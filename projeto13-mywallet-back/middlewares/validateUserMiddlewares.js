import { cadastroSchema, loginSchema } from "../schemas/userSchemas.js";
import { db } from "./../dataBase.js";

export async function validateCadastro(req, res, next) {

    const {email} = req.body;

    const email_existente = await db.collection("usuarios").findOne({email}); // === findOne({email: email})
    if (email_existente) return res.sendStatus(409);

    const validate = cadastroSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);

    next();
}

export function validateLogin(req, res, next) {
    const validate = loginSchema.validate(req.body);
    if (validate.error) return res.sendStatus(400);

    next();
}