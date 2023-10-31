import { TypeUser } from "@prisma/client";

interface Chat{
    serviceMysqlId: number,
    typeUser: TypeUser,
    sendId: number,
    recipientId: number,
    message: string,
    date: string
}

export {
    Chat
}