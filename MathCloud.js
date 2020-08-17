//Script for MathPong game
//import sweeper from "/MathCloud/sweeper"

const gameState = {

    PAUSED: 0,
    UNPAUSED: 1,
    CORRECT: 2,
    START: 3,
    WIN: 4,
    INCORRECT: 5

}

class backGround{
    constructor(game){
        this.image = document.getElementById("bg");
        this.sizex = game.stageWidth;
        this.sizey = game.stageHeight;
    }

    draw(context){
        context.drawImage(this.image, 0, 0, this.sizex, this.sizey);
    }
}

class sweeper{
    
    constructor(game){
        this.stageWidth = game.stageWidth;
        this.stageHeight = game.stageHeight;
        this.width = 100;
        this.height = 25;
        this.position = {
            
            x: game.stageWidth/2-this.width/2,
            y: game.stageHeight-this.height-20
    
        };
        

        this.maxSpeed = 10;
        this.speed = 0;
    }
    

    draw(context){
        context.fillStyle = '#0ff';
        context.fillRect(this.position.x, this.position.y, this.width, this.height); //140 works as a starting height
    }

    update(dt){
        
        if (!dt){
            return;
        }

        this.position.x += this.speed;
        if(this.position.x < 0){ //stops it from going over the edge of canvas from left side
            this.position.x = 0;
        }

        if(this.position.x+this.width > this.stageWidth){ //stops it from going over the edge of the canvas fromt he right side
            this.position.x = this.stageWidth-this.width;
        }
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }

    moveRight(){
         this.speed = this.maxSpeed;
    }

    launch(){
        this.speed;
        
    }
       

}

class faucet{
    constructor(game){
        this.image = document.getElementById("f"); //note can't (or shouldnt) name id same as class
        this.sizex = 95;
        this.sizey = 75;
    }

    draw(context){
        context.drawImage(this.image, 0, 128, this.sizex, this.sizey);
    }
}

class inputHandler{

    constructor(sweeper, raindrop, game){

        document.addEventListener('keydown', event => {
            //alert(event.keyCode);
            switch(event.keyCode){
                case 49:
                    location = location;
                    break;
                case 37:
                    sweeper.moveLeft();
                    break; //break is very important. A lack of break appears to make the code only obey moveRight()?
                case 65: //a
                    sweeper.moveLeft();
                    break;
                case 39:
                    sweeper.moveRight();
                    break;
                case 68: //d
                    sweeper.moveRight();
                    break;
                case 32: //spacebar
                    console.log("2");
                    if (raindrop.position.y + raindrop.size == 535 ){
                        //raindrop.up = true;
                        raindrop.speed.y = -5;
                    }
                    break;
                
                case 80:
                    console.log("paused");
                    game.gamestate = gameState.PAUSED;
                    break;
                    
                case 85:
                    console.log("unpaused")
                    game.gamestate = gameState.UNPAUSED;
                    break;
                case 13:
                    game.gamestate = gameState.UNPAUSED;
                    break;
            }
        });

        document.addEventListener('keyup', event =>{
            switch(event.keyCode){
                case 37:
                    sweeper.speed = 0;
                    break; 
                case 65:
                    sweeper.speed = 0;
                    break;
                case 39:
                    sweeper.speed = 0;
                    break;
                case 68:
                    sweeper.speed = 0;
                    break;

            }
        })

    }


}

class raindrop{

    constructor(game){
        this.image = document.getElementById("rainDrop");
        //this.image2 = document.getElementById("rainUp");
        this.speed = {x: 0, y: 2}; //speed in which the raindrop moves
        this.position  = {x: 61, y: 200};
        this.size = 75;
        this.stageWidth = game.stageWidth;
        this.stageHeight = game.stageHeight;
        this.game = game;
        //this.up = false;
        this.strAns = Math.floor(Math.random()*4);
        console.log("strAns is: " + this.strAns);

        this.correctAns = 0;

        let a = 0;
        let b = 0;
        if (this.strAns == 0){
            a = this.game.a1.num1;
            b = this.game.a1.num2;
            this.correctAns = a*b;
            
        }else if (this.strAns == 1){
            a = this.game.a2.num1;
            b = this.game.a2.num2;
            this.correctAns = a*b;
            
        }else if (this.strAns == 2){
            a = this.game.a3.num1;
            b = this.game.a3.num2;
            this.correctAns = a*b;
            
        }else if (this.strAns == 3){
            a = this.game.a4.num1;
            b = this.game.a4.num2;
            this.correctAns = a*b;
            
        }
        

        
        

    }

    /*moveUp(){
        this.speed.y = -2;
    }*/


    draw(context){
        context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
        
    }

    /*draw2(context){
        context.drawImage(this.image2, this.position.x, this.position.y, this.size, this.size);
    }*/


