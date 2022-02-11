import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { router } from "./routers/app.routers";

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

let chat = []
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use(router);

io.on('connection', socket => {
  emitir()

  socket.on("incomingMessage", message =>{
    chat.push(message)
    emitir()
  })
})

const emitir = () => io.sockets.emit("chat", chat)

httpServer.listen(PORT, () => { console.log(`Running on port: ${PORT}`)})
