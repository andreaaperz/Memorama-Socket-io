var socket = io("http://localhost:3000/");

var gridMemorama = new Array(12);
var gridLista = new Array(12);

var body = document.getElementById('body');

gridMemorama[0] = document.getElementById("img1");
gridMemorama[1] = document.getElementById("img2");
gridMemorama[2] = document.getElementById("img3");
gridMemorama[3] = document.getElementById("img4");
gridMemorama[4] = document.getElementById("img5");
gridMemorama[5] = document.getElementById("img6");
gridMemorama[6] = document.getElementById("img7");
gridMemorama[7] = document.getElementById("img8");
gridMemorama[8] = document.getElementById("img9");
gridMemorama[9] = document.getElementById("img10");
gridMemorama[10] = document.getElementById("img11");
gridMemorama[11] = document.getElementById("img12");

for (i=0; i<12; i++){
    gridMemorama[i].src = "./img/question.jpg"
} 

var positionOne = -1
var contador = 0;
var points = 0;

socket.on("incializar", function(grid){
    for (var i=0;i<12;i++){
        gridLista[i]= grid[i];
    }
}) 

socket.on("background", function(data){
    body.style = "background-color: rgb(200," + data + "," + data + ")";
})

var mov = function(x){
    socket.emit("cambio",x);
    gridMemorama[x].src = gridLista[x];
    contador ++;
    if (contador == 1){
        positionOne = x;
    } else if (contador == 2){
        if (gridLista[positionOne] != gridLista[x]){
            setTimeout(() => {  
                gridMemorama[x].src = "./img/question.jpg";
                gridMemorama[positionOne].src = "./img/question.jpg";
                positionOne = -1
             }, 600);
        }  else {
            gridMemorama[x].onclick = function(){};
            gridMemorama[positionOne].onclick = function(){};
            points += 1;
            checkPoints();
        } 
        contador = 0;
    } 
}

socket.on("actualizar", function(grid,tiempo){
    if (tiempo===true){ 
        setTimeout(() => {
            for (var i=0;i<12;i++){
                gridMemorama[i].src = grid[i];
            } 
        }, 600); 
     } else {
        for (var i=0;i<12;i++){
            gridMemorama[i].src = grid[i];
        } 
    }   
}) 

var checkPoints = function(){
    if (points == 6){
         window.setTimeout(function(){
            socket.emit("restart");
            window.location.href = "" }, 600);
    } 
}

socket.on("checkPoints", function(p){
    if (p == 6){
         window.setTimeout(function(){
            socket.emit("restart");
            window.location.href = "" }, 600);
    }    
}) 