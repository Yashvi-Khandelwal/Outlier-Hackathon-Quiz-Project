const scoreDisplay = document.getElementById("score-display");
const emojiDisplay = document.getElementById("emoji");
const retryBtn = document.getElementById("retry-btn");
const homeBtn = document.getElementById("home-btn");
const score = parseInt(localStorage.getItem("score"));
const topic = localStorage.getItem("topic");

fetch(`questions/${topic}.json`)
  .then(res => res.json())
  .then(questions => {
    const total = questions.length;
    scoreDisplay.textContent = `${score} / ${total}`;

    const percent = (score / total) * 100;
    let emoji = "😢";

    if (percent >= 80) emoji = "😎";
    else if (percent >= 50) emoji = "🙂";

    emojiDisplay.textContent = emoji;
  });

retryBtn.addEventListener("click", () => {
  window.location.href = "quiz.html";
});

homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
