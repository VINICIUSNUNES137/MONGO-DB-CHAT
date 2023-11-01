import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbGetAllMessageByService = async function(){
    try {
        
        const dataMessage = await prisma.chat.findMany({
            where: {
                serviceMysqlId: 1
            },select: {
                message: true,
                date: true,
                sender: {
                    select: {
                        typeUser: true,
                        name: true,
                        photoUrl: true
                    }
                }
            }
        })
        

        if(dataMessage.length > 0){            
            return dataMessage
        }else{
            return 404
        }
         
    } catch (error) {
        return false
    }
}

export{
    dbGetAllMessageByService
}