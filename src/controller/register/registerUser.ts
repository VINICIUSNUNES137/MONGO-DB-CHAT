import { RegisterUser } from "./interface/interfaceRegister"
import { verifyRegisterUser } from "./validate/validateRegister"
import { dbRegisterUser } from "../../model/clienteDao/registerClient"

const registerUser = async (data: RegisterUser) => {

    const status = verifyRegisterUser(data)
    if(typeof status === "string"){
        return {
            status: 422,
            message: status
        }
    }else{

        const statusRegister = await dbRegisterUser(data)
        if(statusRegister){
            return {
                status: 201,
                message: "Register created successfully"
            }
        }else{
            return {
                status: 400,
                message: "Error creating registration. Obs: It is not allowed to register the same user with the same userMysqlId"
            }
        }
    }
}

export {
    registerUser
}