import joi from "joi";
import { db } from "./../dataBase.js";
import dayjs from "dayjs";

export async function getTransations(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    const user = await db.collection("sessions").findOne({token: token});
    if (!user) return res.sendStatus(404);
    try {
        const transacoes = await db.collection("transations").find({id: user.id}).toArray();
        res.status(200).send(transacoes);
    } catch (err) {
        res.sendStatus(500);
    }
}

export async function postTransitions(req, res) {
    const transation = req.body;
    const {valor} = transation;
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    const transationSchema = joi.object({
        type: joi.string().required(),
        valor: joi.number().required(),
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
        const date = dayjs().format("DD/MM");
        db.collection("transations").insertOne({id: user.id, date, ...transation, valor: parseFloat(valor)});
        res.status(201).send("Transacao registrada com sucesso!");
        return;
    } catch (err) {
        res.status(500).send("erro ao conectar com o banco");
    }
}

export async function getSaldo(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    const user = await db.collection("sessions").findOne({token: token});
    if (!user) {
        res.sendStatus(404);
        return;
    }
    try{
        let saldo = 0;
        const transacoes = await db.collection("transations").find({id: user.id}).toArray();
        transacoes.forEach(transacao => {
            if (transacao.type === "entrada") {
                saldo += transacao.valor;
            } else {
                saldo -= transacao.valor;
            }
        });
        res.status(200).send({saldo: saldo.toFixed(2)});
    } catch (err) {
        res.sendStatus(500);
    }
}