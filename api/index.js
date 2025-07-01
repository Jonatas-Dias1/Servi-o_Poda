import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/route.js';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

// Cria app express
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Define caminhos de diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Configura conexão MongoDB
const url = process.env.MONGO_URL || "mongodb+srv://aluno1:aluno1@cluster0.9fgzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
  .then(() => console.log("✅ Conectado ao MongoDB com sucesso"))
  .catch(err => console.error("❌ Erro ao conectar no MongoDB:", err));

// Usa rotas
app.use(routes);

// ⚠️ NÃO usa app.listen() aqui!
// Exporta handler serverless pra Vercel
export const handler = serverless(app);