    update(dt){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        //left or right collision
        if (this.position.x + this.size > this.stageWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        //top or bottom collision
        if (this.position.y + this.size > this.stageHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }


        //paddle collision
        let ballBottom = this.position.y + this.size;
        //console.log(ballBottom); == 535
        let paddleTop = this.game.launchpad.position.y;
        let paddleLeftSide = this.game.launchpad.position.x;
        let paddleRightSide = this.game.launchpad.position.x + this.game.launchpad.width;
        let paddleCenter = this.game.launchpad.position.x + (0.5*this.game.launchpad.width);
        
    

        if (ballBottom >= paddleTop && this.position.x >= paddleLeftSide && this.position.x + this.size <= paddleRightSide){
            this.speed.x = 0;
            this.speed.y = 0;
            this.position.y = this.game.launchpad.position.y - this.size;
            this.position.x = paddleCenter-(0.5*this.size); //keeps raindrop at center
            
        }
  

    }


}


class cloud{

    constructor(game, position, number){

        this.image = document.getElementById("cloud");
        this.game = game;
        this.num1 = Math.floor(Math.random()*13); //the two numbers for the questions
        this.num2 = Math.floor(Math.random()*13);
        this.position = position;
        this.width = 128;
        this.height = 64;
        this.speed = {x: 0, y: 0};
        this.number = number;


        //this.num1 = Math.random()*13;
        //this.num2 = Math.random()*13;
        //this.sNum1 = (Math.random()*13).toString();
        //this.sNum2 = (Math.random()*13).toString();

    }

    update(dt){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        
        let cloudBottom = this.position.y;
        let cloudLeft = this.position.x;
        let cloudRight = this.position.x + this.width;
        //let ballCenter = this.game.answer.position.x + this.game.answer.position.x+this.game.answer.

        if (this.game.answer.position.y <= cloudBottom && this.game.answer.position.x >= cloudLeft && this.game.answer.position.x <= cloudRight && 
            this.game.answer.strAns == this.number){
            this.speed.x = 5;
            this.game.answer.position.x += 1000;
        }
        
        if (this.game.answer.position.y <= cloudBottom && this.game.answer.position.x >= cloudLeft && this.game.answer.position.x <= cloudRight && 
            this.game.answer.strAns != this.number){
            this.game.gamestate = gameState.INCORRECT;
        }

    }

    draw(context){

        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        
    }
}

class text{
    
    constructor(game, text, position, nimbus){
        
        this.game = game;
        this.text = text;
        this.position = position;
        this.nimbus = nimbus;
        
        
       
        this.num1 = Math.floor(Math.random()*13);
        this.num2 = Math.floor(Math.random()*13);
        //this.sNum1 = num1.toString();
        ////this.sNum2 = num2.toString();;
        
        

    }

    draw(context){

        context.font = '30px Ariel';
        context.fillStyle = 'red';
        let t = this.text; //could create conditionals to fix distance
        context.fillText(t, this.position.x, this.position.y);
    
    }

    update(dt){

        this.position.x = this.nimbus.position.x+this.nimbus.width/5+2+30;
        this.position.y = this.nimbus.position.y+this.nimbus.height/2+10;

    }

    update2(dt){
        
        let ca = (this.game.answer.correctAns.toString()).length;
        if (ca == 1){
            this.position.x = this.nimbus.position.x+this.nimbus.size/2+2
        }else if (ca == 2){
            this.position.x = this.nimbus.position.x+this.nimbus.size/2+2
        }else if (ca == 3){
            this.position.x = this.nimbus.position.x+this.nimbus.size/2
        }

        this.position.y = this.nimbus.position.y+this.nimbus.size/2+10;

    }
}



class gameManager{

    constructor(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.gamestate = gameState.PAUSED;
    }

    start(){


        //background
        this.bg = new backGround(this);

        //faucet object
        this.drip = new faucet(this);


        //lanchpad object
        this.launchpad = new sweeper(this);

        //clouds
        this.a1 = new cloud(this, {x: 100, y: 20}, 0);
        this.a2 = new cloud(this, {x: 300, y: 20}, 1);
        this.a3 = new cloud(this, {x: 500, y: 20}, 2);
        this.a4 = new cloud(this, {x: 700, y: 20}, 3);

        //raindrop containing answer 
        this.answer = new raindrop(this);
        
        this.a1t = new text(this, `${this.a1.num1.toString()} * ${this.a1.num2.toString()}`, {x: this.a1.position.x + this.a1.width/5+2
            , y: this.a1.position.y+this.a1.height/2+10}, this.a1);
        this.a2t = new text(this, `${this.a2.num1.toString()} * ${this.a2.num2.toString()}`, {x: this.a2.position.x + this.a2.width/5+2
            , y: this.a2.position.y+this.a2.height/2+10}, this.a2);
        this.a3t = new text(this, `${this.a3.num1.toString()} * ${this.a3.num2.toString()}`, {x: this.a3.position.x + this.a3.width/5+2
            , y: this.a3.position.y+this.a3.height/2+10}, this.a3);
        this.a4t = new text(this, `${this.a4.num1.toString()} * ${this.a4.num2.toString()}`, {x: this.a4.position.x + this.a4.width/5+2
            , y: this.a4.position.y+this.a4.height/2+10}, this.a4);
        
        this.rt = new text(this, this.answer.correctAns, {x: this.answer.position.x, y: this.answer.position.y}, this.answer);

        

        //Input Handler
        new inputHandler(this.launchpad, this.answer, this); //activates input handler

    }

