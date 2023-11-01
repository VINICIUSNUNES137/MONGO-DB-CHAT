import { TypeUser } from "@prisma/client";

interface Chat{
    serviceMysqlId: number,
    typeSender: TypeUser,
    senderId: number,
    typeRecipient: TypeUser,
    recipientId: number,
    message: string,
    date: string,
    hour: string
}

export {
    Chat
}