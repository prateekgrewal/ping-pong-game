var ball = document.getElementById("ball");
var box = document.getElementById("container");
var paddle = document.querySelectorAll(".paddle");
var initialBallPosLeft = ball.offsetLeft ;
var initialBallPosTop = ball.offsetTop ; 
ball.style.left = ball.offsetLeft + "px";
ball.style.top = ball.offsetTop + "px";
var initialPaddlePosLeft = paddle[0].offsetLeft;
var random = (Math.random() * 10 ) + 1;
var goUp = true;
var goDown = false;
var goLeft = false;
var goRight = true;

localStorage.setItem("highScore","0");
localStorage.setItem("playerName","");
var player1Score = 0;
var player2Score = 0;


window.alert("Press Enter to PLay  |   Use A & D to move the paddles");

// paddle movement


for(let i=0;i<2;i++){
    let cur = paddle[i].offsetLeft;    
    paddle[i].style.left = cur + "px" ;
}

// paddle-movement

window.addEventListener("keydown",function(e){
       
    
    
    
    
    for(let j=0; j<2; j++){
    let cur = parseFloat(paddle[j].style.left);     
    let new_pos;
    if(e.keyCode == 65){
        if(cur>25){
             new_pos = cur - 25 ;
        }         
    }
    else if(e.keyCode == 68){
        if(cur < (box.offsetWidth-paddle[j].offsetWidth - 20)) {
             new_pos = cur + 25 ;
        }
    }          
    
    paddle[j].style.left = new_pos + "px";
    }
    
});


//displaying score
window.addEventListener("keypress",function(e){
    if(e.keyCode == 13){
        if(localStorage.getItem("highScore") == 0){
            window.alert("this is your first time" );
        }
        else{
            
            window.alert(" high score: " + localStorage.getItem("highScore") + " scored By: " + localStorage.getItem("playerName"));
        }
    }
    
    
    startGame(e);
});

function startGame(event){
    if(event.keyCode == 13 ){
       
       player1Score=0;
       player2Score=0;
       
        // ball movement

var interval = setInterval(function(){
    if(goUp == true){
        // ball to go up
        ball.style.top = parseFloat(ball.style.top) - 5 + "px";
        
        // selecting angle
        if(goRight == true){
            ball.style.left = parseFloat(ball.style.left) + random + "px";
        }
        else{
            ball.style.left = parseFloat(ball.style.left) - random + "px";
        }
        
        // ball to reflect back down
        if(parseFloat(ball.style.top) <= paddle[0].offsetHeight){
            if(parseFloat(ball.style.left) > parseFloat(paddle[0].style.left) &&  parseFloat(ball.style.left) < parseFloat(paddle[0].style.left) + paddle[0].offsetWidth ){
                player2Score++;
                goUp = false;
                goDown = true;
                random = (Math.random() * 10 ) + 1;
            }
            if(parseFloat(ball.style.top) <= 5){
                window.alert("winner:player 1 score: " + player1Score );
                if(player1Score > localStorage.getItem("highScore") ){
                    localStorage.setItem("highScore",player1Score);
                    localStorage.setItem("playerName", "player 1")
                }
                goDown = true;
                goUp = false;
                goRight=true;
                goLeft = false;
                random = (Math.random() * 10 ) + 1;
                setTimeout(function(){
                    ball.style.top = 30 + "px";
                    ball.style.left = initialBallPosLeft + "px";
                    paddle[0].style.left = initialPaddlePosLeft + "px";
                    paddle[1].style.left = initialPaddlePosLeft + "px";
                },500)
                clearInterval(interval);
            }
        }
        
        // reflecting ball from the sides
        if(parseFloat(ball.style.left) <= random){
    
            goRight = true;
            goLeft = false;
        }
        else if(parseFloat(ball.style.left)  >= (box.offsetWidth - ball.offsetWidth  )  ){
        
            goLeft = true;
            goRight = false;
        }
    }
    if(goDown == true){
        //ball to go down
        ball.style.top = parseFloat(ball.style.top) + 5 + "px";
        
        //selecting angle
        if(goRight == true){
            ball.style.left = parseFloat(ball.style.left) + random + "px";
        }
        else{
            ball.style.left = parseFloat(ball.style.left) - random + "px";
        }
        
        //reflecting ball back up
        if(parseFloat(ball.style.top) >= (box.offsetHeight - paddle[0].offsetHeight - ball.offsetHeight )){
            if(parseFloat(ball.style.left) > parseFloat(paddle[0].style.left) &&  parseFloat(ball.style.left) < parseFloat(paddle[0].style.left) + paddle[0].offsetWidth ){
                player1Score++;
                goDown = false;
                goUp = true;
                random = (Math.random() * 10 ) + 1;
            }
            if(parseFloat(ball.style.top) >= (box.offsetHeight - ball.offsetHeight -5) ){
                window.alert("winner:player 2 score: " + player2Score );
                if(player2Score > localStorage.getItem("highScore") ){
                    localStorage.setItem("highScore",player2Score);
                    localStorage.setItem("playerName", "player 2")
                }
                goDown = false;
                goUp = true;
                goRight=true;
                goLeft = false;
                random = (Math.random() * 10 ) + 1;
                setTimeout(function(){
                    ball.style.top = initialBallPosTop + "px";
                    ball.style.left = initialBallPosLeft + "px";
                    paddle[0].style.left = initialPaddlePosLeft + "px";
                    paddle[1].style.left = initialPaddlePosLeft + "px";
                },500)
                clearInterval(interval);
            }
            
        }
        // reflecting ball from sides
        if(parseFloat(ball.style.left) <= random){
            goRight = true;
            goLeft = false;
        }
        else if(parseFloat(ball.style.left)  >= (box.offsetWidth - ball.offsetWidth  )  ){
            goLeft = true;
            goRight = false;
        }
    }


},1000/40)

    }
}

