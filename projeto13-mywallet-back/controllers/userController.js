import { db } from "./../dataBase.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export async function postCadastro(req, res) {

    const {name, email, senha} = req.body;
    try {
        await db.collection("usuarios").insertOne({
            name, 
            email, 
            senha: bcrypt.hashSync(senha, 10)
        });
        return res.status(201).send("Cadastrado com Sucesso");
    } catch (err) {
        return res.sendStatus(500);
    }
}

export async function postLogin(req, res) {

    const {email, senha} = req.body;
    try {
        const user = await db.collection("usuarios").findOne({email}); // === findOne({email: email})
        if (!user) return res.sendStatus(404);

        if (user && bcrypt.compareSync(senha, user.senha)) {
            const token = uuid();
            await db.collection("sessions").insertOne({token, id: user._id});
            return res.status(201).send({token, name: user.name});
        }
        return res.sendStatus(404);
    } catch (err) {
        return res.sendStatus(500);
    }
}

export async function logout(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return sendStatus(403);

    try {
        await db.collection("sessions").deleteOne({token});
        return res.status(200);
    } catch (err) {
        return res.sendStatus(500);
    }
}