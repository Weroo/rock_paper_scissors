//DOM Objects
const playButton = document.querySelector(".play-button");
const iconsDiv = document.querySelector("#IconsDiv");
const rockIcon = document.querySelector("#IconRock");
const paperIcon = document.querySelector("#IconPaper");
const scissorsIcon = document.querySelector("#IconScissors");
const iconDiv = document.querySelectorAll(".icon");

const rockEnemyIcon = document.createElement("div");
rockEnemyIcon.id = "IconEnemyRock";
rockEnemyIcon.classList.add("icon-game");
const rockEnemyIconImage = document.createElement("img");
rockEnemyIconImage.classList.add("delete-pointer-events");
rockEnemyIconImage.src = "imgs/rockIcon.svg";
rockEnemyIcon.appendChild(rockEnemyIconImage);

const paperEnemyIcon = document.createElement("div");
paperEnemyIcon.id = "IconEnemyPaper";
paperEnemyIcon.classList.add("icon-game");
const paperEnemyIconImage = document.createElement("img");
paperEnemyIconImage.classList.add("delete-pointer-events");
paperEnemyIconImage.src = "imgs/paperIcon.svg";
paperEnemyIcon.appendChild(paperEnemyIconImage);

const scissorsEnemyIcon = document.createElement("div");
scissorsEnemyIcon.id = "IconEnemyScissors";
scissorsEnemyIcon.classList.add("icon-game");
const scissorsEnemyIconImage = document.createElement("img");
scissorsEnemyIconImage.classList.add("delete-pointer-events");
scissorsEnemyIconImage.src = "imgs/scissorsIcon.svg";
scissorsEnemyIcon.appendChild(scissorsEnemyIconImage);

var iconRockName;
var iconPaperName;
var iconScissorsName;

var nicknameTextInput;
var nickname = "";
var playerIconSelection = "";
var enemyIconSelection = "";

var wins = 0;
var loses = 0;
var ties = 0;

//Media query
var matchMediaQuery = window.matchMedia("(max-width: 800px)");

//Event listeners
playButton.addEventListener("click",startGame);

//Functions
function startGame(event){
    //Remove button
    const playButtonDiv = playButton.parentElement;
    playButtonDiv.remove();

    promptNickname();
}

function promptNickname() {
    //Display instructions
    const instructionsDiv = document.createElement("div");
    instructionsDiv.classList.add("instructions-div");
    document.body.appendChild(instructionsDiv);

    const chooseNicknameButton = document.createElement("button");
    chooseNicknameButton.innerText = "Choose nickname";
    chooseNicknameButton.classList.add("play-button");
    instructionsDiv.appendChild(chooseNicknameButton);

    chooseNicknameButton.addEventListener("click",getNicknameAndPlay);

    const icons = document.querySelectorAll(".icon");
    icons.forEach(function(element){
        element.remove();
    });

    const nicknameText = document.createElement("h2");
    nicknameText.innerText = "Nickname: ";
    nicknameText.classList.add("nickname-margin");
    
    const iconsDiv = document.querySelector("#IconsDiv");
    iconsDiv.appendChild(nicknameText);

    nicknameTextInput = document.createElement("input");
    nicknameTextInput.type = "text";
    nicknameTextInput.classList.add("nickname-margin");
    nicknameTextInput.classList.add("nickname-input");
    iconsDiv.appendChild(nicknameTextInput);

}

function getNicknameAndPlay(event) {
    //Save nickname's player
    nickname = nicknameTextInput.value;
    console.log(nickname);

    //Erase nickname text
    const nicknameTexts = document.querySelectorAll(".nickname-margin");
    nicknameTexts.forEach(function(element){
        element.remove();
    });

    //Erase button
    const chooseNicknameButton = document.querySelector(".play-button");
    chooseNicknameButton.remove();

    //Create icons text
    iconRockName = document.createElement("h2");
    iconRockName.innerText = "Rock";

    iconPaperName = document.createElement("h2");
    iconPaperName.innerText = "Paper";

    iconScissorsName = document.createElement("h2");
    iconScissorsName.innerText = "Scissors";

    play();
}

function play() {
    //Display icon
    for(var i = 0; i < 3; i++){
        iconsDiv.appendChild(iconDiv[i]);
    }

    //Display instructions
    const instructionsText = document.createElement("h2");
    instructionsText.innerText = nickname + ", select Rock, Paper or Scissors";

    const instructionsDiv = document.querySelector(".instructions-div");
    instructionsDiv.style.top = "280px";
    if(matchMediaQuery.matches){
        instructionsDiv.style.top = "160px";
    }else{
        instructionsDiv.style.top = "280px";
    }
    instructionsDiv.appendChild(instructionsText);
    
    //Display icon text
    iconDiv[0].appendChild(iconRockName);
    iconDiv[1].appendChild(iconPaperName);
    iconDiv[2].appendChild(iconScissorsName);

    //Add pointer and animation to icon's style
    const icons = document.querySelectorAll(".icon-game");
    icons.forEach(function(element){
        element.classList.add("icon-game-border-pointer");
    })

    //Delete pointer event to icon image
    const iconsImages = document.querySelectorAll(".icon-game > img");
    iconsImages.forEach(function(element){
        element.classList.add("delete-pointer-events");
    });

    paperIcon.addEventListener("click",chooseIcon);
    rockIcon.addEventListener("click",chooseIcon);
    scissorsIcon.addEventListener("click",chooseIcon);
}

