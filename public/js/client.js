var socket = io("http://localhost:3000/");

var gridMemorama = new Array(8);
var gridLista = new Array(8);


gridMemorama[0] = document.getElementById("img1");
gridMemorama[1] = document.getElementById("img2");
gridMemorama[2] = document.getElementById("img3");
gridMemorama[3] = document.getElementById("img4");
gridMemorama[4] = document.getElementById("img5");
gridMemorama[5] = document.getElementById("img6");
gridMemorama[6] = document.getElementById("img7");
gridMemorama[7] = document.getElementById("img8");
gridMemorama[8] = document.getElementById("img9");

for (i=0; i<9; i++){
    gridMemorama[i].src = "./img/question.jpg"
} 

var positionOne = -1
var contador = 0;
var points = 0;

socket.on("incializar", function(grid){
    for (var i=0;i<9;i++){
        //alert(grid)
        gridLista[i]= grid[i];
    }
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

socket.on("actualizar", function(grid){
    
    for (var i=0;i<9;i++){
        gridMemorama[i].src = grid[i];
        alert(grid[i])
    }   
}) 

var checkPoints = function(){
    if (points == 4){
        alert("GANASTE");

        //socket.emit("restart");
         window.setTimeout(function(){
            window.location.href = "" }, 600);
    } 
}

