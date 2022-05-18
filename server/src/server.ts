import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

// Forma de controle de segurança para acesso ao frontend
app.use(cors());
// Antes de processar, veja da requisição e converta para json
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
	console.log("HTTP server running!");
});
