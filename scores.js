var scoreSheet = document.getElementById("scoresheet")
var backToQuiz = document.getElementById("backtoquiz")

function onBackToQuiz(){
    window.location.href = 'index.html'
}
var savedScores = JSON.parse(localStorage.getItem("savedScores"))

for (var i = 0; i < savedScores.length; i++) {

    var initials = savedScores[i].initials;
    var score = savedScores[i].score;

    var result = document.createElement("div");
    result.classList.add('result');

    result.innerHTML = `<div class="score-item">${initials}</div>
    <div class="score-item">${score}</div>`

    scoreSheet.appendChild(result);

}

backToQuiz.addEventListener("click", onBackToQuiz);