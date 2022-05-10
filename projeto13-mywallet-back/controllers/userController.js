import { v4 as uuid } from "uuid";
import joi from "joi";
import { db } from "./../dataBase.js";

export async function postCadastro(req, res) {
    const new_cadastro = req.body;
    console.log(new_cadastro);
    const {name, email, senha} = req.body;

    const email_existente = await db.collection("usuarios").findOne({email: email});
    //console.log(email_existente);
    if (email_existente) {
        res.sendStatus(409);
        return;
    }

    const cadastroSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        senha: joi.string().required(),
        checkSenha: joi.ref("senha")
    });
    try {
        const validate = cadastroSchema.validate(new_cadastro);
        //console.log(validate.error);
        if (validate.error) {
            res.sendStatus(400);
            console.log(validate.error);
            return;
        }
        await db.collection("usuarios").insertOne({
            id: new Date().getTime(), 
            name, 
            email, 
            senha
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
        if (validate.error) {
            res.sendStatus(400);
            return;
        }
        const isUser = await db.collection("usuarios").findOne({email: email, senha: senha});
        if (!isUser) {
            res.sendStatus(404);
            return;
        }
        const token = uuid();
        await db.collection("sessions").insertOne({
            token,
            id: isUser.id
        });
        res.status(201).send(token);
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}