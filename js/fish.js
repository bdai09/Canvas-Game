var can1;
var can2;
var ctx1;
var ctx2;
var canWidth;
var canHeight;
var lastTime;
var deltaTime;

var bgPic=new Image();
//part1: prepare to draw ane as background
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

//part2: prepare fish food,grow up from top of ane, then lifting to canvas top
var fruit;
var fruitObj=function(){
    this.alive=[]; //if fruit is in use(growing,lifting), true; else waiting in queue to grow and work
     this.x=[];
     this.y=[];
    this.orange=new Image();
     this.blue=new Image();
}
//30 fruit as food in pool, allow 15 in screen, less than 15, let waiting ones start to grow
fruitObj.prototype.num=30; 
fruitObj.prototype.init=function(){
    for(let i=0;i<this.num;i++){
        this.alive[i]=true; 
        this.x[i]=0;
        this.y[i]=0;
        this.born(i);
    }
    this.orange.src="./images/src/fruit.png";
    this.blue.src="./images/src/blue.png";
}
fruitObj.prototype.draw=function(){
for(let i=0;i<this.num;i++){
    //find an ane to locate
    ctx2.drawImage(this.orange, this.x[i]-this.orange.width*0.5,this.y[i]-this.orange.height*0.5);
}
}
//randomly select an ane to grow on
fruitObj.prototype.born=function(i){
    var aneID=Math.floor(Math.random()*ane.num);
     this.x[i]=ane.x[aneID];
     this.y[i]=canHeight-ane.len[aneID];
}
//check
//fruitObj.prototype.update=function(){
  //  var cnt=0;
    //for(let i=0;i<this.num;i++){
      // if(this.alive[i]) 
      // cnt++;
     //}
//}



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

     fruit=new fruitObj();
     fruit.init();
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
     fruit.draw();
}
