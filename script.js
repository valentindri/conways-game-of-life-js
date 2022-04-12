import Game from "./game.js";

var canvas = document.getElementById("canvas");

canvas.width = canvas.height * 
    (canvas.clientWidth / canvas.clientHeight);

var c = canvas.getContext("2d");

var game = new Game(canvas.style.width, canvas.style.height);
//var speed = ;
gameLoop();

function gameLoop(){

    game.draw(c);
    game.update();
    
    setTimeout(gameLoop,200);
}


