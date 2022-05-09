import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import joi from "joi";
import { MongoClient } from "mongodb";

const app = express();
app.use(json());
app.use(cors());

let db = null;
const mongoClient = new MongoClient("mongodb://localhost:27017");
mongoClient.connect()
.then(() => {
    db = mongoClient.db("myWalletDB");
    console.log(chalk.bold.blue("Conectado ao banco myWalletDB"));
})
.catch(err => console.log(chalk.bold.red("Erro ao conectar com o banco"), err));

const usuarios = [];
const entradas = [];
const saidas = [];

app.post("/cadastro", async (req, res) => {
    const new_cadastro = req.body;
    const {email} = req.body;

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
        confirm_senha: joi.ref("senha")
    });
    try {
        const validate = cadastroSchema.validate(new_cadastro);
        //console.log(validate.error);
        if (validate.error) {
            res.sendStatus(400);
            return;
        }
        await db.collection("usuarios").insertOne(new_cadastro);
        res.status(201).send("Cadastrado com Sucesso");
        return;
    } catch (err) {
        res.sendStatus(500);
    }
})

app.post("/login", async (req, res) => {
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
        res.status(201).send("Sucesso no Login");
        return;
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.get("/historico", (req, res) => {
    try {
        //res.sendStatus(201).send(historico);
        return;
    } catch (err) {
        res.sendStatus(500);
    }
})

const transationSchema = joi.object({
    valor: joi.string().required(),
    descricao: joi.string().required()
})

app.post("/transation", (req, res) => {
    const transation = req.body;
    const {valor} = transation;

    try {
        const validate = transationSchema.validate(transation);
        if (validate.error) {
            res.sendStatus(400);
            return;
        }
        console.log(typeof(valor));
        //db.collection("transations").insertOne({id: id, ...transation});
        db.collection("transations").insertOne({...transation, valor: parseFloat(valor)});
        res.status(201).send("Transacao registrada com sucesso!");
        return;
    } catch (err) {
        res.status(500).send("erro ao conectar com o banco");
    }
})

app.get("/saldo", (req, res)=> {
    try{
        
        const somaEntradas = 0;
        entradas.forEach(entrada => somaEntradas += entrada.valor)
        const somaSaidas = 0;
        saidas.forEach(saida => somaSaidas += saida.valor);
        const saldo = somaEntradas - somaSaidas;
        res.sendStatus(201).send(saldo);
        console.log(saldo);
        return;
    } catch (err) {
        res.sendStatus(500);
    }
})

app.listen(5000, () => {
    console.log(chalk.green.bold("o servidor MyWallet esta de pé na porta 5000"));
});