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

let eID = 0






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
    currentPhase: 2,
    currentAttack: 1,
    attackAngle:-Math.PI/2,
    attackRadius:0,
    attackWidth:1,
    playerAngle:0,
    shockwaveLaunched:false,
    laserAttacked:false,
    meleeAttack:false,
    draw() {
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x,this.y,20,40);
        if (this.currentPhase == 1) {
            if (this.currentAttack == 1) {
                ctx.fillStyle = 'green';
                
                ctx.save();
                ctx.translate(this.x,this.y);
                ctx.rotate(this.attackAngle);
                ctx.fillRect(0,0,3,1000);
                ctx.restore();
    
            } else if (this.currentAttack == 2) {
                ctx.strokeStyle = 'green';
                ctx.beginPath();
                ctx.lineWidth = this.attackWidth;
                ctx.arc(this.x,this.y,this.attackRadius,0,Math.PI);
                ctx.stroke();
                //radius, start angle, end angle, counterclockwise
            }
        } else if (this.currentPhase == 2) {
            if (this.currentAttack == 1) {
                ctx.strokeStyle = 'green';
                ctx.beginPath();
                ctx.lineWidth = this.attackWidth;
                ctx.arc(this.x,this.y,this.attackRadius,this.playerAngle-Math.PI/4,this.playerAngle+Math.PI/4);
                ctx.stroke();
            } else if (this.currentAttack == 2) {
                if (this.laserAttacked) {
                    ctx.fillStyle = 'green';
                    ctx.save();
                    ctx.translate(this.x,this.y);
                    ctx.rotate(this.attackAngle);
                    ctx.fillRect(0,0,3,1000);
                    ctx.restore();
                }
                
                
            } else if (this.currentAttack == 3) {
                
            } else if (this.currentAttack == 4) {

            }
            if (this.meleeAttack) { //if player gets too close, she should do a melee attack, 
                    ctx.fillStyle = 'red';
                    ctx.save();
                    ctx.translate(this.x,this.y);
                    ctx.rotate(this.attackAngle);
                    ctx.fillRect(0,0,10,50);
                    ctx.restore();
            }
        }
        
        

    },
    AI () {
        if (this.currentPhase == 1) {
            //if player tries to attack Taylor directly in this stage, she should say somethign like go away hater to indicate that she cannot be directlt attacked during this phase
            if (this.currentAttack == 1) { //laser attack
                this.attackAngle+=0.01;
    
                if (this.attackAngle >= Math.PI/2) {
                    this.currentAttack = 2;
                    this.attackAngle = -Math.PI/2;
                    //maybe set delays between switching attacks
                }
            } else if (this.currentAttack == 2) {
                this.attackRadius += 0.8
                this.attackWidth += 0.03
                if (this.attackRadius >= 600) {
                    this.attackRadius = 0;
                    this.attackWidth = 1;
                    this.currentAttack = 1;
                }
            }
            if (1 < 0) { //condition for second phase, e.g. all speakers destroyed

            }
        } else if (this.currentPhase == 2) {
            //put playerAngle thing here, instead of constantly copying and pasting it
            if ((!this.shockwaveLaunched && this.currentAttack == 1) || (!this.laserAttacked && this.currentAttack == 2)) {
                    this.playerAngle = Math.abs(Math.atan((player.y-this.y)/(player.x-this.x))) //getting the players absolute reference angle
                
                    if (player.x < this.x && player.y > this.y) { //converts the angle from 0 to 2 PI, starting at standard position, and going clockwise
                        this.playerAngle = (Math.PI - this.playerAngle);
                    } else if (player.x < this.x && player.y < this.y) {
                        this.playerAngle = (Math.PI + this.playerAngle) 
                    } else if (player.x > this.x && player.y < this.y) {
                        this.playerAngle = (Math.PI*2 - this.playerAngle)
                    }
            }

            if (this.currentAttack == 1) {
                if (!this.shockwaveLaunched) {
                    this.shockwaveLaunched = true;
                    setTimeout(()=>{this.shockwaveLaunched=false;this.attackRadius=0;this.attackWidth=1;this.currentAttack=0;setTimeout(()=>{this.currentAttack=2},2000)},6000); //resets attack, goes to next attack
                }
                this.attackRadius += 3
                this.attackWidth += 0.05

                
                
            } else if (this.currentAttack == 2) {
                if (!this.laserAttacked) {
                    this.laserAttacked = true;
                    this.attackAngle = (this.playerAngle-Math.PI/3);
                    setTimeout(()=>{this.laserAttacked = false;this.attackAngle=this.playerAngle;this.currentAttack=0;setTimeout(()=>{this.currentAttack=1},2000)},1500);
                }
                this.attackAngle-=0.02
                
                
            } else if (this.currentAttack == 3) {
                
            } else if (this.currentAttack == 4) {

            }
            if (player.x > this.x - 50 && player.x < this.x + 50 && player.y > this.y - 50 && player.y < this.y + 50) { //if player gets too close, she should do a melee attack, 
                this.currentAttack = 0;
                if (!this.meleeAttack) {
                    this.meleeAttack = true;
                    this.attackAngle = (this.playerAngle-Math.PI/2-Math.PI/6);
                    setTimeout(()=>{this.meleeAttack=false;},1000)
                    
                }
                this.attackAngle+= 0.1
                
            }
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


let test = new Entity(100,100,[{id:0,x:10,y:10,scale:0.2,ani:{t:"s",scale:5,progress:0}}],eID,"test")
eID++


class Entity{
    constructor(x,y,sprites,id,type){
        this.id = id
        this.x = x
        this.y = y
        this.type = type
        this.sprites = sprites
    }

    draw(){
        ctx.strokeStyle = "red"
        ctx.strokeRect(this.x,this.y,100,100);

        for(i=0;i<this.sprites.length;i++){

            let x = this.sprites[i].x;
            let y = this.sprites[i].y;


            // let w = this.sprites[i].width*this.sprites[i].scale
            // let h = this.sprites[i].height*this.sprites[i].scale

            ctx.save()
            ctx.translate(this.x+x,this.y+y)

            if(this.sprites[i].ani){

                if(this.sprites[i].ani.t.includes("t")){
                    ctx.translate(this.sprites[i].ani.dest.x*(this.sprites[i].progress/100),this.sprites[i].ani.dest.y*(this.sprites[i].progress/100))
                }

                if(this.sprites[i].ani.t.includes("r")){
                    
                    ctx.translate(this.sprites[i].ani.anchor.x,this.sprites[i].ani.anchor.y)
                    ctx.rotate(this.sprites[i].angle*(this.sprites[i].progress/100))
                }
                
                if(this.sprites[i].ani.t.includes("s")){
                    ctx.scale(this.sprites[i].ani.scale.x*(this.sprites[i].progress/100),this.sprites[i].ani.scale.y*(this.sprites[i].progress/100))
                }
            }

            draw(this.sprites[i].id,0,0,this.sprites[i].scale);
            ctx.restore()

            this.sprites[i].ani.progress+=this.sprites[i].ani.speed
        }
    }
}