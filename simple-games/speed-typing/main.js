const RANDOM_QUOTE_API = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("textDisplay");
const quoteInputElement = document.getElementById("textInput");
const timerElement = document.getElementById("timer");
const finalElement = document.getElementById("finalScore");
const reloadBtn = document.getElementById("reload");

const quoteColumn = document.getElementById("col1");
const timeColumn = document.getElementById("col2");

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    let quoted = document.createElement("li");
    quoted.innerText = Array.from(arrayValue).join("");
    quoteColumn.appendChild(quoted);

    let score = document.createElement("p");
    score.innerText = timerElement.innerHTML;

    timeColumn.appendChild(score);

    if (quoteColumn.childElementCount > 6) {
      quoteColumn.innerHTML = "";
      timeColumn.innerHTML = "";
      finalElement.classList.add("show");
      timerElement.classList.add("hidden");
      reloadBtn.addEventListener("click", () => {
        finalElement.classList.remove("show");
        timerElement.classList.remove("hidden");
        renderQuote();
      });
    }
    renderQuote();
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderQuote();
