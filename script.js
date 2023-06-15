'use strict';

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore;
let activePlayer;
let scores;
let playing;

//Init value
const init = () => {
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    diceEL.classList.add('hidden');
    document.querySelector(`#current--0`).textContent =currentScore;
    document.querySelector(`#current--1`).textContent =currentScore;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
}

init();

//Function switch player
const switchPlayer = () => {
    //Switch player
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0; //Change player
    //Player switch background
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
};

//Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

//Click event on button ROLL
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1: Gerenating a dice
        const dice = Math.trunc(Math.random() * 6 + 1);

        // 2: Display dice
        diceEL.src = `dice-${dice}.png`;
        diceEL.classList.remove('hidden');

        // 3: Check dice === 1 ? currentScore = 0 and Change player : Continue
        if (dice !== 1) {
            //Add score to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

//Click event on button HOLD
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score

        //My code
        // if (activePlayer === 0) {
        //     totalScorePlayer0 += currentScore;
        //     document.querySelector(`#score--${activePlayer}`).textContent =
        //         totalScorePlayer0;
        // } else {
        //     totalScorePlayer1 += currentScore;
        //     document.querySelector(`#score--${activePlayer}`).textContent =
        //         totalScorePlayer1;
        // }

        //Teacher code
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player score >= 100
        // Finish the game

        //My code
        // if (totalScorePlayer0 >= 100) {
        //     console.log('Player 1 wins');
        // } else if (totalScorePlayer1 >= 100) {
        //     console.log('Player 2 wins');
        // }

        //Teacher code
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // 3. Switch the next player
            switchPlayer();
        }
    }
});

//Click event on button NEW GAME
btnNew.addEventListener('click', function() {
    init();
})