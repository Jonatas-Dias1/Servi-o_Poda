import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/routes.js';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

const url = "mongodb+srv://aluno1:aluno1@cluster0.9fgzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

app.use(routes);

// ⚠️ Sem app.listen()
// Exporta handler pra Vercel
export const handler = serverless(app);
