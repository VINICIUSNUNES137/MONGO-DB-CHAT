import { TypeUser } from "@prisma/client"

interface RegisterUser {
    typeUser: TypeUser
    userMysqlId: number
    name: string
    photoUrl: string
}

export {
    RegisterUser
}