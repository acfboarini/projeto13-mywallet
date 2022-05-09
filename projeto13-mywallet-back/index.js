import express, {json} from "express";
import cors from "cors";
import chalk from "chalk";
import router from "./routes/index.js";
import { conexaoMongo } from "./dataBase.js";

const app = express();
app.use(json());
app.use(cors());
app.use(router);

app.listen(5000, () => {
    console.log(chalk.green.bold("o servidor MyWallet esta de pé na porta 5000"));
    conexaoMongo();
});