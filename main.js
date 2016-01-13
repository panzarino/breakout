var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// object colors
var ballColor = "#0095DD";
var paddleColor = "#ff1a1a";
var brickColor = "#33cc33";

// global object variables
var x;
var y;
var dx;
var dy;
var ballRadius;
var paddleHeight;
var paddleWidth;
var paddleX;
var rightPressed;
var leftPressed;
var brickRowCount;
var brickColumnCount;
var brickWidth;
var brickHeight;
var brickPadding;
var brickOffsetTop;
var brickOffsetLeft;
var score;
var interval;
var bricks = [];
var pause;

// set all values to starting values
function setDefault(){
    // ball variables
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 4;
    dy = -4;
    ballRadius = 10;
    
    // paddle variables
    paddleHeight = 10;
    paddleWidth = 75;
    paddleX = (canvas.width-paddleWidth)/2;
    
    // keypress variables
    rightPressed = false;
    leftPressed = false;
    
    // brick variables
    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    
    // game score
    score = 0;
    
    // array to hold bricks
    for (var c=0; c<brickColumnCount; c++){
        bricks[c] = [];
        for (var r=0; r<brickRowCount; r++){
            bricks[c][r] = {x: 0, y: 0, status: 1};
        }
    }
    
    // start game not paused
    pause = false;
}

// draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}

// draw the bricks
function drawBricks(){
    for (var c=0; c<brickColumnCount; c++) {
        for (var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// draw the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

// calculate if a brick is hit
function brickHit(){
    for (var c=0; c<brickColumnCount; c++){
        for (var r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if (b.status == 1){
                if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount){
                        winGame();
                    }
                }
            }
        }
    }
}

// game over
function endGame(){
    window.cancelAnimationFrame(interval);
    alert("GAME OVER");
    setDefault();
    startGame();
}

function winGame(){
    window.cancelAnimationFrame(interval);
    alert("YOU WIN, CONGRATULATIONS!");
    setDefault();
    startGame();
}

function startGame(){
    interval = window.requestAnimationFrame(draw);
}

// draw the entire game
function draw(){
    
    // keep animating at correct rate
    setTimeout(function() {
        
        // keep updating
        if (!pause){
            interval = window.requestAnimationFrame(draw);
        }
        
        // reset canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // draw parts
        brickHit();
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        
        // change ball coordinates
        x += dx;
        y += dy;
        
        // ball bounce off the walls
        if (x + dx > canvas.width-ballRadius || x + dx < ballRadius){
            dx = -dx;
        }
        if (y + dy < ballRadius){
            dy = -dy;
        }
        else if (y + dy > canvas.height-ballRadius){
            if (x > paddleX && x < paddleX + paddleWidth){
                dy = -dy;
            }
            else {
                endGame();
            }
        }
        
        // move paddle on key press
        if(rightPressed && paddleX < canvas.width-paddleWidth){
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0){
            paddleX -= 7;
        }
    }, 20);
}

// events
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
    else if(e.keyCode == 32){
        if (pause){
            pause = false;
            startGame();
        }
        else if(!pause){
            pause = true;
        }
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

// start game
setDefault();
startGame();