import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { router } from "./routers/app.routers.js";
import { ProductosApi } from "./models/productos/productos.api.js";
import { ChatApi } from "./models/chat/chat.api.js";

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)

const chat = new ChatApi("chat")
const productos = new ProductosApi("productos")
const PORT = process.env.PORT || 8080;


// Template Engines
app.set('views', './view');
app.set('view engine', 'pug');

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
