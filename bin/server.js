var io=require("socket.io")();

var gridMemorama = new Array(8);

contador=0;

for (i=0; i<3; i++){
        gridMemorama[i]= "./img/question.jpg"
}

io.sockets.on("connection", function(socket){
    console.log("NUEVO CLIENTE CONECTADO CON ID: " + socket.id)
    contador++; console.log(contador); //Numero de usuarios conectados
    socket.emit("actualizar", gridMemorama); //Esto es para que se cargue el juego cada vez que alguien se loggea
    
    socket.on("cambio", function(x,y,pieza){
        gridMemorama[x][y] = pieza;
        socket.broadcast.emit("actualizar", gridMemorama);
    })
})

module.exports = io;