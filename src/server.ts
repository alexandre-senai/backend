import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import auth from "./routes/AuthRoute";
import "dotenv/config";

const app = express();
const PORT = process.env.PORTA ?? 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // seu frontend Vite
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// PRIMEIRO CHAMADA DO LOCALHOST:300
// TAMBEM CHAMADO DE ROTA PRINCIPAL
app.use("/login", auth);

app.listen(PORT, () => {
  console.log(`Servidor deu boa e rodando em http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Servidor Node.js com TypeScript funcionando!");
});
