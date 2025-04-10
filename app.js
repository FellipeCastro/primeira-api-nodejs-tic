import http from "http";
import fs from "fs";
import rotas from "./routes.js";
import sqlite3 from "sqlite3";
import { criaPedido, lerPedidos, sequelize } from "./models.js";

const db = new sqlite3.Database("./tic.db", (erro) => {
    if (erro) {
        console.log("Falha ao inicializar banco de dados: ", erro);
        return;
    }
    console.log("Banco de dados inicializado");
});

fs.writeFile(
    "./mensagem.txt",
    "Olá, TIC em Trilhas do arquivo",
    "utf-8",
    (erro) => {
        if (erro) {
            console.log("Falha ao escrever o arquivo: ", erro);
            return;
        }
        console.log("Arquivo foi criado com sucesso");
    }
);

fs.readFile("./mensagem.txt", "utf-8", (erro, conteudo) => {
    if (erro) {
        console.log("Falha na leitura o arquivo: ", erro);
        return;
    }
    console.log(`Conteúdo: ${conteudo}`);

    iniciaServidorHttp(conteudo);
});

async function iniciaServidorHttp(mensagem) {
    await sequelize.sync();
    await criaPedido({
        valorTotal: 13.0,
        produtos: [
            { id: 2, quantidade: 1 },
            { id: 4, quantidade: 2 },
        ]
    });
    await lerPedidos();

    const servidor = http.createServer((req, res) => {
        rotas(req, res, mensagem);
    });

    const porta = 3000;
    const host = "localhost";

    servidor.listen(porta, host, () => {
        console.log(`Servidor executando em http://${host}:${porta}`);
    });
}
