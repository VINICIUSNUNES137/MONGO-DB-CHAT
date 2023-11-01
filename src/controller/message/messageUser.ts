import { Chat } from "./interface/interfaceChat"
import { verifyRegisterChat } from "./validate/validateMessage"
import { dbRegisterMessage } from "../../model/userDao/sendMessage"

const registerMessage = async (data: Chat) => {

    try {
        const status = verifyRegisterChat(data)
    if(typeof status === "string"){
        return {
            status: 422,
            message: status
        }
    }else{
     
        const statusSendMessage = await dbRegisterMessage(data)
        if(statusSendMessage){
            return {
                status: 200,
                message: "Register created successfully"
            }
        }else{
            return {
                status: 422,
                message: "Error Verification data. Try again"
            }
        }
    }
    } catch (error) {
        return {
            status: 500,
            message: "Error internal server"
        }
    }
    
}

export {
    registerMessage
}