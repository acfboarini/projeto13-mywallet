import { db } from "./../dataBase.js";
import transationSchema from "../schemas/transationSchemas.js";
import dayjs from "dayjs";

export async function getTransations(req, res) {

    const {user} = res.locals;
    try {
        const transacoes = await db.collection("transations").find({id: user._id}).toArray();
        return res.status(200).send(transacoes.reverse());
    } catch(err) {
        return res.sendStatus(500);
    }
}

export async function postTransations(req, res) {

    const transation = req.body;
    const {valor} = transation;
    const {user} = res.locals;
    try {
        const validate = transationSchema.validate(transation);
        if (validate.error) return res.sendStatus(400);

        const date = dayjs().format("DD/MM");
        await db.collection("transations").insertOne({
            id: user._id, 
            date, 
            ...transation, 
            valor: parseFloat(valor).toFixed(2)
        });
        return res.status(201).send("Transacao registrada com sucesso!");
    } catch(err) {
        return res.status(500).send("erro ao conectar com o banco");
    }
}

export async function getSaldo(req, res) {

    const {user} = res.locals;
    try {
        let saldo = 0;
        let transacoes = await db.collection("transations").find({id: user._id}).toArray();
        transacoes.forEach(transacao => {
            if (transacao.type === "entrada") {
                saldo += parseFloat(transacao.valor);
            } else {
                saldo -= parseFloat(transacao.valor);
            }
        });
        return res.status(200).send({saldo: saldo.toFixed(2)});
    } catch(err) {
        return res.sendStatus(500);
    }
}