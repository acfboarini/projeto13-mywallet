import { v4 as uuid } from "uuid";
import joi from "joi";
import { db } from "./../dataBase.js";
import bcrypt from "bcrypt";

export async function postCadastro(req, res) {
    const new_cadastro = req.body;
    const {name, email, senha} = req.body;

    const email_existente = await db.collection("usuarios").findOne({email: email});
    if (email_existente) return res.sendStatus(409);

    const cadastroSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().required(),
        checkSenha: joi.ref("senha")
    });

    try {
        const validate = cadastroSchema.validate(new_cadastro);
        if (validate.error) return res.sendStatus(400);

        await db.collection("usuarios").insertOne({
            id: new Date().getTime(), 
            name, 
            email, 
            senha: bcrypt.hashSync(senha, 10)
        });
        res.status(201).send("Cadastrado com Sucesso");
        return;
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function postLogin(req, res) {
    const login = req.body;
    const {email, senha} = login;

    const loginSchema = joi.object({
        email: joi.string().email().required(),
        senha: joi.string().required(),
    });

    try {
        const validate = loginSchema.validate(login);
        if (validate.error) return res.sendStatus(400);

        const isUser = await db.collection("usuarios").findOne({email: email});
        if (!isUser) return res.sendStatus(404);

        if (isUser && bcrypt.compareSync(senha, isUser.senha)) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                token,
                id: isUser.id
            });
            return res.status(201).send({token, name: isUser.name});
        }
        return res.sendStatus(404);
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function logout(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    try {
        const user = await db.collection("sessions").findOne({token});
        if (!user) return res.sendStatus(404);

        const session = await db.collection("sessions").deleteOne({token});
        return res.status(200).send(session);
    } catch (err) {
        res.sendStatus(500);
    }
}