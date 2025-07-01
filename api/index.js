import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/routes.js';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import fs from 'fs';

// Cria app express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Conexão MongoDB
const url = process.env.MONGO_URL || "mongodb+srv://aluno1:aluno1@cluster0.9fgzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
  .then(() => console.log("✅ Conectado ao MongoDB com sucesso"))
  .catch(err => console.error("❌ Erro ao conectar no MongoDB:", err));

// Usa rotas
app.use(routes);

// Testa se view index existe
const indexViewPath = join(__dirname, '../views/index.ejs');
if (fs.existsSync(indexViewPath)) {
  console.log("✅ index.ejs encontrado");
} else {
  console.error("❌ index.ejs NÃO encontrado no caminho:", indexViewPath);
}

// Exporta o handler default para o Vercel
export default serverless(app);
