var scoresheet = document.getElementById("scoresheet")
var backtoQuiz = document.getElementById("backtoQuiz")

function onBackToQuiz() {
    window.location.href = 'bootcamphw04-codequiz/index.html'
}

for (var i = 0; i < localStorage.length; i++) {

    var initials = localStorage.key(i);
    var score = localStorage.getItem(initials);

    var result = document.creatElement("div");
    results.classList.add("result");

    result.innerHTML = `<div class="score-item">${initials}</div>
        <div class="score-item">${score}</div>`

    scoresheet.appendChild(result);
}

backtoQuiz.addEventListener("click", onBackToQuiz)
