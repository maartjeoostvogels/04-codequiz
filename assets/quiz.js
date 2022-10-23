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
var messageTimeout;

function stopGame() {
    clearInterval(countdownTimer);
    timer.textContent = "";
    timer.classList.add("hidden");

    quiz.style.display = "none";
    result.style.display = "block";

    summary.textContent = "Your Score Is: " + score;
}

function onSaveScore(e) {
    var initials = document.getElementById("initials").value;

    if (initials !== "") {
        localStorage.setItem(initials, score);

        document.getElementById("initials").value = "";

        window.location.href = 'scores.html';
    }
}

function onviewScores(e) {
    window.location.href = 'scores.html';
}

function onSelectAnswer(e) {
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctAnswer === userAnswer) {
        score++;
        displayMessage("Correct! Go Sweet Babylegs!", { isCorrect: true });
    } else {
        score--;
        secondsLeft-=5;
        displayMessage("Wrong! :'(", { isCorrect: false });
    }
    currentQuestion++;

    displayQuestion();
}

function displayMessage(msg, options) {
    message.textContent = msg;
    message.classList.remove("visually-hidden");
    message.classList.remove("correct");

    if (options.isCorrect) {
        message.classList.add("correct");
    }

    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(function () {
        message.textContent = "Waiting for answer";
        message.classList.add("visually-hidden");
    }, 2000);
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        stopGame();
        return;
    }

    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title;

    options.innerHTML = "";

    for (var i = 0; i < question.choices.length; i++) {
        var option = document.createElement("button");
        option.textContent = question.choices[i];
        option.onclick = onSelectAnswer;
        option.classList.add("option");

        options.appendChild(option);
    }
}

function onStartGame() {
        secondsLeft = 50;
        currentQuestion = 0;
        score = 0;

        timer.textContent = secondsLeft;
        timer.classList.remove("hidden");
        startQuiz.classList.add("hidden");

        quiz.style.display = "block";
        result.style.display = "none";

        clearInterval(countdownTimer);
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