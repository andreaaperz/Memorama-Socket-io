//var socket = io("http://192.168.42.17:3000");

var gridMemorama = new Array(3);

gridMemorama[0] = new Array();
gridMemorama[1] = new Array();
gridMemorama[2] = new Array();
gridMemorama[3] = new Array();
gridMemorama[4] = new Array();
gridMemorama[5] = new Array();
gridMemorama[6] = new Array();
gridMemorama[7] = new Array();
gridMemorama[8] = new Array();

/* valores[0] = new Array(3);
valores[1] = new Array(3);
valores[2] = new Array(3); */

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

var cardOne=""
var positionOne = -1

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
document.write(lista);

for (var j=0; j<9;j++){
    value = lista[j];
    lista[j] = images[value];
}

var contador = 0;
var points = 0;
var mov = function(x){
    gridMemorama[x].src = lista[x];
    console.log(gridMemorama[x].src)
    contador ++;
    if (contador == 1){
        positionOne = x;
    } else if (contador == 2){
        if (lista[positionOne] != lista[x]){
            setTimeout(() => {  
                gridMemorama[x].src = "./img/question.jpg";
                gridMemorama[positionOne].src = "./img/question.jpg";
                positionOne = -1
             }, 600);
        } else {
            gridMemorama[x].onclick = function(){};
            gridMemorama[positionOne].onclick = function(){};
            points += 1;
            checkPoints();
        }
        contador = 0;
    }
}

var checkPoints = function(x){
    if (points == 4){
        alert("GANASTE")
        window.setTimeout(function(){
            window.location.href = "" }, 600);
    }
}

