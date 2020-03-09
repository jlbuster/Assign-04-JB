
// Variables
const start = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const divWrong = document.getElementById('wrong-div')
const quesContainer = document.getElementById('ques-container')
const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer-buttons')
const scoreContainer = document.getElementById('highscores')

let userInitials = document.querySelector("#initialText");

let timeScore = document.getElementById('timescore')

let shuffledQuestions, currentQuestionIndex

let timeElement = document.querySelector(".time");
let timeLeft = 100;

hiscores = []

start.addEventListener('click', Game)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    questionReady()
})

//Starts the game
function Game() {
    setTime()
    start.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    quesContainer.classList.remove('hide')

    questionReady()
}

function questionReady() {
    if (shuffledQuestions.length > currentQuestionIndex) {
        questionReset()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    } else {
        quesContainer.classList.add('hide')
        nextButton.classList.add('hide')
        timeElement.classList.add('hide')
        scoreContainer.classList.remove('hide')
        timeScore.classList.remove('hide')
        
        let finalScore = ""
        finalScore = timeLeft

        timeScore.textContent='You scored ' + finalScore

        userInitials.textContent = userName

        hiscores.push({userName: userName, finalScore: finalScore})

        localStorage.setItem('hiscores', JSON.stringify(hiscores))

        //WHY DOES MY SUBMIT BUTTON KEEP RESTARTING MY APP WTF

        hiscores= JSON.parse(localStorage.hiscores)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.addEventListener('click', correctAnswer)
        } else {
            button.addEventListener('click', wrongAnswer)
        }
        answerElement.appendChild(button)
    })
}

function questionReset() {
    nextButton.classList.add('hide')
    divWrong.classList.add('hide')
    while (answerElement.firstChild) {
        answerElement.removeChild
        (answerElement.firstChild)
    }
}

function correctAnswer() {
    nextButton.classList.remove('hide')
    divWrong.classList.add('hide')
}

function wrongAnswer() {
    divWrong.classList.remove('hide')
    nextButton.classList.add('hide')
    timeLeft = timeLeft - 10
}

const questions = [
    {
        question: 'What is a Pomelo?',
        answers: [
            { text: 'A breed of dog', correct: false },
            { text: 'The largest citrus fruit', correct: true },
            { text: 'Something that cheerleaders hold', correct: false },
            { text: 'An old-fashioned punching bag', correct: false }
        ]
    },
    {
        question: 'How many points is the letter X worth in a game of Scrabble (english version)?',
        answers: [
            { text: 'None', correct: false },
            { text: '8', correct: true },
            { text: '10', correct: false },
            { text: '11', correct: false }
        ]
    },
    {
        question: 'What is a tarsier?',
        answers: [
            { text: 'A primate', correct: true },
            { text: 'A rodent', correct: false },
            { text: 'A lizard', correct: false },
            { text: 'A bird', correct: false }
        ]
    },
    {
        question: 'Which of these words is spelled incorrectly?',
        answers: [
            { text: 'Consensus', correct: false },
            { text: 'Mayhem', correct: false },
            { text: 'Prerogative', correct: false },
            { text: 'Cemetary', correct: true }
        ]
    },
    {
        question: 'Which of the following is a synonym "benighted"?',
        answers: [
            { text: 'Noble', correct: false },
            { text: 'Old', correct: false },
            { text: 'Smitten', correct: false },
            { text: 'Ignorant', correct: true }
        ]
    }
]

function setTime() {
    let timerInterval = setInterval(function() {
      timeLeft--;
      timeElement.textContent = "Time : " + timeLeft;
  
      if(timeLeft === 0) {
        clearInterval(timerInterval);
      }
  
    }, 1000);
  }