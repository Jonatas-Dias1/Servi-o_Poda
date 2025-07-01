import express from 'express';
const router = express.Router();
import multer from 'multer';
var storage = multer.diskStorage({
    filename: function(req, file, cb){
    let nome = Date.now() + "-" + file.originalname
    cb(null, nome)
    },
    destination: function(req, file, cb){
    let path = "./public/img"
    cb(null, path)
    }
    })
    var upload = multer({ storage })

import { 
            
            abreIndex,
           
           
        } from '../controller/controller.js';

router.get('/',abreIndex)


export default router