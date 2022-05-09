import joi from "joi";
import { db } from "./../dataBase.js";

export async function postTransitions(req, res) {
    const transation = req.body;
    const {valor, token} = transation;

    const transationSchema = joi.object({
        token: joi.string().required(),
        type: joi.string().required(),
        valor: joi.string().required(),
        descricao: joi.string().required()
    })

    try {
        const validate = transationSchema.validate(transation);
        if (validate.error) {
            res.sendStatus(400);
            return;
        }

        const user = await db.collection("sessions").findOne({token: token});
        if (!user) {
            res.sendStatus(404);
            return;
        }
        db.collection("transations").insertOne({id: user.id, ...transation, valor: parseFloat(valor)});
        res.status(201).send("Transacao registrada com sucesso!");
        return;
    } catch (err) {
        res.status(500).send("erro ao conectar com o banco");
    }
}

export async function getSaldo(req, res) {
    const {token} = req.body;

    const user = await db.collection("sessions").findOne({token: token});
    if (!user) {
        res.sendStatus(404);
        return;
    }
    try{
        let saldo = 0;
        console.log(user);
        const transacoes = await db.collection("transations").find({id: user.id}).toArray();
        console.log(transacoes);
        transacoes.forEach(transacao => {
            if (transacao.type === "entrada") {
                saldo += transacao.valor;
            } else {
                saldo -= transacao.valor;
            }
        });
        console.log(saldo);
        res.status(200).send({saldo});
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function getHistorico(req, res) {
    const {token} = req.body;
    const user = await db.collection("sessions").findOne({token: token});
    if (!user) return res.sendStatus(404);
    try {
        const transacoes = await db.collection("transations").find({id: user.id}).toArray();
        res.status(200).send(transacoes);
    } catch (err) {
        res.sendStatus(500);
    }
}