import { Router, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import { registerUser } from "../../controller/register/registerUser"

const jsonParser = bodyParser.json()
const router = Router()

router.post('/v1/limpean/chat/register', jsonParser, async function(request: Request, response: Response) {
    
    const dataBody = request.body
    const statusRegister = await registerUser(dataBody)

    response.status(statusRegister.status)
    response.json(statusRegister)
    
})


export{
    router
}