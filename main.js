var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// get starting position for ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// ball variables
var ballRadius = 10;

// draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// draw the entire canvas
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    
    // bounce off the walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
}

// redraw every 10 milliseconds
setInterval(draw, 10);