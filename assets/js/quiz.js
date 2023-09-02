var startQuiz = document.getElementById("startQuiz")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var result = document.getElementById("result")

var options = document.getElementById("options")
var message = document.getElementById("message")

var timer = document.getElementById("timer")

var summary = document.getElementById("summary")

var saveScores = document.getElementById("saveScores")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var coundownTimer;

function stopGame() {
    clearInterval(countdownTimer);

    timer.textContent = ""

    quiz.style.display = 'none';

    result.style.display = 'flex'

    summary.textContent = "Your score is " + score;

}

function onSaveScore(e) {
    var savedScores = JSON.parse(localStorage.getItem("savedScores"))
    var initials = document.getElementById("initials").value
    var newScore = {
        initials,
        score
    }
    savedScores.push(newScore)

    if (initials !== "") {
        localStorage.setItem("savedScores", JSON.stringify(savedScores));

        document.getElementById("initials").value = "";
    }
}

function onViewScores(e) {
    window.location.href = 'scores.html'
}

function onSelectAnswer(e) {
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctAnswer === userAnswer) {
        score++;

        displayMessage('Correct answer :)')
    }   else {

        score--;
        displayMessage('Wrong answer :(')
    }
console.log(score)
    displayQuestion();
}


function displayMessage(msg) {
    message.textContent = msg;

    setTimeout(function () {
        message.textContent = " ";
    }, 1000);
}

function displayQuestion() {
    currentQuestion++;

    console.log('current question is ' + currentQuestion);

    if (currentQuestion >= questions.length) {
        stopGame();
        return;
    }

    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title

    options.innerHTML = "";

    for (var i = 0; i < question.choices.length; i++) {

        var option = document.createElement("div");
        option.textContent = question.choices[i];
        option.addEventListener("click", onSelectAnswer);
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

    welcome.style.display = 'none';
    result.style.display = 'none';
    quiz.style.display = 'flex';

    displayQuestion();
}


startQuiz.addEventListener("click", onStartGame);
saveScores.addEventListener("click", onSaveScore);
viewScores.addEventListener("click", onViewScores);
playAgain.addEventListener("click", onStartGame);