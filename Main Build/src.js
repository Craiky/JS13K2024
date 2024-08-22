
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

//keep track of clicking
let click = 0






//resizing Canvas
window.onresize = () => {
    //not sure what is v
    canvas.width = canvas.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    //normalize everthing to a 700x700 game size
    sF = canvas.width/700;
}

//set up & stuff
window.onload = () => {
    canv.width = window.innerWidth
    canv.height = window.innerHeight*10
    onresize()

    document.title = "Loading..."

    //createSpriteSheet()

    gameLoop()
    document.title = "Cleansing Taylor"
}

//game loop

function gameLoop() {
    ctx.save()
    ctx.scale(sF,sF)

    updateGame()
    drawGame()

    ctx.restore()

    window.requestAnimationFrame(gameLoop); //why not use an interval instead?
}

function updateGame(){

}

function drawGame(){

}



canvas.addEventListener("mousedown",inputStart)
canvas.addEventListener("mouseup",inputEnd)

window.addEventListener("keydown",keyDown)
window.addEventListener("keyup",keyUp)



function inputEnd(){
    click = 0;
}

function inputStart(e){
    e.preventDefault()

    if(e.which == 1 || e.which == 0){
        click = {
            x:(e.clientX-v.getBoundingClientRect().left)/sF,
            y:(e.clientY-v.getBoundingClientRect()).top/sF
        };

        var now = new Date().getTime();
    }
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