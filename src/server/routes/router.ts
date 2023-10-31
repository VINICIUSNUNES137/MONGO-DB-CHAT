import { Router, Request, Response, NextFunction, request, response } from "express"
import bodyParser from "body-parser"
import { registerUser } from "../../controller/register/registerUser"
import { registerMessage } from "../../controller/message/messageUser"

const jsonParser = bodyParser.json()
const router = Router()

router.post('/v1/limpean/chat/register', jsonParser, async function(request: Request, response: Response) {
    
    const dataBody = request.body
    const statusRegister = await registerUser(dataBody)

    response.status(statusRegister.status)
    response.json(statusRegister)
    
})

router.post('/v1/limpean/chat/message', jsonParser, async function(request: Request, response: Response){

    const dataBody = request.body
    const statusRegisterMessage = await registerMessage(dataBody)
    
    response.status(statusRegisterMessage.status)
    response.json(statusRegisterMessage)
})


export{
    router
}