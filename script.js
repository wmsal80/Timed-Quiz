//sets up the functionality of the quiz 
const timerEl = document.getElementById('timer'); 
const timerCl = document.querySelector('.timer');
const startBtn = document.getElementById('start-btn');
const questionContainerEl = document.getElementById('question-container');
const instructionsEl = document.getElementById('instructions')
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answer-buttons');
const answerBtn1 = document.getElementById('Answer1');
const answerBtn2 = document.getElementById('Answer2');
const answerBtn3 = document.getElementById('Answer3');
const answerBtn4 = document.getElementById('Answer4');
const scoreEl = document.getElementById('score');
const results = document.getElementById('results');
const highScoreEl = document.getElementById('high-score');

// Timer portion. This portion shows what happens when you run out of time.

let timerCount = 75;
let timerId = '';

function countDown() {
    timerEl.innerText = timerCount;
    if (timerCount > 0) {
        timerCount--;
    } else {
        clearInterval(timerId);
        questionContainerEl.classList.add('hide');
        timerCl.textContent = 'Time is up! Quiz will reload!';
        timerCl.setAttribute('style', 'color: red')
        setTimeout(function () {
            location.reload()
        }, 2000)
    }
}
countDown()

// start button is clicked
startBtn.addEventListener('click', startQuiz)

function startQuiz() {

    clearInterval(timerId);
    startBtn.classList.add('hide')
    questionContainerEl.classList.remove('hide')

    displayQuestion()
    timerId = setInterval(countDown, 1000)
}

// This is how the questions are setup to provide multiple choices.
let presQuestionIndex = 0

function displayQuestion() {
    questionEl.innerText = questions[presQuestionIndex].question
    answerBtn1.innerText = questions[presQuestionIndex].answers[0].text
    answerBtn2.innerText = questions[presQuestionIndex].answers[1].text
    answerBtn3.innerText = questions[presQuestionIndex].answers[2].text
    answerBtn4.innerText = questions[presQuestionIndex].answers[3].text
    answerBtn1.setAttribute('data-correct', questions[presQuestionIndex].answers[0].correct)
    answerBtn2.setAttribute('data-correct', questions[presQuestionIndex].answers[1].correct)
    answerBtn3.setAttribute('data-correct', questions[presQuestionIndex].answers[2].correct)
    answerBtn4.setAttribute('data-correct', questions[presQuestionIndex].answers[3].correct)
}

// This portion shows what happens when you get a question wrong or right. It then proceeds to the next question.
let answerCorrect = 0
let answerWrong = 0

answerBtn1.addEventListener('click', clickAnswer)
answerBtn2.addEventListener('click', clickAnswer)
answerBtn3.addEventListener('click', clickAnswer)
answerBtn4.addEventListener('click', clickAnswer)

function clickAnswer() {
    let selection = this.getAttribute('data-correct')
    if (selection == 'true') {
        answerCorrect++
        alert('You got it right!')
    } else {   //This shows the penalty for getting the answer wrong
        answerWrong++
        timerCount -= 10
        alert('OOPS, you missed this one.')
    }
    if (presQuestionIndex < questions.length - 1) {
        presQuestionIndex++
        displayQuestion()
    }
    else {
        endQuiz()
    }
}

function endQuiz() {
    clearInterval(timerId)
    timerEl.innerText = timerCount
    questionContainerEl.classList.add('hide')
    instructionsEl.classList.add('hide')
    scoreEl.classList.remove('hide')
    let score = (timerCount * answerCorrect)
    results.innerText = "Right: " + answerCorrect + " / Wrong: " + answerWrong + " / Your Score: " + score
    //This section is what stores the previous score while showing the current score.
    let highScore = parseInt(localStorage.getItem('highScore'));
    highScoreEl.textContent = highScore || 0;

    if (highScore && score > highScore) {
        localStorage.setItem('highScore', score);
    } else if (!highScore) localStorage.setItem('highScore', score);
}

const questions = [
    {
        question: 'The condition in an if/else statement is enclosed within ____.',
        answers: [
            { text: 'quotes', correct: false },
            { text: 'curly brackets', correct: false },
            { text: 'parentheses', correct: true },
            { text: 'square brackets', correct: false }
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            { text: 'numbers and strings', correct: false },
            { text: 'other arrays', correct: false },
            { text: 'booleans', correct: false },
            { text: 'all of the above', correct: true }
        ]
    },
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            { text: 'strings', correct: false },
            { text: 'booleans', correct: false },
            { text: 'alerts', correct: true },
            { text: 'numbers', correct: false }
        ]
    },
    {
        question: 'A very useful tool used during while writing code and figuring out where you messed up is:',
        answers: [
            { text: 'JavaScript', correct: false },
            { text: 'terminal/bash', correct: false },
            { text: 'for loops', correct: false },
            { text: 'console.log', correct: true }
        ]
    },

    {
        question: 'Which of the following is NOT a conditional?:',
        answers: [
            { text: '===', correct: false },
            { text: '==', correct: false },
            { text: '=', correct: true },
            { text: '!=', correct: false }
        ]
    },

    {
        question: 'Who invented the internet:',
        answers: [
            { text: 'Me', correct: false },
            { text: 'Me', correct: false },
            { text: 'Al Gore', correct: true },
            { text: 'Me', correct: false }
        ]
    },

    {
        question: 'What is used to create the general framework of a webpage:',
        answers: [
            { text: 'Express', correct: false },
            { text: 'HTML', correct: true },
            { text: 'Pascal', correct: false },
            { text: 'Python', correct: false }
        ]
    },
    {
        question: 'Who invented JavaScript:',
        answers: [
            { text: 'Sheldon Cooper', correct: false },
            { text: 'Brendan Eich', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Elon Musk', correct: false }
        ]
    },
    {
        question: 'What must King Arthur bring to the knights who say "Ni!":',
        answers: [
            { text: 'an unladen swallow', correct: false },
            { text: 'gold', correct: false },
            { text: 'a shrubbery', correct: true },
            { text: 'Excalibur', correct: false }
        ]
    },
]
