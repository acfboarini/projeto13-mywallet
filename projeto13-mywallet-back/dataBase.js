import { MongoClient } from "mongodb";
import chalk from "chalk";

export let db = null;
export function conexaoMongo() {
    const mongoClient = new MongoClient("mongodb://localhost:27017");
    mongoClient.connect()
    .then(() => {
        db = mongoClient.db("myWalletDB");
        console.log(chalk.bold.blue("Conectado ao banco myWalletDB"));
    })
    .catch(err => console.log(chalk.bold.red("Erro ao conectar com o banco"), err));
}