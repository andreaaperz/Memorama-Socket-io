var io=require("socket.io")();

var SerialPort = require('serialport');
var ReadLine = SerialPort.parsers.Readline;
var parser = new ReadLine();
var serial_interface = "COM3";

var port = new SerialPort(serial_interface, {
	baudRate: 9600
});  

port.on('open', function(err){
	if(err){
		console.log("HA OCURRIDO UN ERROR: " + err);
	}
	else{
		console.log("COMUNICACION SERIAL ESTABLECIDA CORRECTAMENTE");
		port.pipe(parser);
	}
});

var gridMemorama = new Array(11);
var lista = new Array(11);

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
images[9] = "./img/fruta5.PNG"
images[10] = "./img/fruta6.PNG"
images[11] = "./img/fruta6.PNG"

var lista = [0,1,2,3,4,5,6,7,8,9,10,11];
lista = lista.sort(function() {return Math.random() - 0.5});

for (var j=0; j<12;j++){
    value = lista[j];
    lista[j] = images[value];
}

for (i=0; i<12; i++){
    gridMemorama[i]= "./img/estrella.png"
}

contador=0;
numPiezas=0;
tiempo=false;
points=0;

io.sockets.on("connection", function(socket){
    console.log("NUEVO CLIENTE CONECTADO CON ID: " + socket.id)
    contador++; console.log(contador); //Numero de usuarios conectados
    socket.emit("actualizar", gridMemorama, false);
    socket.emit("incializar", lista); //Esto es para que se cargue el juego cada vez que alguien se loggea
    
    socket.on("cambio", function(x){
        gridMemorama[x] = lista[x];
        numPiezas ++;
        if (numPiezas == 1){
            positionOne = x;
            socket.broadcast.emit("actualizar", gridMemorama, false);
        } else if (numPiezas == 2){
            if (lista[positionOne] != lista[x]){ 
                socket.broadcast.emit("actualizar", gridMemorama, false);
                    gridMemorama[x] = "./img/estrella.png";
                    gridMemorama[positionOne] = "./img/estrella.png";
                    positionOne = -1
                    socket.broadcast.emit("actualizar", gridMemorama, true);
                }  else {
                    points += 1;
                    socket.broadcast.emit("checkPoints", points);
                    socket.broadcast.emit("actualizar", gridMemorama, false);
                } 
            numPiezas=0;
        }
    })

    socket.on("restart", function(){
        console.log("Juandirandindan")
        for (i=0; i<12; i++){
            gridMemorama[i]= "./img/estrella.png"
        }

        /* lista = lista.sort(function() {return Math.random() - 0.5});
        
        for (var j=0; j<9;j++){
            value = lista[j];
            lista[j] = images[value];
            console.log(lista[j]);
        }   */ 

        socket.broadcast.emit("actualizar", gridMemorama, false);   
        //socket.broadcast.emit("incializar", lista); 
    })
})

var aux=-1;
parser.on('data', function(x){
    if (x > 66){
        distancia = 255 - Number(x);
        io.sockets.emit("background", x);
    } else {
            aux = Number(x);
        if (x == 65){
            aux = 10;
        } else if (x==66){
            aux = 11;
        }
    gridMemorama[aux] = lista[aux];
    numPiezas++;
    if (numPiezas == 1){
        positionOne = aux;
        io.sockets.emit("actualizar", gridMemorama, false); 
    } else if (numPiezas == 2){
            if (lista[positionOne] != lista[aux]){ 
                io.sockets.emit("actualizar", gridMemorama, false); 
                    gridMemorama[aux] = "./img/estrella.png";
                    gridMemorama[positionOne] = "./img/estrella.png";
                    positionOne = -1
                    io.sockets.emit("actualizar", gridMemorama, true);
                }  else {
                    points += 1;
                    console.log("puntos " + points);
                    io.sockets.emit("checkPoints", points);
                    io.sockets.emit("actualizar", gridMemorama, false); 
                } 
            numPiezas=0;
        } 
    }
    
})

module.exports = io;