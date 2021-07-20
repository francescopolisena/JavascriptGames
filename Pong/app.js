
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasH = canvas.height;
const canvasW = canvas.width;

var paddle = {h:50, w:5}
var leftPaddle = (rightPaddle = ball = {});
var score = 0;
let increment = 0.2;

setInitialVariables()
drawBall();
drawLeftPaddle();
drawRightPaddle();
drawScore();
drawCenterLine();
moveBall();
moveLeftPaddle();


function setInitialVariables(){
    ball = {x:150 , y:150, r:10, dx:2, dy:1}
    leftPaddle = { x:0, y:125}
    rightPaddle = { x: canvasW - 5 , y:125} 
}

function moveLeftPaddle(){
    document.addEventListener("mousemove",(e) =>{
        leftPaddle.y  = e.screenY - 350;
    });

}

function detectCollision(){

    //right paddle collision
    if(ball.x > rightPaddle.x - ball.r){
        ball.dx = -ball.dx;
    }
    //left paddle collision
    if(ball.x < 0 + ball.r + paddle.w && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddle.h){
        ball.dx = -ball.dx;
        score++;
    }
    //bottom and top collision
    if(ball.y > canvasH - ball.r || ball.y < 0 + ball.r ){
        ball.dy = -ball.dy;
    }
    //left collision
    if( ball.x < 0 + ball.r){
        alert("You lose!")
        setInitialVariables();
    }
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    rightPaddle.y = ball.y - paddle.h/2;

    ctx.clearRect(0,0,canvasW,canvasH);
    detectCollision();
    drawBall();
    drawScore();
    drawCenterLine();
    drawLeftPaddle();
    drawRightPaddle();
    requestAnimationFrame(moveBall);

}

function drawRightPaddle() {
   ctx.beginPath();
   ctx.setLineDash([]);
   ctx.rect(rightPaddle.x, rightPaddle.y, paddle.w,paddle.h);
   ctx.stroke();
   ctx.closePath();
}

function drawLeftPaddle() {
   ctx.beginPath();
   ctx.setLineDash([]);
   ctx.rect(leftPaddle.x, leftPaddle.y, paddle.w,paddle.h);
   ctx.stroke();
   ctx.closePath();
}

function drawBall() {
   ctx.beginPath();
   ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
   ctx.stroke();
   ctx.closePath();
}

function drawScore(){
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.fillText("Score: " + score,20,10);
    ctx.closePath();
}

function drawCenterLine() {
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(canvasW / 2, 0);
    ctx.lineTo(canvasW / 2, canvasH);
    ctx.stroke();
    ctx.closePath();
  }