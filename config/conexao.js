import mongoose from "mongoose";

const url = "mongodb+srv://aluno1:aluno1@cluster0.9fgzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const conexao = await mongoose.connect(url)

export default conexao;