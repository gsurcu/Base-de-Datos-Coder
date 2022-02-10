import knex from './database/config.js'
import { createTable } from './database/create-table.js';
// const express = require('express')
// const app = express()

(async () => {
  try {
    await createTable('productos')
  } 
  catch (error) {
    console.log(error);
    throw new Error(error.message)
  } 
  finally {
    knex.destroy()
  }
})()

// Rutas
// app.use('/api', rutasApi);

// io.on('connection', socket => {
//   emitir()

//   socket.on("incomingMessage", message =>{
//     chat.push(message)
//     emitir()
//   })
// })

// const emitir = () => io.sockets.emit("chat", chat)

// server.listen(3000, () => { console.log(`Running on port: ${3000}`)})
