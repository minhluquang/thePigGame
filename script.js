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

//Declare variable for new Features
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const rule = document.querySelector('.rule-modal');
const btnSub = document.querySelector('.modal-sub');

//Function show modal
const showModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

//Function show click new game btn
const showClickNewGame = () => {
    showModal();
    btnSub.classList.add('hidden');
    document.querySelector('.modal-title').style.textAlign = 'center';
    document.querySelector('.modal-title').textContent = 
    `💔 Since there is already a winning player, you cannot ROLL or HOLD 😞`;
} 


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
    } else {
        showClickNewGame();
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
        if (scores[activePlayer] >= 50) {
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //Some new features
            showModal();
            btnSub.classList.add('hidden');
            document.querySelector('.modal-title').style.textAlign = 'center';
            document.querySelector('.modal-title').textContent = `🎉 The player ${activePlayer + 1} wins! 😌`;

        } else {
            // 3. Switch the next player
            switchPlayer();
        }
    } else {
        showClickNewGame();
    }
});

//Click event on button NEW GAME
btnNew.addEventListener('click', function() {
    init();
})

//Update some Features
//Show result the winner
const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Show rule
rule.addEventListener('click', function() {
    showModal();
    var text = `
    👉 The game has 2 players, playing in rounds.<br>
    👉 In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score.<br>
    👉 BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.<br>
    👉 The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn.<br>
    👉 The first player to reac 50 points on GLOBAL score wins the game
    `;
    btnSub.classList.remove('hidden');
    document.querySelector('.modal-title').style.textAlign = 'left';
    document.querySelector('.modal-title').innerHTML = text;
});

//Convert to vietnamese
btnSub.addEventListener('click', function() {
    var text = `
    👉 Trò chơi có 2 người chơi, chơi theo vòng lượt.<br>
    👉 Trong mỗi lượt, một người chơi tung xúc xắc bao nhiêu lần tùy ý. Mỗi kết quả sẽ được cộng vào điểm của lượt đó.<br>
    👉 TUY NHIÊN, nếu người chơi tung được con số 1, toàn bộ điểm của lượt đó sẽ bị mất. Sau đó, đến lượt của người chơi kế tiếp.<br>
    👉 Người chơi có thể chọn 'Giữ', điều đó có nghĩa là điểm của lượt đó sẽ được cộng vào điểm toàn cầu của người chơi. Sau đó, đến lượt của người chơi kế tiếp.<br>
    👉 Người chơi đầu tiên đạt được 50 điểm trên tổng điểm GLOBAL sẽ chiến thắng trò chơi.
    `;
    btnSub.classList.add('hidden');
    document.querySelector('.modal-title').style.textAlign = 'left';
    document.querySelector('.modal-title').innerHTML = text;
})