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
.then(response => {
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
        res.sendStatus(201);
        return;
    } catch (err) {
        res.status(402);
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
        }
        const isUser = await db.collection("usuarios").findOne({email: email, senha: senha});
        if (!isUser) {
            res.sendStatus(404);
            return;
        }
        res.status(201).send("usuario logado");
        return;
    } catch (err) {
        console.log(err);
        res.status(402).send(err);
    }
})

const transationSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required()
})

app.post("/entrada", (req, res) => {
    const entrada = req.body;

    try {
        transationSchema.validate(entrada);
        res.sendStatus(201);
        console.log(entrada);
        return;
    } catch (err) {
        res.sendStatus(402);
    }
})

app.post("/saida", (req, res) => {
    const saida = req.body;
    try {
        transationSchema.validate(saida);
        res.sendStatus(201);
        console.log(saida);
        return;
    } catch {
        res.sendStatus(402);
    }
})

app.get("/historico", (req, res) => {
    try {
        //res.sendStatus(201).send(historico);
        return;
    } catch (err) {
        res.sendStatus(409).send("erro ao buscar historico de transacoes");
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
        res.sendStatus(409).send("deu erro ao buscar o saldo");
    }
})

app.listen(5000, () => {
    console.log(chalk.green.bold("o servidor MyWallet esta de pé na porta 5000"));
});