window.addEventListener("load", init);

// Globals
const difficulty = {
  easy: 15,
  medium: 10,
  hard: 5,
};

const currentLevel = difficulty.medium;
let time = currentLevel;
let score = 0;
let isPlaying;
const RANDOM_QUOTE_API = "http://api.quotable.io/random";

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentQuote = document.querySelector("#current-quote");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

// Initialize game
function init() {
  seconds.innerHTML = currentLevel;
  getQuote();
  wordInput.addEventListener("input", startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

async function getQuote() {
  const quote = await getRandomQuote();
  currentQuote.innerHTML = quote;
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    getQuote();
    wordInput.value = "";
    score++;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

function matchWords() {
  if (wordInput.value === currentQuote.innerHTML) {
    message.innerHTML = "Correct!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  timeDisplay.innerHTML = time;
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game over!";
    score = -1;
  }
}
