const questions = [
  {
    question: "What does const mean in JavaScript?",
    answer: [
      { text: "Variable can be reassigned", correct: false },
      { text: "Global variable", correct: false },
      { text: "Block-scoped variable", correct: false },
      { text: "Variable that cannot be reassigned", correct: true },
    ],
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answer: [
      { text: "Number", correct: false },
      { text: "Character", correct: true },
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
    ],
  },
  {
    question: "What is the output type of typeof NaN?",
    answer: [
      { text: "NaN", correct: false },
      { text: "number", correct: true },
      { text: "undefined", correct: false },
      { text: "object", correct: false },
    ],
  },
  {
    question: "Which keyword is used to define a constant variable?",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "static", correct: false },
    ],
  },
  {
    question: "Which data type is not primitive in JavaScript?",
    answer: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "String", correct: false },
      { text: "Object", correct: true },
    ],
  },
  {
    question: "What is the use of push() method?",
    answer: [
      { text: "Remove item", correct: false },
      { text: "Add item to end", correct: true },
      { text: "Sort array", correct: false },
      { text: "Add item to start", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButton.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
