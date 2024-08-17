
//Game Canvas
let canvas = document.getElementById("c")
let ctx = canvas.getContext("2d")

//Buffer Canvas
//Why do we need a buffer and a game canvas?
let canv = document.getElementById("g")
let gfx = canv.getContext("2d")

//resizing Canvas
window.onresize = () => {
    //not sure what is v

    // v.style.width = v.style.height = canvas.width = canvas.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
    // sF = canvas.width/700
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

function keyDown (evt) {
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
}
//Helper Functions