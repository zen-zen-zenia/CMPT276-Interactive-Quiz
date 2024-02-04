//CITE: Got the idea to structure quiz data like this from the OP of this thread
//https://stackoverflow.com/questions/75196774/how-can-i-sequentially-select-and-display-questions-from-an-array-of-questions-u
const quizData = [
  {
    question: 'Which champion is known as the Starchild?',
    choices: ['Nami', 'Janna', 'Soraka', 'Sona'],
    answer: 'Soraka',
  },
  {
    question: 'Which champion is known as The Might of Demacia?',
    choices: ['Garen', 'Jarvan IV', 'Lux', 'Galio'],
    answer: 'Garen',
  },
  {
    question: 'Fill in the blank: ____ the Unforgiven.',
    choices: ['Yasuo', 'Yone', 'Riven', 'Yuumi'],
    answer: 'Yasuo',
  },
  {
    question: 'Which champion carries the title: The Hand of Noxus?',
    choices: ['Swain', 'Darius', 'Sion', 'Draven'],
    answer: 'Darius',
  },
  {
    question: 'At what tempo does Cowbell Alistar hit his cowbell?',
    choices: ['150 bpm', '140 bpm', '160 bpm', '130 bpm'],
    answer: '150 bpm',
  },
  {
    question: 'Which champ has the highest AFK rate?',
    choices: ['Sett', 'Yasuo', 'Yone', 'Zed'],
    answer: 'Sett',
  },
  {
    question: 'Which champion had a custom Ronald McDonald skin made for them?',
    choices: ['Shaco', 'Swain', 'Urgot', 'Tryndamere'],
    answer: 'Shaco',
  },
  {
    question: 'Which champion says "The heart is the strongest muscle"?',
    choices: ['Garen', 'Braum', 'Rakan', 'Yuumi'],
    answer: 'Braum',
  },
  {
    question: "What was the time signature of Jhin's login theme?",
    choices: ['4/4', '3/4', '2/4', '6/8'],
    answer: '4/4',
  },
  {
    question: 'Who says "Welcome to the League of Draven"?',
    choices: ['Draven', 'Draven', 'Draven', ':)'],
    answer: 'Draven',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');
const retryButton = document.getElementById('retry');
const submitButton = document.getElementById('submit');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) { 
  //CITE: Referenced the website for how to Shuffle an array
  //https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  //CITE: I used this link to help me write this function
  //https://stackoverflow.com/questions/75196774/how-can-i-sequentially-select-and-display-questions-from-an-array-of-questions-u
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const choicesElement = document.createElement('div');
  choicesElement.className = 'choices';

  const shuffledChoices = [...questionData.choices];
  shuffleArray(shuffledChoices);

  for (let i = 0; i < shuffledChoices.length; i++) {
    const choiceLabel = document.createElement('label');
    choiceLabel.className = 'choice';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'quiz';
    input.value = shuffledChoices[i];

    const choiceText = document.createTextNode(shuffledChoices[i]);

    choiceLabel.appendChild(input);
    choiceLabel.appendChild(choiceText);
    choicesElement.appendChild(choiceLabel);

    // Each radio input in the group gets the same name in order to restrict
    // the user to selecting only one.
    input.addEventListener('click', () => {
      nextButton.style.display = 'inline-block';
      highlightCorrectAnswer();
    });
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(choicesElement);

  backButton.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
}


function highlightCorrectAnswer() {
  const correctAnswer = quizData[currentQuestion].answer;
  const choices = document.querySelectorAll('input[name="quiz"]');

  choices.forEach(choice => {
    const label = choice.parentElement;
    if (choice.value === correctAnswer) {
      label.classList.add('correct-answer', 'green-text');
    } 
    else if (choice.checked) {
      label.classList.add('wrong-answer', 'red-text');
    } 
    else {
      label.classList.remove('correct-answer', 'green-text', 'wrong-answer', 'red-text');
    }
    choice.disabled = true;
  });
}

function checkAnswer() {
  const selectedChoice = document.querySelector('input[name="quiz"]:checked');
  if (selectedChoice) {
    const answer = selectedChoice.value;
    const correctAnswer = quizData[currentQuestion].answer;

    if (answer === correctAnswer) {
      score++;
    } 
    else { 
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: correctAnswer,
      });
    }
    currentQuestion++;
    selectedChoice.checked = false;

    if (currentQuestion < quizData.length) {
      displayQuestion();
      nextButton.style.display = 'none'; 
    } 
    else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  nextButton.style.display = 'none';
  backButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  submitButton.style.display = 'none';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  showAnswerButton.style.display = 'inline-block';
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  nextButton.style.display = 'none';
  backButton.style.display = 'none';
  retryButton.style.display = 'none';
  submitButton.style.display = 'inline-block'; 
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

//CITE: I used chatGPT for help writing this function 
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        Your Answer: ${incorrectAnswers[i].incorrectAnswer}<br>
        Correct Answer: ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}


function submitQuiz() {
  checkAnswer(); 
  displayResult();
}

nextButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
submitButton.addEventListener('click', submitQuiz);
showAnswerButton.addEventListener('click', showAnswer);

backButton.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
});

// Initially hide certain buttons
nextButton.style.display = 'none';
backButton.style.display = 'none';
retryButton.style.display = 'none';

displayQuestion();
