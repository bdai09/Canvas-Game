window.onload=function(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var cvsW = canvas.width;
    var cvsH = canvas.height;
    var direction="right";
    var snakeW=10;
    var snakeH=10;
    var score=0;
     var len=4;
    var snake=[];
    for(var i=len-1;i>=0;i--){
        snake.push({x:i,y:0});
    }
    document.addEventListener("keydown",getDirection);
    getDirection(e)=>{  //link key to direction
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

    drawSnake(x,y)=>{
    ctx.fillStyle = "#008000";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
    ctx.fillStyle = "#FFF";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
    }
   //random put food in
   food={
       x:Math.round(Math.random()*(cvsW/snakeW)),
       y:Math.round(Math.random()*(cvsH/snakeH))
   }
   drawFood(x,y)=>{

    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
  
    ctx.fillStyle = "#FFF";
    ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);

    } 
   //if location overlap->collision
    checkCollision(x,y,arr)=>{
      for(var i=1;i<arr.length;i++){
          if(x==arr[i].x &&  y==arr[i].y){
              return true;
          }
      }
      return false;
    }
    //trace score
    drawScore(i)=>{
    ctx.fillStyle="black";
    ctx.font="15px Verdana";
    ctx.fillText("Score: "+i,5, cvsH-5)
    }
    draw()=>{
        ctx.clearRect(0,0,cvsW,cvsH)
        for(var i=0;i<snake.length;i++){
            var x=snake[i].x;
            var y=snake[i].y;
            drawSnake(x,y);
        }
        drawFood(food.x,food.y);
        var snakeX=snake[0].x;
        var snakeY=snake[0].y;
        
       //if hit to boundary wall, game over
       if(snakeX<0||snakeY<0||snakeX>=cvsW/snakeW||snakeY>=cvsH/snakeH ||
        checkCollision(snakeX,snakeY,snake)){
           location.reload();
       }
       if(direction=="left") snakeX--;
       else if(direction=="up") snakeY--;
       else if(direction=="right") snakeX++;
       else if(direction=="down") snakeY++;
       
       //if eat food
       if(snakeX==food.x&&snakeY==food.y){
        food={
            x:Math.round(Math.random()*(cvsW/snakeW)),
            y:Math.round(Math.random()*(cvsH/snakeH))
        }
        var newHead={
            x:snakeX,
            y:snakeY
        };
        score++;
       }else{ //if not eat, just move not grow
        snake.pop();
        var newHead={
            x:snakeX,
            y:snakeY
        };
       }        
        snake.unshift(newHead);
        drawScore(score);
    }
this.setInterval(draw,100);
}
