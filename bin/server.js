var io=require("socket.io")();

var gridMemorama = new Array(3);

gridMemorama[0] = new Array(3);
gridMemorama[1] = new Array(3);
gridMemorama[2] = new Array(3);

contador=0;

for (i=0; i<3; i++){
    for (j=0; j<3; j++){
        gridMemorama[i][j] = "./img/question.jpg"
    }
}

io.sockets.on("connection", function(socket){
    console.log("NUEVO CLIENTE CONECTADO CON ID: " + socket.id)
    contador++; console.log(contador); //Numero de usuarios conectados
    socket.emit("actualizar", gridMemorama); //Esto es para que se cargue el juego cada vez que alguien se loggea
    
    if (contador >2){
    io.sockets.emit("nuevoUsuario", contador); //Nuevo usuario
    }

    socket.on('disconnect', function(){
        contador--;
        socket.broadcast.emit("desconexion", "CLIENTE DESCONECTADO: " + socket.id)
    })

    socket.on('contador', function() {
        contador++;
        io.sockets.emit("actualizar_conteo", contador-2)
        
    })

    
    socket.on('usuarioGanador', function(data) {
        io.sockets.emit("ganador", data); 
    })
    
    socket.on("cambio", function(x,y,pieza){
        gridMemorama[x][y] = pieza;
        socket.broadcast.emit("actualizar", gridMemorama);
    })
    
    
})

module.exports = io;