import express from 'express'
const app = express();

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

import{fileURLToPath} from 'url'
import{dirname} from 'path'

const __filename=fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)
app.use(express.static(__dirname + '/public'))

import router from './routes/route.js'

import mongoose from 'mongoose'
const url = "mongodb+srv://aluno1:aluno1@cluster0.9fgzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)
console.log(mongoose.connect)

app.use(router)

app.listen(3000)