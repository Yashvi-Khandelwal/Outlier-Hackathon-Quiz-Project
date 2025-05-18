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

q.options.forEach((option, index) => {
  const li = document.createElement("li");
  li.classList.add("option-item");

  li.innerHTML = `
    <label class="option-label">
      <input type="radio" name="option" value="${index}">
      <span>${option}</span>
    </label>
  `;

  const input = li.querySelector("input");
  input.addEventListener("change", () => {
    selectOption(li, index, q.answer);
  });

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

function selectOption(selectedLi, selectedIndex, correctIndex) {
  [...optionsList.children].forEach(li => li.classList.remove("selected"));
  selectedLi.classList.add("selected");
  nextBtn.disabled = false;

  if (selectedIndex === correctIndex) {
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
        localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}
