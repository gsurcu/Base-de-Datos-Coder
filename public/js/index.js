const socket = io()

const button = document.getElementById("buttonSocket")

const sendMessage = (e) => {
  const hoy = new Date()
  const message = {
    mail: document.getElementById("nombreUsuario").value,
    text: document.getElementById("mensaje").value,
    fecha: hoy.toLocaleDateString() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
  };

  socket.emit("incomingMessage", message);
  document.getElementById("mensaje").value = "";
  document.getElementById("mensaje").focus();
}

button.addEventListener("click", sendMessage);

socket.on("chat", messages => {
  const texto = messages.map( mensaje => {
    return(`
    <div>
      <strong class="azul">${mensaje.mail} </strong>
      [<span class="marron">${mensaje.fecha}</span>]:
      <em class="verde"> ${mensaje.text}</em>
    </div>`);
  }).join("")

  console.log(texto);

  document.getElementById("messages").innerHTML = texto;
})