    update(dt){

        if (this.gamestate == gameState.PAUSED || this.gamestate == gameState.WIN || this.gamestate == gameState.INCORRECT){ //pausing
            return;
        }

        
        this.launchpad.update(dt);

        this.answer.update(dt);

        this.a1.update(dt);
        this.a2.update(dt);
        this.a3.update(dt);
        this.a4.update(dt);
        this.a1.update(dt);
        this.a2.update(dt);
        this.a3.update(dt);
        this.a4.update(dt);
        this.a1t.update(dt);
        this.a2t.update(dt);
        this.a3t.update(dt);
        this.a4t.update(dt);
        this.rt.update2(dt);

        if (this.a1.position.x > this.stageWidth || this.a2.position.x > this.stageWidth || this.a3.position.x > this.stageWidth || this.a4.position.x > this.stageWidth){
            this.gamestate = gameState.WIN;
           
        }
    
    }

    

    draw(context){

        if (this.gamestate == gameState.PAUSED){
        

            context.font = "30px Comic Sans";
            context.fillStyle = "blue";
            context.textAlign = "center";
            context.fillText("Launch the raindrop with the correct answer into the correct cloud to win!", this.stageWidth/2, this.stageHeight/2-50);
            context.fillText("Press Space Bar to shoot, Press P to pause, Direction keys to move", this.stageWidth/2, this.stageHeight/2);
            context.fillText("Have Fun!", this.stageWidth/2, this.stageHeight/2 + 30);
            
            context.fillStyle = "red";
            context.fillText("Press Enter to continue", this.stageWidth/2, this.stageHeight/2 + 150);

            return;
        }

        


        
        this.bg.draw(context)
        this.drip.draw(context);

        this.launchpad.draw(context);

        this.answer.draw(context);
        
        this.a1.draw(context);
        this.a2.draw(context);
        this.a3.draw(context);
        this.a4.draw(context);
        this.a1t.draw(context);
        this.a2t.draw(context);
        this.a3t.draw(context);
        this.a4t.draw(context);
        this.rt.draw(context);

        if (this.gamestate == gameState.WIN){
            
            context.rect(0, 0, this.stageWidth, this.stageHeight);
            context.fillStyle = "rgba(0,0,0,0.7)";
            context.fill();

            context.font = "30px Comic Sans";
            context.fillStyle = "green";
            context.textAlign = "center";
            context.fillText("THIS IS CORRECT!", this.stageWidth/2, this.stageHeight/2-50);
            context.fillText("Press 1 to continue playing", this.stageWidth/2, this.stageHeight/2);
            return;
        }

        else if (this.gamestate == gameState.INCORRECT){
            context.rect(0, 0, this.stageWidth, this.stageHeight);
            context.fillStyle = "rgba(0,0,0,0.7)";
            context.fill();

            context.font = "30px Comic Sans";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("THIS IS INCORRECT!", this.stageWidth/2, this.stageHeight/2-50);
            context.fillText("CLICK ENTER TO TRY AGAIN", this.stageWidth/2, this.stageHeight/2);
            this.answer.position.y = this.launchpad.position.y;
            this.answer.position.x = this.launchpad.position.x+20;
            
        }

    }


}


const STAGE_WIDTH = 920;
const STAGE_HEIGHT = 580;
let canvas = document.getElementById("stage");
let context = canvas.getContext("2d");


console.log("1"); 


let startgame = false;
//context.clearRect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
//launchpad.draw(context);


let mc = new gameManager(STAGE_WIDTH, STAGE_HEIGHT);
mc.start();


let lastTime = 0;
function gameloop(timestamp){ //where you put the items of the game, gameloop is the callback function

    let deltaTime = timestamp-lastTime;
    lastTime = timestamp;

    context.clearRect(0,0, STAGE_WIDTH, STAGE_HEIGHT); //clears the pannel in preparation for new frame
    
    mc.update(deltaTime);
    mc.draw(context)

    requestAnimationFrame(gameloop);

}

requestAnimationFrame(gameloop);

//cancelAnimationFrame();

