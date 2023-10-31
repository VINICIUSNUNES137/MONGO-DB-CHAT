/**
 * npx prisma db push -> Sincroniza o esquema prisma com o banco de dados mongo
 * npx prisma migrate dev -> Sincroniza e gerencia as migrações mas não é suportado no mongo
 * 
 */
const express = require('express')

const port = process.env.PORT || 8080

const cors = require('cors')

import { server } from './server/server'

const app = express();

//Configuração do cors
const corsOptions = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE, OPTIONS'
}

app.use(cors(corsOptions))
  
app.use(server)

app.listen(port, () => console.log('Servidor Aguardando requisições na porta 8080'))

export {
  app
}