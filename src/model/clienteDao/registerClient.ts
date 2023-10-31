import { PrismaClient, TypeUser } from "@prisma/client"
import { RegisterUser } from "../../controller/register/interface/interfaceRegister";

const prisma = new PrismaClient()

const dbRegisterUser = async function(data: RegisterUser){

    try {

        const count = await prisma.registerUser.count({
            where: {
                typeUser: data.typeUser,
                userMysqlId: data.userMysqlId,
            },
        })

        console.log(count);
        

        if (count > 0) {
            return false
        }

        switch (data.typeUser.toUpperCase()) {

            case TypeUser.CLIENT:
                const client = await prisma.registerUser.create({
                    data: {
                        typeUser: TypeUser.CLIENT,
                        userMysqlId: data.userMysqlId,
                        name: data.name,
                        photoUrl: data.photoUrl,
                    },
                })
    
                return client
    
            case TypeUser.DIARIST:
                const diarist = await prisma.registerUser.create({
                    data: {
                        typeUser: TypeUser.DIARIST,
                        userMysqlId: data.userMysqlId,
                        name: data.name,
                        photoUrl: data.photoUrl,
                    },
                })
    
                return diarist
    
            default:
                throw new Error("Invalid typeUser")
        }
    } catch (error) {    
        
        console.log(error);
        
        return false
    }
}

export {
    dbRegisterUser
}