
//Game Canvas
let canvas = document.getElementById("c")
let ctx = canvas.getContext("2d")

//Buffer Canvas
let canv = document.getElementById("g")
let gfx = canv.getContext("2d")

//Scale factor
let sF = 1

let click = 0

let mylatesttap;

//resizing Canvas
window.onresize = () => {
    //set canvas width and height
    canvas.width = canvas.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight

    //normalize everthing to a 700x700 game size
    sF = canvas.width/700
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


//Game Loop
function gameLoop() {

    canvas.width ^= 0

    ctx.save()
    ctx.scale(sF,sF)

    updateGame()
    drawGame()

    ctx.restore()

    window.requestAnimationFrame(gameLoop);
}


//Update Loop
function updateGame(){

}

//Draw Loop
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
        y:(e.clientY-v.getBoundingClientRect().top)/sF
        };

        var now = new Date().getTime();

        //var timesince = now - mylatesttap;

        //mylatesttap = new Date().getTime();
    }
}

//game loop


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