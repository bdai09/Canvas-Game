var can1;
var can2;
var ctx1;
var ctx2;
var canWidth;
var canHeight;
var lastTime;
var deltaTime;

var bgPic=new Image();
//prepare to draw ane as background
var ane;
var aneObj=function(){
    this.x=[];
    this.len=[];
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
for(var i=0;i<this.num;i++){
    this.x[i]=i*16+Math.random()*20;
    this.len[i]=200+Math.random()*50;
}
}
aneObj.prototype.draw=function(){
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(let i=0;i<this.num;i++){
        ctx2.beginPath();
        //start point, draw from bottom to top
        ctx2.moveTo(this.x[i],canHeight);
        //end point
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);  
        ctx2.stroke();
    }
    ctx2.restore();//means above style only works before restore
}

//use functions above to assemble
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
    bgPic.src="./images/src/background.jpg";
     canWidth=can1.width;
     canHeight=can1.height;
     ane=new aneObj();
     ane.init();
}
function gameloop(){
    window.requestAnimFrame(gameloop);
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
     //canvas2 for background, drawBackground
     ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
     //draw ane
     ane.draw();
}
