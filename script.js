const colorNames=[
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Cyan",
    "Magneta",
    "Orange",
    "Pink",
    "Brown",
    "Lime",
    "Olive",
    "Teal",
    "Navy",
    "Maroon",
    "Silver"
];
let winning_score=3;
let targetColor="";
let score=0;
let timer=120;
let gameInterval,timerInterval;

let formatTime=(second)=>{
    //lets format the timer time in particular format
    const minutes=Math.floor(second/60);
    
    const sec=second%60;
    return `${minutes}:${sec<10 ? '0':''}${sec}`
}
let updateTimer=()=>{

document.getElementById("timer").textContent=formatTime(timer);
timer--;
if(timer<0){
    endGame(false);
}
}
let setRandomColor=()=>{
    let cells=document.querySelectorAll(".cell");
    cells.forEach(cell=>{
        let randomIndex=Math.floor(Math.random()*colorNames.length);
        let randomColor=colorNames[randomIndex];
        cell.style.backgroundColor=randomColor;
        cell.setAttribute('data-color',randomColor);
    })
}
// setRandomColor();
// setInterval(setRandomColor,1000);
let setTargetColor=()=>{
    let randomIndex=Math.floor(Math.random()*colorNames.length);
    targetColor=colorNames[randomIndex];
    let target_color=document.getElementById("target_color");
    target_color.textContent=targetColor;
}
// setTargetColor();
let initializeGame=()=>{
    score=0;
    timer=120;
    document.getElementById("score").textContent=score;
    document.getElementById("timer").textContent=formatTime(timer);
    document.getElementById("congratsOverlay").style.display="none";
    document.getElementById("loseOverlay").style.display="none";
    setRandomColor();
    setTargetColor();
    // const bgm=document.getElementById("backgroundMusic")
    // bgm.play();
    gameInterval=setInterval(setRandomColor,3000);
    timerInterval=setInterval(updateTimer,1000);
}
initializeGame();



let endGame=(isWin)=>{
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById("backgroundMusic").pause();
    let overlay=isWin? document.getElementById('congratsOverlay'):document.getElementById('loseOverlay');
    overlay.style.display="block";

    if(isWin){
        document.getElementById("winMusic").play();
        // document.getElementById("restartGameOverlay").style.display="block";
    }
    else{
        document.getElementById("looseMusic").play();
        document.getElementById("timer").textContent=formatTime(0);
        
    }
}
let handleClick=(e)=>{
    let clickedColor=e.target.getAttribute('data-color');
    if(clickedColor===targetColor){
        score++;
        document.getElementById("score").textContent=score;
        if(score===winning_score){
            endGame(true);
        }
        
    setRandomColor();
    setTargetColor();
    document.getElementById("correctMusic").play();
    }
    else{   
    document.getElementById("IncorrectMusic").play();
    }
}

document.querySelectorAll(".cell").forEach(cell=>{
    cell.addEventListener("click",handleClick);
})

document.getElementById("restartGameOverlay").addEventListener("click",initializeGame);
document.getElementById("restartGameOverlayLose").addEventListener("click",initializeGame);