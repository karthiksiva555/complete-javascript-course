/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// gameEnded below is called a state variable that stores the state of the application
var scores, roundScore, currentPlayer, gameEnded, prevRoll, winningScore;
//default winning score
winningScore = 50;
newGame();

// the function below is called call back function
// It is an anonymous function as there is no name given for it and it is not accessible outside of event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gameEnded) return;

    document.querySelector('#dice1').style.display = 'block';
    document.querySelector('#dice2').style.display = 'block';
    var randomNumber1 = Math.floor((Math.random() *6 )) + 1;
    var randomNumber2 = Math.floor((Math.random() *6 )) + 1;
    document.querySelector('#dice1').src = 'dice-'+randomNumber1+'.png';
    document.querySelector('#dice2').src = 'dice-'+randomNumber2+'.png';

    if(randomNumber1!==1 && randomNumber2!==1 && !(randomNumber1===6 && prevRoll === 6)){
        roundScore += randomNumber1 + randomNumber2;
        document.getElementById('current-'+currentPlayer).textContent = roundScore;
    } else {
        changeCurrentPlayer();
    }
    prevRoll = randomNumber1;
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gameEnded) return;
    
    scores[currentPlayer] += roundScore;
    document.getElementById('score-'+currentPlayer).textContent = scores[currentPlayer]; 
    var winningScoreText = document.querySelector('.final-score').value;
    if(winningScoreText){
        winningScore = winningScoreText;
    } 

    //check for winner
    if(scores[currentPlayer] >= winningScore){
        document.getElementById('name-'+currentPlayer).textContent = 'Winner!';
        document.querySelector('.player-'+currentPlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+currentPlayer+'-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';
        gameEnded = true;
    } else {
        changeCurrentPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function changeCurrentPlayer() {
    document.getElementById('current-'+currentPlayer).textContent = 0;
    currentPlayer === 0? currentPlayer = 1: currentPlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    roundScore = 0;
    prevRoll = 0;
}

function newGame() {
    gameEnded = false;
    scores = [0,0];
    roundScore = 0;
    currentPlayer = 0;
    prevRoll = 0;
    document.querySelector('#dice1').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
}