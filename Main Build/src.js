//Where to store spritesheet
const spriteSheet = new Image

//Game Canvas
let canvas = document.getElementById("c")
let ctx = canvas.getContext("2d")

//Buffer Canvas
//Why do we need a buffer and a game canvas?
let canv = document.getElementById("g")
let gfx = canv.getContext("2d")



//Drawing stuff
let data = [
    {"d":"c #8e5252 1, r 35 124 60 60 1, c #7d5e5e 1, r 0 0 130 130 1, c #ffffff 1, r 10 20 35 80 1, r 80 20 35 80 1, c #000000 1 1, g 0.7, r 80 50 35 40 1, g 1, r 10 50 35 40 1, c #fa0000 1, g 0.6, r 50 105 25 20 1, c #c68685 1, g 0.8, r 85 130 40 35 1, c #c68686 1, g 1, r 5 125 45 40 1,","w":130,"h":170}
]

//variables and whatnot

let frictionCoefficient = 0.3;


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

    createSpriteSheet()

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
    player.update();
    taylorSwift.AI();
}

function drawGame(){
    ctx.save()
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw()
    taylorSwift.draw();
    ctx.restore()
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
            x:(e.clientX-canvas.getBoundingClientRect().left)/sF,
            y:(e.clientY-canvas.getBoundingClientRect()).top/sF
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
        player.yAcc = -3;
    }
    if (evt.key == "ArrowLeft" || evt.key == "a" || evt.key == "q") { //q for European keyboards
        player.xAcc = -3;
    }
    if (evt.key == "ArrowDown" || evt.key == "s") { 
        player.yAcc = 3;
    }
    if (evt.key == "ArrowRight" || evt.key == "d") {
        player.xAcc = 3;
    }
    if (evt.key == " ") {
        console.log('space');
    }
    if (evt.key == "e") {
        console.log('interact');
    }
    
}

function keyUp(evt) {
    if (evt.key == "ArrowUp" || evt.key == "w" || evt.key == "z") {
        player.yAcc = 0;
    }
    if (evt.key == "ArrowLeft" || evt.key == "a" || evt.key == "q") {
        player.xAcc = 0;
    }
    if (evt.key == "ArrowDown" || evt.key == "s") {
        player.yAcc = 0;
    }
    if (evt.key == "ArrowRight" || evt.key == "d") {
        player.xAcc = 0;
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
        draw(0,this.x,this.y,0.5)
    },
    update() {
        this.xVel += this.xAcc+(-this.xVel*frictionCoefficient);
        this.yVel += this.yAcc+(-this.yVel*frictionCoefficient);

        this.x += this.xVel;
        this.y += this.yVel;
    }

}

let taylorSwift = {
    x:200,
    y:100,
    health:1,
    currentPhase: 1,
    currentAttack: 1,
    angle:0,
    draw() {
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x,this.y,20,40);
        if (this.currentAttack == 1) {
            ctx.fillStyle = 'green';
            
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.angle);
            ctx.fillRect(0,0,3,1000);
            ctx.restore();

        }
        

    },
    AI () {
        if (this.currentAttack == 1) { //laser attack
            this.angle+=0.01
        }
    }

}

//enemy classes
// I think we should have multiple different types of enemies, but we can worry about this later


//Helper Functions

//svg function
function svg(c,e,f){for(gfx.save(),gfx.translate(e,f),i=0;i<c.length;i++){var b=c[i],a=d(c,i);"p"==b?(g=a.splice(1,a.length-1),b=new Path2D(g.join(" ")),"s"!=(a=a[0])[1]&&"s"!=a[0]||gfx.stroke(b),"f"==a[0]&&gfx.fill(b)):"w"==b?gfx.lineWidth=a:"g"==b?gfx.globalAlpha=a:"s"==b?gfx.shadowBlur=a:"c"==b?(parseInt(a[1])&&(gfx.fillStyle=a[0]),parseInt(a[2])&&(gfx.strokeStyle=a[0]),parseInt(a[3])&&(gfx.shadowColor=a[0]),i+=a[0].length+1):"a"==b?(gfx.beginPath(),gfx.arc(a[0],a[1],a[2],.01745*a[3],.01745*a[4]),parseInt(a[5])&&gfx.fill(),parseInt(a[6])&&gfx.stroke()):"r"==b?(gfx.beginPath(),gfx.rect(a[0],a[1],a[2],a[3]),parseInt(a[4])&&gfx.fill(),parseInt(a[5])&&gfx.stroke()):"<"==b?gfx.save():">"==b?gfx.restore():"t"==b?gfx.translate(a[0],a[1]):"q"==b&&gfx.rotate(.01745*a)}gfx.restore()}function d(a,b){return a.slice(b+2,a.indexOf(",",b+2)).split(" ")}

//creates spritesheet
function createSpriteSheet(){

    let x = 0;
    let y = 0;
    let nextY = 0;

    for(let i = 0; i<data.length;i++){

        if(x + data[i].w + 10 > canv.width){
            y = nextY
            x = 0
        }
        
        data[i].x = x
        data[i].y = y

        svg(data[i].d,x,y);

        x += data[i].w + 10

        if(data[i].h+y+10 > nextY){
            nextY = data[i].h+y+10
        }
    }

    spriteSheet.src = canv.toDataURL("image/png")
}

function draw(imgIndex,posX,posY,scale=1){
    let img = data[imgIndex]
    
    let sizeX = img.w*scale
    let sizeY = img.h*scale

    ctx.drawImage(spriteSheet, img.x, img.y, img.w, img.h, posX, posY, sizeX, sizeY)
}