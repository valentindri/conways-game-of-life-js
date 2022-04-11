import Game from "./game.js";

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var game = new Game(canvas.style.width, canvas.style.height);



    
gameLoop();

function gameLoop(){

    game.draw(c);


    requestAnimationFrame(gameLoop);
}


