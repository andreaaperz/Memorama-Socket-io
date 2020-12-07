var io=require("socket.io")();

var gridMemorama = new Array(8);
var lista = new Array(8);

images = new Array();
images[0] = "./img/fruta1.PNG"
images[1] = "./img/fruta1.PNG"
images[2] = "./img/fruta2.PNG"
images[3] = "./img/fruta2.PNG"
images[4] = "./img/fruta3.PNG"
images[5] = "./img/fruta3.PNG"
images[6] = "./img/fruta4.PNG"
images[7] = "./img/fruta4.PNG"
images[8] = "./img/fruta5.PNG"

var lista = [0,1,2,3,4,5,6,7,8];
lista = lista.sort(function() {return Math.random() - 0.5});
//document.write(lista);

for (var j=0; j<9;j++){
    value = lista[j];
    lista[j] = images[value];
}

contador=0;

for (i=0; i<9; i++){
    gridMemorama[i]= "./img/question.jpg"
}

io.sockets.on("connection", function(socket){
    console.log("NUEVO CLIENTE CONECTADO CON ID: " + socket.id)
    contador++; console.log(contador); //Numero de usuarios conectados
    socket.emit("actualizar", gridMemorama);
    socket.emit("incializar", lista); //Esto es para que se cargue el juego cada vez que alguien se loggea
    
    socket.on("cambio", function(x){
        gridMemorama[x] = lista[x];
        socket.broadcast.emit("actualizar", gridMemorama);
    })
})

module.exports = io;