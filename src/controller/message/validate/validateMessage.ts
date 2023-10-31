import { Chat } from "../interface/interfaceChat";

const verifyRegisterChat = (data: Chat) => {
  console.log(data);
  
    switch (true) {      
        case data.typeUser.toUpperCase() !== "CLIENT" && data.typeUser.toUpperCase() !== "DIARIST":
          return "Type user is invalid";
        case typeof data.message !== "string" || data.message === "" || data.message.length < 1:
          return "Invalid message requires at least one caractere";
        case typeof data.sendId !== "number" || typeof data.recipientId !== "number" || typeof data.serviceMysqlId !== "number":
          return "Invalid the id, it must be a number";
        default:
          return true;
      }
}

export{
    verifyRegisterChat
}