// Game variables 

let inputDir ={ x:0, y:0}
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let score = 0;


let speed = 9;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]

let food ={
    x:3,
    y:5
}

//game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return ;
    }
    lastPaintTime = ctime;
    gameEngine();

    //console.log(ctime);

}

function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }
  
    if ((snake[0].x >= 18 || snake[0].x <= 0) || (snake[0].y >= 18 || snake[0].y <= 0)) {
      return true;
    }
    return false;
  }
  

function gameEngine(){
    //updating the snake array and food
    console.log(`x: ${snakeArr[0].x}, y: ${snakeArr[0].y}`)
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game over. Press any key to play again");
        snakeArr = [{x:13, y:15}]
        musicSound.play();
        score = 0;
    }
    //if you have eaten the food increment the score
    if(snakeArr[0].y===food.y && snakeArr[0].x === food.x){
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            hiScoreBox.innerHTML = "Hi-Score: " + hiscoreval;
        }
        scoreBox.innerHTML="Score:" + score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y:snakeArr[0].y+inputDir.y})
        let a = 2;
        let b= 16; // for keeping distant from border
        food = {x: Math.round(a+ (b-a)*Math.random()),y: Math.round(a+ (b-a)*Math.random())}
    }

    //moving the snake 
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};


    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y += inputDir.y;

    // updating the snake array 
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index=== 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild (snakeElement);
    })

    //Display the food

        foodElement = document.createElement('div');
         foodElement.style.gridRowStart = food.y;
         foodElement.style.gridColumnStart = food.x;
         foodElement.classList.add('food')
        board.appendChild(foodElement);



}
 

//Main logic starts here
window.requestAnimationFrame(main);
let hiscore= localStorage.getItem('hiscore');
if(hiscore===null)
{
     hiscoreval=0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore)
    hiScoreBox.innerHTML = "Hi-Score: " + hiscoreval;
}
window.addEventListener('keydown',(e)=>{
    inputDir= {x:0,y:1} // start the game
    moveSound.play();

    switch(e.key){

        case "ArrowUp":
            console.log(`${e.key}`)
            inputDir.x= 0;
            inputDir.y = -1;
            
            break;
        case "ArrowDown":
            console.log(`${e.key}`)
            inputDir.x= 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log(`${e.key}`)
            inputDir.x= -1;
            inputDir.y = 0;
            break; 
        case "ArrowRight":
            console.log(`${e.key}`)
            inputDir.x= 1;
            inputDir.y = 0;
            break;
        default:
            console.log(`${e.key}`)
            break;
    }

})