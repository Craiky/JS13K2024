
//Game Canvas
let canvas = document.getElementById("c")
let ctx = canvas.getContext("2d")

//Buffer Canvas
//Why do we need a buffer and a game canvas?
let canv = document.getElementById("g")
let gfx = canv.getContext("2d")

//variables and whatnot

let frictionCoefficient = 0.5;
//Scale factor
let sF = 1

let click = 0

let mylatesttap;

//resizing Canvas
window.onresize = () => {
    //not sure what is v

    //normalize everthing to a 700x700 game size
    sF = canvas.width/700
}

//set up & stuff
window.onload = () => {
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    gameLoop();

    window.addEventListener("keyup",keyUp);
    window.addEventListener("keydown",keyDown);
}

//game loop

function gameLoop() {

    window.requestAnimationFrame(gameLoop); //why not use an interval instead?
}
//Keybind Functions

//controls for the game (desktop)
/*
w a s d, for movement, self explanotory
space for dodge
e for interact with objects
click for attack, sword follows mouse movement

*/
function keyDown (evt) {
    if (evt.key == "ArrowUp" || evt.key == "w" || evt.key == "z") { //z is for European keyboards
        player.yAcc = 3;
    }
    if (evt.key == "ArrowLeft" || evt.key == "a") {
        
    }
    if (evt.key == "ArrowDown" || evt.key == "s" || evt.key == "q") { //q for European keyboards
        console.log('down')
    }
    if (evt.key == "ArrowRight" || evt.key == "d") {
        console.log('right')
    }
    if (evt.key == " ") {
        console.log('space');
    }
    if (evt.key == "e") {
        console.log('interact');
    }
    
}

function keyUp(evt) {
    if (evt.key == "ArrowUp" || evt.key == "w" ) {
        console.log('up')
    }
    if (evt.key == "ArrowLeft" || evt.key == "a") {
        console.log('left')
    }
    if (evt.key == "ArrowDown" || evt.key == "s") {
        console.log('down')
    }
    if (evt.key == "ArrowRight" || evt.key == "d") {
        console.log('right')
    }
    if (evt.key == " ") {
        console.log('space');
    }
    if (evt.key == "e") {
        console.log('interact');
    }
}
function onClick (evt) {
    
}

// objects and classes
let player = {
    x:0,
    y:0,
    health:1,
    xVel:0,
    yVel:0,
    xAcc:0,
    yAcc:0,
    draw() {

    },
    update() {

    }

}

let taylorSwift = {
    x:0,
    y:0,
    health:1,
    draw() {

    },
    AI () {

    }

}

//enemy classes
// I think we should have multiple different types of enemies, but we can worry about this later


//Helper Functions