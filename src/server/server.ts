import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { router } from './routes/router'; // Importe suas rotas aqui

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Defina o middleware do corpo de análise JSON para o Express
app.use(express.json());

// Suas rotas
app.use('/api', router);

export { server, io };