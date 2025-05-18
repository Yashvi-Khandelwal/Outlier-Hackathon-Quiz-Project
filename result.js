const scoreDisplay = document.getElementById("score-display");
const emojiDisplay = document.getElementById("emoji");
const retryBtn = document.getElementById("retry-btn");
const homeBtn = document.getElementById("home-btn");

const score = parseInt(localStorage.getItem("score"));
const topic = localStorage.getItem("topic");

// For total questions, fetch the questions JSON again
fetch(`questions/${topic}.json`)
  .then(res => res.json())
  .then(questions => {
    const total = questions.length;
    scoreDisplay.textContent = `${score} / ${total}`;

    // Show emoji based on score %
    const percent = (score / total) * 100;
    let emoji = "😢"; // default

    if (percent >= 80) emoji = "😎";       // great score
    else if (percent >= 50) emoji = "🙂";  // okay score

    emojiDisplay.textContent = emoji;
  });

// Retry button restarts the same quiz
retryBtn.addEventListener("click", () => {
  window.location.href = "quiz.html";
});

// Home button goes to homepage
homeBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
