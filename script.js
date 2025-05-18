// const title = "Quizzie Minia";
// const titleContainer = document.getElementById("title");

// title.split('').forEach((letter, i) => {
//   const span = document.createElement('span');
// const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#f3722c", "#43aa8b", "#b5179e", "#3a86ff", "#ff006e"];
// span.textContent = letter;
// span.style.color = colors[i % colors.length];
//   span.style.animationDelay = `${i * 0.1}s`;
//   titleContainer.appendChild(span);
// });

// function startQuiz(topic) {
//   alert(`Start quiz for: ${topic}`);
// }


// 🎨 Title animation with colors and bounce delay
// 🎨 Animated title with colors
const title = "Quizzie Minia";
const titleContainer = document.getElementById("title");
const colors = [
  "#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93",
  "#f3722c", "#43aa8b", "#b5179e", "#3a86ff", "#ff006e"
];

title.split('').forEach((letter, i) => {
  const span = document.createElement('span');
  span.textContent = letter;
  span.style.color = colors[i % colors.length];
  span.style.animationDelay = `${i * 0.1}s`;
  span.classList.add("bounce-letter");
  titleContainer.appendChild(span);
});

// 🚀 Start quiz by setting topic and redirecting to quiz.html
function startQuiz(topic) {
  localStorage.setItem("topic", topic); // Save the selected topic
  window.location.href = "quiz.html";   // Navigate to quiz screen
}
