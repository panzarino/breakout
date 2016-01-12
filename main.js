var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// item color
var color = "#0095DD";

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

// brick variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// game score
var score = 0;

// array to hold bricks
var bricks = [];
for (var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for (var r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

// draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// draw the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
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
                ctx.fillStyle = color;
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
    for (c=0; c<brickColumnCount; c++){
        for (r=0; r<brickRowCount; r++){
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
    clearInterval(interval);
    alert("GAME OVER");
    document.location.reload();
}

function winGame(){
    clearInterval(interval);
    alert("YOU WIN, CONGRATULATIONS!");
    document.location.reload();
}

// draw the entire game
function draw(){
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
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 5;
    }
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