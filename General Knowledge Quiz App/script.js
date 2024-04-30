const questionElement = document.getElementById('question');
const buttonContainer = document.querySelector('.button-container');
const answerElement = document.querySelectorAll('.answer');
const nextBtn = document.querySelector('.next-btn');


const questions = [
  {
    question: "What is the largest ocean in the world?",
    answers: [
      {text: "Pacific Ocean", correct: true},
      {text: "Artic Ocean", correct: false},
      {text: "Atlantic Ocean", correct: false},
      {text: "Indian Ocean", correct: false},
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      {text: "Saturn", correct: false},
      {text: "Uranus", correct: false},
      {text: "Jupiter", correct: true},
      {text: "Venus", correct: false},
    ]
  },
  {
    question: "How many bones does the human body have?",
    answers: [
      {text: "152", correct: false},
      {text: "206", correct: true},
      {text: "225", correct: false},
      {text: "124", correct: false},
    ]
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      {text: "1910", correct: false},
      {text: "1928", correct: false},
      {text: "1900", correct: false},
      {text: "1912", correct: true},
    ]
  },
  {
    question: "Which team has the most premier league trophies?",
    answers: [
      {text: "Man Utd", correct: true},
      {text: "Liverpool", correct: false},
      {text: "Arsenal", correct: false},
      {text: "Chelsea", correct: false},
    ]
  },
  {
    question: "Which year was Dragon Ball released?",
    answers: [
      {text: "1996", correct: false},
      {text: "1990", correct: false},
      {text: "1986", correct: true},
      {text: "2000", correct: false},
    ]
  },
  {
    question: "Which year did the Chernobyl disaster happen?",
    answers: [
      {text: "1986", correct: true},
      {text: "1970", correct: false},
      {text: "1958", correct: false},
      {text: "1995", correct: false},
    ]
  },
  {
    question: "What is the largest animal on Earth?",
    answers: [
      {text: "Elephant", correct: false},
      {text: "Rhino", correct: false},
      {text: "Hippo", correct: false},
      {text: "Blue Whale", correct: true},
    ]
  },
  {
    question: "What famous chapel did Michelangelo paint?",
    answers: [
      {text: "Sainte-Chapelle", correct: false},
      {text: "Sassetti Chapel", correct: false},
      {text: "Sistine Chapel", correct: true},
      {text: "Saint-Michel d'Aiguilhe", correct: false},
    ]
  },
  {
    question: "Which city is the most densely populated?",
    answers: [
      {text: "Tokyo", correct: false},
      {text: "Manila", correct: true},
      {text: "Madrid", correct: false},
      {text: "Canberra", correct: false},
    ]
  },
];

let score = 0;
let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'Next';
  showQuestion();
};

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('answer');
    buttonContainer.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    };
    button.addEventListener('click', selectAnswer);
  })
};

function resetState() {
  nextBtn.style.display = 'none';
  while(buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  };
};

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(buttonContainer.children).forEach(button => {
    if(button.dataset.correct === 'true'){
      button.classList.add('correct');
    }
    button.disabled = true
  });
  nextBtn.style.display = 'block';
};

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block';
};

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

nextBtn.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  }else {
    startQuiz();
  }
});


startQuiz();