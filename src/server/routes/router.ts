import { Router, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"

import { registerClient } from "../../model/clienteDao/registerClient"
const router = Router()

const nanda = async function(){
     
    const client = await registerClient()
    console.log(client);
    
}

nanda()

export{
    router
}