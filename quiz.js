// let questions = [];
// let currentQuestionIndex = 0;
// let score = 0;
// let timer;
// let timeLeft = 10;

// const questionEl = document.getElementById("question");
// const optionsEl = document.getElementById("options");
// const nextBtn = document.getElementById("next-btn");
// const timeLeftEl = document.getElementById("time-left");

// window.onload = async function () {
//   const topic = localStorage.getItem("selectedTopic") || "html";
//   const res = await fetch(`data/${topic}.json`);
//   questions = await res.json();

//   loadQuestion();
// };

// function loadQuestion() {
//   clearInterval(timer);
//   timeLeft = 10;
//   timeLeftEl.textContent = timeLeft;
//   const q = questions[currentQuestionIndex];

//   questionEl.textContent = `Q${currentQuestionIndex + 1}: ${q.question}`;
//   optionsEl.innerHTML = "";

//   q.options.forEach((opt, i) => {
//     const div = document.createElement("div");
//     div.classList.add("option");
//     div.textContent = opt;
//     div.onclick = () => selectOption(div, i);
//     optionsEl.appendChild(div);
//   });

//   nextBtn.disabled = true;

//   timer = setInterval(() => {
//     timeLeft--;
//     timeLeftEl.textContent = timeLeft;

//     if (timeLeft <= 0) {
//       clearInterval(timer);
//       goNext();
//     }
//   }, 1000);
// }

// function selectOption(selectedDiv, index) {
//   clearInterval(timer);
//   const allOptions = document.querySelectorAll(".option");
//   allOptions.forEach(opt => opt.classList.remove("selected"));
//   selectedDiv.classList.add("selected");

//   const correct = questions[currentQuestionIndex].answer;
//   if (index === correct) score++;

//   nextBtn.disabled = false;
// }

// function goNext() {
//   currentQuestionIndex++;
//   if (currentQuestionIndex < questions.length) {
//     loadQuestion();
//   } else {
//     localStorage.setItem("finalScore", score);
//     window.location.href = "result.html"; // create this later
//   }
// }

// nextBtn.onclick = goNext;


let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;
const topic = localStorage.getItem("topic") || "html";

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

fetch(`questions/${topic}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsList.innerHTML = "";

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => selectOption(li, option, q.answer));
    optionsList.appendChild(li);
  });

  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      goToNextQuestion();
    }
  }, 1000);
}

function updateTimer() {
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
}

function selectOption(selectedLi, selected, correct) {
  [...optionsList.children].forEach(li => li.classList.remove("selected"));
  selectedLi.classList.add("selected");
  nextBtn.disabled = false;

  if (selected === correct) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  goToNextQuestion();
});

function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    // TODO: Show result screen
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}
