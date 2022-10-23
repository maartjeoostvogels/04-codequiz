var startQuiz = document.getElementById("startQuiz")
var saveScore = document.getElementById("saveScore")
var viewScores = document.getElementById("viewScores")
var playAgain = document.getElementById("playAgain")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var results = document.getElementById("results")

var options = document.getElementById("options")
var message = document.getElementById("message")

var timer = document.getElementById("timer")

var summary = document.getElementById("summary")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

function stopGame() {

    clearInterval(countdownTimer);
    timer.textContent = ""

    quiz.style.display = "none";
    result.style.display = "flex"

    summary.textContent = "Your Score Is: " + score;
}

function onSaveScore(e) {
    var initials = document.getElementById("initials").value

    if (initials !== "") {
        localStorage.setItem(initials, score);

        document.getElementById("initials").value = "";
    }
}

function onviewScores(e) {
    window.location.href = 'assets/scores.html';
}

function onSelectAnswer(e) {
var correctAnswer = questions[currentQuestion].answer;
var userAnswer = e.target.textContent;

if (correctAnswer === userAnswer) {
    score++;

    displayMessage("Go Sweet Babylegs!")

} else {

    score--;
    displayMessage("Et Tu Brute?")
}

displayQuestion();
}

function displayMessage(msg) {
    message.textContent = msg;

    setTimeout(function () {
        message.textContent = "";
    },2000);
}

function displayQuestion() {
    
    currentQuestion++;

    console.log('current question is ' + currentQuestion);

    if (currentQuestion >= questions.length) {
        stopGame();
        return
    }

    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title

    options.innerHTML = "";

    for (var i = 0; i < question.choices.length; i++) {

        var option = document.createElement("div");
        option.textContent = question.choices[i];
        option.onclick = onSelectAnswer;
        option.classList.add("option");

        options.appendChild(option);
    }
}

function onStartGame() {
        secondsLeft = 75;
        currentQuestion = 0;
        score = 0;

        countdownTimer = setInterval(function () {

            if (secondsLeft > 0) {
                timer.textContent = secondsLeft;
            } else {
                stopGame();
            }
            secondsLeft--;

        }, 1000);

        displayQuestion();
}

startQuiz.addEventListener("click", onStartGame);
saveScore.addEventListener("click", onSaveScore);
viewScores.addEventListener("click", onviewScores);
playAgain.addEventListener("click", onStartGame);