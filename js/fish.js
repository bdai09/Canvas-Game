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
     this.l=[];
     this.spd=[];
     this.fruitType=[];
    this.orange=new Image();
     this.blue=new Image();
}
//30 fruit as food in pool, allow 15 in screen, less than 15, let waiting ones start to grow
fruitObj.prototype.num=30; 
fruitObj.prototype.init=function(){
    for(let i=0;i<this.num;i++){
        this.alive[i]=false; 
        this.x[i]=0;
        this.y[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//speed for grow up and fly
        this.fruitType[i]="";
        //this.born(i);
    }
    this.orange.src="./images/src/fruit.png";
    this.blue.src="./images/src/blue.png";
}
fruitObj.prototype.draw=function(){
for(let i=0;i<this.num;i++){
    if(this.alive[i]){
        let pic;
    this.fruitType[i]=="blue"?pic=this.blue:pic=this.orange;
    //find an ane to locate
    if(this.l[i]<=14){
    this.l[i]+=this.spd[i]*deltaTime; //size grow up slowly
    }
    else{
        this.y[i]-=this.spd[i]*7*deltaTime;//fruit start lift up
    }
    ctx2.drawImage(pic, this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5, this.l[i],this.l[i]);
    if(this.y[i]<10){
        this.alive[i]=false;//flying outside screen
    }
  }
}
}

//randomly select an ane to grow on
fruitObj.prototype.born=function(i){
    var aneID=Math.floor(Math.random()*ane.num);
     this.x[i]=ane.x[aneID];
     this.y[i]=canHeight-ane.len[aneID];
     this.l[i]=0;
     this.alive[i]=true;
     let rand=Math.random();
     rand<0.2? this.fruitType[i]="blue":this.fruitType[i]="orange"   //orange fruit or blue fruit
}
//monitor fruit number
function fruitMonitor(){
   var cnt=0;
    for(let i=0;i<fruit.num;i++){
      if(fruit.alive[i]) 
        cnt++;//count how many fruit is in screen
    }
    if(cnt<15){//if <15, let fruit born
        sendFruit();
        return;
    }
}
function sendFruit(){
    for(let i=0;i<fruit.num;i++){
        if(!fruit.alive[i]) {
          fruit.born(i);
          return;//born one at a time
        }
      }
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
     fruitMonitor();
     fruit.draw();
}
