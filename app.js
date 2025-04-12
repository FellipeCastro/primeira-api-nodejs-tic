import sqlite3 from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models.js";
import { rotasProduto } from "./routes/produtos.js";
import { rotasPedido } from "./routes/pedidos.js";

const app = express();

app.use(bodyParser.json());

app.use(rotasProduto);
app.use(rotasPedido);

async function inicializaApp() {
    const db = new sqlite3.Database("./tic.db", (erro) => {
        if (erro) {
            console.log("Falha ao inicializar banco de dados: ", erro);
            return;
        }
        console.log("Banco de dados inicializado");
    });

    await sequelize.sync();

    const porta = 3000;

    app.listen(porta)
}

inicializaApp();
