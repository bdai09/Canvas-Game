window.onload=function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var cvsW = canvas.width;
    var cvsH = canvas.height;
    var direction="right";
    var score=0;
    var timer=120;
    // Load the background image
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
    bgReady = true;
    };
    bgImage.src = "images/background.png";
    
    document.addEventListener("keydown",getDirection);
    function getDirection(e){
        if(e.keyCode==37&&direction!=="right"){
            direction="left";
        }else if(e.keyCode==38&&direction!=="down"){
            direction="up";
        }else if(e.keyCode==39&&direction!=="left"){
            direction="right";
        }else if(e.keyCode==40&&direction!=="up"){
            direction="down";
        }
    }
    hero = {x:0,y:0};
    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
      heroReady = true;
    };
    heroImage.src = "images/hero.png";
    //random select monster location
   monster={
       x : 32 + (Math.random() * (cvsW - 60)),
       y : 32 + (Math.random() * (cvsH - 60))
   }
    // Load the monster image
   var monsterReady = false;
   var monsterImage = new Image();
    monsterImage.onload = function () {
     monsterReady = true;
     };
    monsterImage.src = "images/monster.png";
    //score board
    function drawScore(i){
    ctx.fillStyle="black";
    ctx.font="20px Verdana";
    ctx.fillText("Fight Monster: "+i,5, cvsH-5)
    }
    function countDown(elem){
        var element=document.getElementById(elem);
        element.innerHTML="Timer: "+Math.ceil(timer)+"s";
        timer=timer-0.01;      
    }
    function draw(){
        ctx.clearRect(0,0,cvsW,cvsH);
        if (bgReady) ctx.drawImage(bgImage, 0, 0);
        if (monsterReady) ctx.drawImage(monsterImage, monster.x, monster.y);
        if(heroReady) ctx.drawImage(heroImage, hero.x, hero.y);
        //when time out, restart
        if(timer<-1&&score>33){alert("You Win!!");timer=120; document.location.reload();}
        if(timer<-1&&score<=33){alert("Game Over!");timer=120; document.location.reload();}
       //when touch wall re-enter from other side
       if(hero.x<0)  hero.x=cvsW-1;
       if(hero.y<0) hero.y=cvsH-1;
       if(hero.x>=cvsW) hero.x=1;   
       if(hero.y>=cvsH) hero.y=1;
       //action based on direction
       if(direction=="left") hero.x--;
       else if(direction=="up") hero.y--;
       else if(direction=="right") hero.x++;
       else if(direction=="down") hero.y++;  
       //if catch monster
        if (hero.x <= (monster.x + 25)
        && monster.x <= (hero.x + 25)
        && hero.y <= (monster.y + 25)
        && monster.y <= (hero.y + 25)
          ){
        monster.x = 32 + (Math.random() * (cvsW - 60));
        monster.y = 32 + (Math.random() * (cvsH - 60));
        score++;
       }
       hero={x:hero.x, y:hero.y }; //make it move
       drawScore(score);
       countDown("status");
    }
       this.setInterval(draw,10);
}
