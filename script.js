'use strict';

//starting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const currrent1 = document.getElementById('current--1');
const dices = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition

let currentScore, activePlayer, scores, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  currrent1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  dices.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player0.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);
    dices.src = `dice-${diceNumber}.png`;
    dices.classList.remove('hidden');

    if (diceNumber !== 1) {
      // add roll dice number to current score.
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// hold score

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //player winss
    if (scores[activePlayer] >= 20) {
      playing = false;
      dices.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //console.log('Player wins..');
    } else {
      switchPlayer();
    }
  }
});

// Reseting the game.

btnNew.addEventListener('click', init);
