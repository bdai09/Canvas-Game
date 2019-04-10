var can1;
var can2;
var ctx1;
var ctx2;
document.body.onload=game;
function game(){
    init();
}
function init(){
    //fish mom and baby
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");
    //background, fruits,ane
    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");
}