function chooseIcon(event) {
    const selectedIcon = event.target;
    const selectedIconId = selectedIcon.getAttribute("id");
    switch(selectedIconId){
        case "IconRock":
            paperIcon.parentElement.remove();
            scissorsIcon.parentElement.remove();
            playerIconSelection = "rock";
            break;
        case "IconPaper":
            rockIcon.parentElement.remove();
            scissorsIcon.parentElement.remove();
            playerIconSelection = "paper";
            break;
        case "IconScissors":
            paperIcon.parentElement.remove();
            rockIcon.parentElement.remove();
            playerIconSelection = "scissors";
            break;
    }

    paperIcon.classList.remove("icon-game-border-pointer");
    paperIcon.removeEventListener("click",chooseIcon);

    rockIcon.classList.remove("icon-game-border-pointer");
    rockIcon.removeEventListener("click",chooseIcon);

    scissorsIcon.classList.remove("icon-game-border-pointer");
    scissorsIcon.removeEventListener("click",chooseIcon);

    addEnemySelection();
}

function addEnemySelection() {
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    iconsDiv.appendChild(iconDiv);

    var enemyIcon;
    var randomIndex = -1;
    iconsArray = [rockEnemyIcon,paperEnemyIcon,scissorsEnemyIcon];
    while(randomIndex > 2 || randomIndex < 0) {
        randomIndex = Math.random()*10;
    }
    var randomIndexFixed = Number.parseFloat(randomIndex.toFixed());
    enemyIcon = iconsArray[randomIndexFixed];
    iconDiv.appendChild(enemyIcon);

    var enemyIconString = "";
    const enemyIconId = enemyIcon.getAttribute("id");
    switch(enemyIconId){
        case "IconEnemyRock":
            enemyIconString += "Rock";
            enemyIconSelection = "rock";
            break;
        case "IconEnemyPaper":
            enemyIconString += "Paper";
            enemyIconSelection = "paper";
            break;
        case "IconEnemyScissors":
            enemyIconString += "Scissors";
            enemyIconSelection = "scissors";
            break;
    }
    
    const enemyIconText = document.createElement("h2");
    enemyIconText.innerText = enemyIconString;
    iconDiv.appendChild(enemyIconText);

    //Erase instructions
    eraseInstructions();

    //Display winner
    const instructionsDiv = document.querySelector(".instructions-div");
    instructionsDiv.style.top = "200px";
    if(matchMediaQuery.matches){
        instructionsDiv.style.top = "160px";
    }else{
        instructionsDiv.style.top = "200px";
    }

    const nicknameWinner = document.createElement("h2");
    nicknameWinner.innerText = nickname;
    const winnerText = document.createElement("h2");
    winnerText.style.fontSize = "2em";
    
    instructionsDiv.appendChild(nicknameWinner);

    if(playerIconSelection === enemyIconSelection){
        nicknameWinner.remove();
        winnerText.innerText = "TIE";
    }else{
        if(playerIconSelection === "rock"){
            if(enemyIconSelection === "scissors"){
                winnerText.innerText = "WINNER";
            }else{
                winnerText.innerText = "LOSER";
            }
        }
        if(playerIconSelection === "paper"){
            if(enemyIconSelection === "rock"){
                winnerText.innerText = "WINNER";
            }else{
                winnerText.innerText = "LOSER";
            }
        }
        if(playerIconSelection === "scissors"){
            if(enemyIconSelection === "paper"){
                winnerText.innerText = "WINNER";
            }else{
                winnerText.innerText = "LOSER";
            }
        }
    }

    const flexScorebarValues = document.querySelectorAll(".flex > p");

    if(winnerText.innerText === "WINNER"){
        winnerText.style.color = "#7cff7c";
        wins += 1;
    }
    if(winnerText.innerText === "LOSER"){
        winnerText.style.color = "#a80000";
        loses += 1;
        
    }
    if(winnerText.innerText === "TIE"){
        winnerText.style.color = "#fcb347";
        ties += 1;  
    }

    flexScorebarValues[0].innerText = wins;
    flexScorebarValues[1].innerText = loses;
    flexScorebarValues[2].innerText = ties;

    instructionsDiv.appendChild(winnerText);

    //Show score if it's the first game
    if(wins > 0 || loses > 0 || ties > 0){
        const scorebarDiv = document.querySelector("#ScorebarDiv");
        scorebarDiv.style.visibility = "visible";
    }

    //Display play again button
    const playAgainButtonDiv = document.createElement("div");
    playAgainButtonDiv.id = "PlayAgainButtonDiv";
    playAgainButtonDiv.style.top = "250px";
    document.body.appendChild(playAgainButtonDiv);

    const playAgainButton = document.createElement("button");
    playAgainButton.classList.add("play-button");
    playAgainButton.innerText = "Play again";
    playAgainButtonDiv.appendChild(playAgainButton);

    playAgainButton.addEventListener("click",playAgain);
}

function playAgain(event) {
    //Erase game icons
    const icons = document.querySelectorAll(".icon");
    icons.forEach(function(element){
        element.remove();
    });

    document.getElementById("PlayAgainButtonDiv").remove();
    
    eraseInstructions();    

    play();
}

function eraseInstructions() {
    //Erase instructions
    const instructions = document.querySelectorAll(".instructions-div > h2");
    instructions.forEach(function(element){
        element.remove();
    });
}