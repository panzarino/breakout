var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// get starting position for ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// ball variables
var ballRadius = 10;

// paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

// keypress variables
var rightPressed = false;
var leftPressed = false;

// draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function endGame(){
    window.clearInterval(interval);
    alert("GAME OVER");
    // reset the game
    // document.location.reload();
}

// draw the entire game
function draw(){
    // reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw parts
    drawBall();
    drawPaddle();
    
    // change ball coordinates
    x += dx;
    y += dy;
    
    // ball bounce off the walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            endGame();
        }
    }
    
    // move paddle on key press
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 5;
    }
}

// keypress events
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// check if right or left keys pressed
function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

// check if right or left keys released
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

// redraw every 10 milliseconds
var interval = setInterval(draw, 10);