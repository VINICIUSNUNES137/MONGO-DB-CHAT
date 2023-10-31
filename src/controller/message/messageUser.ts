import { Chat } from "./interface/interfaceChat";
import { verifyRegisterChat } from "./validate/validateMessage";

const registerMessage = async (data: Chat) => {

    const status = verifyRegisterChat(data)
    if(typeof status === "string"){
        return {
            status: 422,
            message: status
        }
    }else{
        return {
            status: 200,
            message: "Fernada"
        }
    }
}

export {
    registerMessage
}