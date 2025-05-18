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

function showResultOverlay() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.style.filter = 'blur(5px)';

  const overlay = document.createElement('div');
  overlay.id = 'result-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.color = '#333';
  overlay.style.fontSize = '1.5rem';
  overlay.style.zIndex = 1000;

  let emoji = '😐';
  const percent = (score / questions.length) * 100;
  if (percent >= 80) emoji = '🤩';
  else if (percent >= 50) emoji = '🙂';
  else emoji = '😞';

  overlay.innerHTML = `
    <div style="background: white; padding: 2rem 3rem; border-radius: 1rem; box-shadow: 0 5px 20px rgba(0,0,0,0.2); text-align: center; max-width: 400px;">
      <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
      <h2>Your Score</h2>
      <p style="font-size: 2rem; margin: 1rem 0;">${score} / ${questions.length}</p>
      <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
        <button id="retry-btn" style="padding: 0.7rem 1.5rem; background: #3f51b5; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Retry</button>
        <button id="home-btn" style="padding: 0.7rem 1.5rem; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Home</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

   document.getElementById('retry-btn').addEventListener('click', () => {
    document.body.removeChild(overlay);
    quizContainer.style.filter = 'none';
    currentQuestion = 0;
    score = 0;
    showQuestion();
  });

  document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; 
  });
}



function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
        showResultOverlay();
  }
}
