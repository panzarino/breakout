var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

// get starting position
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// draw the ball
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
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
}

// redraw every 10 milliseconds
setInterval(draw, 10);