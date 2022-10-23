var scoresheet = document.getElementById("scoresheet");
var scoresTable = document.getElementById("scores");
var backToQuiz = document.getElementById("backToQuiz");

function onBackToQuiz() {
    window.location.href = "index.html";
}

for (var i = 0; i < localStorage.length; i++) {
    var initials = localStorage.key(i);
    var score = localStorage.getItem(initials);

    var scoreRow = document.createElement("tr");
    scoreRow.classList.add("score");
    scoreRow.innerHTML = `<td>${initials}</td>
        <td>${score}</td>`;

    scoresTable.appendChild(scoreRow);
}

backToQuiz.addEventListener("click", onBackToQuiz);