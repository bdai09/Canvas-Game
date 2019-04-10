var can1;
var can2;
var ctx1;
var ctx2;
var lastTime;
var deltaTime;
document.body.onload=game;
function game(){
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameloop();
}
function init(){
    //fish mom and baby-upper layer
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");
    //background, fruits,ane-lower layer
    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");
}
function gameloop(){
    window.requestAnimFrame(gameloop);
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
}
