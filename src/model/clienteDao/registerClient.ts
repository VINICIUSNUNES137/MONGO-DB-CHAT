import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const registerClient = async function(){

    const client = await prisma.registerClient.create({
        data: {
            name: "Fernanda Regina da Silva",
            photoUrl: "https://photo"
        }
    })

    return client
}

export {
    registerClient
}