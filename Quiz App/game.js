const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarfull = document.querySelector("#progressBarfull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:
      "Which built-in method returns the characters in a string beginning at the specified location?",
    choice1: "substr()",
    choice2: "getSubstring()",
    choice3: "slice()",
    choice4: "None of the above",
    answer: "1",
  },
  {
    question:
      "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
    choice1: "pop()",
    choice2: "push()",
    choice3: "join()",
    choice4: "map()",
    answer: "2",
  },
  {
    question:
      "When interpreter encounters an empty statements, what it will do?",
    choice1: "Shows a warning",
    choice2: "Prompts to complete the statement",
    choice3: "Throws an error",
    choice4: "Ignores the statements",
    answer: "4",
  },
  {
    question: "The 'function' and 'var' are known as?",
    choice1: "Keywords",
    choice2: "Data types",
    choice3: "Declaration statements",
    choice4: "Prototypes",
    answer: "3",
  },
];

const SCORE_POINTS = 25;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  updateProgressBar();

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
  updateProgressBar();
};

updateProgressBar = () => {
  const progressPercentage = (score / (SCORE_POINTS * MAX_QUESTIONS)) * 100;
  progressBarfull.style.width = `${progressPercentage}%`;
};

startGame();
