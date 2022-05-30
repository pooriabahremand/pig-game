'use strict';
// defining the variables
const score0el = document.querySelector('#score--0');
const score1el = document.querySelector('#score--1');
const diceel = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const currentScore0el = document.getElementById('current--0');
const currentScore1el = document.getElementById('current--1');
let currentScore = 0;
let activePlayer = 0;
let totalScore0 = 0;
let totalScore1 = 0;
const scores = [0, 0];

// defining functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .getElementById(`player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
  document
    .getElementById(`player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
};

//hiding the unneccesary
diceel.classList.add('hidden');

//building the roll the dice button
rollDiceBtn.addEventListener('click', function () {
  // 1- generating random dice roll
  let dice = Math.trunc(Math.random() * 6) + 1;

  // 2-display the dice
  diceel.classList.remove('hidden');
  diceel.src = `dice-${dice}.png`;

  // 3-check for rolled 1: if true switch to next player
  if (dice !== 1) {
    // adding the dice to current score
    currentScore = currentScore + dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  if (activePlayer === 0) {
    totalScore0 += currentScore;
    score0el.textContent = totalScore0;
    if (totalScore0 >= 100) {
      document.getElementById('player--0').classList.add('player--winner');
    } else {
      switchPlayer();
    }
  } else {
    totalScore1 += currentScore;
    score1el.textContent = totalScore1;
    if (totalScore1 >= 100) {
      document.getElementById('player--1').classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  score0el.textContent = totalScore0;
  score1el.textContent = totalScore1;
  currentScore0el.textContent = currentScore;
  currentScore1el.textContent = currentScore;
  diceel.classList.add('hidden');
  if (
    document.getElementById('player--0').classList.contains('player--winner')
  ) {
    document.getElementById('player--0').classList.remove('player--winner');
  } else {
    document.getElementById('player--1').classList.remove('player--winner');
  }
  if (
    document.getElementById('player--1').classList.contains('player--active')
  ) {
    document.getElementById('player--1').classList.remove('player--active');
    document.getElementById('player--0').classList.add('player--active');
  }
});
