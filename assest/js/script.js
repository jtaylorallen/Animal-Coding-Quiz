// global variables - HTML recalls -
var startButtonHtml = document.querySelector("#startButton");
var reStartButtonHtml = document.querySelector("#reStartButton");
var quizContainerHtml = document.querySelector("#quizContainer");
var quizQuestionHtml = document.querySelector("#quizQuestion"); //here's where the question goes
var quizAnswersHtml = document.querySelector("#quizAnswers"); // here's where the 4 option buttons go
var buttonOneHtml = document.querySelector("#oneHtml");
var buttonTwoHtml = document.querySelector("#twoHtml");
var buttonThreeHtml = document.querySelector("#threeHtml");
var buttonFourHtml = document.querySelector("#fourHtml");
var timerCountHtml = document.querySelector("#timerCount");
var scoreHtml = document.querySelector("#finalScore");
var inputHtml = document.querySelector("#nameInput");
var scoreButtonHtml = document.querySelector("#scoreButton");
var scoreboardHtml = document.querySelector("#scoreboard");
var scoreContainerHtml = document.querySelector("#scoreContainer");
var scoreboardTitleHtml = document.querySelector("#scoreboardTitle");

// 4 question/answer objects
var questionLeech = {
    question: 'How many brains does a leech have?',
    answer1: 2,
    answer2: 9,
    answer3: 27,
    answer4: 32 //correct answer 
};
var questionElephant = {
    question: 'How many months is an African Elephant pregnant?',
    answer1: 18,
    answer2: 22, //correct answer
    answer3: 11,
    answer4: 9
};
var questionCow = {
    question: 'Have many stomachs does a cow have?',
    answer1: 4, //correct answer
    answer2: 50,
    answer3: 1,
    answer4: 24
};
var questionSnail = {
    question: 'How years can a snail sleep?',
    answer1: 7,
    answer2: 0,
    answer3: 3, //correct answer
    answer4: 30
};

var finalScore = 100;
var timeLeft = 60;
var i = 0;

// array of all objects that have question/answers
var questionAnswerArray = [questionLeech, questionElephant, questionCow, questionSnail];
// array of the one correct answer
var correctAnswerArray = [questionAnswerArray[0].answer4, questionAnswerArray[1].answer2, questionAnswerArray[2].answer1, questionAnswerArray[3].answer3];
var keepingScoreArray = [];

function getLocal(keepingScoreArray) {
    if (localStorage.getItem("final score") === null) {
        //console.log('localStorage is null return keepingScoreArray' + keepingScoreArray);
        return keepingScoreArray;
    } else {
        //console.log('localStorage has stuff in it, return keepingScoreArray' + keepingScoreArray);
        return JSON.parse(localStorage.getItem("final score"));
    }
}

function sortScore(keepingScoreArray) {
    keepingScoreArray = keepingScoreArray.sort(function(a, b) { return a.score - b.score });
    keepingScoreArray = keepingScoreArray.reverse();
    //console.log('lsorting function keepingScoreArray' + keepingScoreArray)
    return keepingScoreArray;
}

// WHEN I click the start button...
startButtonHtml.addEventListener("click", function(event) {
    countdown();
    quizContainerHtml.setAttribute("style", "display:block;");
    scoreContainerHtml.setAttribute("style", "display:block;");

    quizQuestionHtml.innerHTML = questionAnswerArray[i].question;
    buttonOneHtml.innerHTML = questionAnswerArray[i].answer1;
    buttonTwoHtml.innerHTML = questionAnswerArray[i].answer2;
    buttonThreeHtml.innerHTML = questionAnswerArray[i].answer3;
    buttonFourHtml.innerHTML = questionAnswerArray[i].answer4;
});

reStartButtonHtml.addEventListener("click", function() {
    location.reload()
});

// When I click an answer button...
quizAnswersHtml.addEventListener("click", function(event) {
    var targetHtmlElement = event.target;
    event.stopPropagation();
    if (((targetHtmlElement.matches("#fourHtml")) && (buttonFourHtml.innerHTML == correctAnswerArray[0])) ||
        ((targetHtmlElement.matches("#twoHtml")) && (buttonTwoHtml.innerHTML == correctAnswerArray[1])) ||
        ((targetHtmlElement.matches("#oneHtml")) && (buttonOneHtml.innerHTML == correctAnswerArray[2])) ||
        ((targetHtmlElement.matches("#threeHtml")) && (buttonThreeHtml.innerHTML == correctAnswerArray[3]))) {

        var correctAnswerMsg = document.createElement("div");
        correctAnswerMsg.innerHTML = "You Got Question " + (i + 1) + " Correct! 🌈";
        document.getElementById('quizContainer').appendChild(correctAnswerMsg);

        setTimeout(function() {
            correctAnswerMsg.innerHTML = '';
        }, 1000);

    } else {
        //console.log('oops, that is not correct')
        var wrongAnswerMsg = document.createElement("div");
        wrongAnswerMsg.textContent = "Dang It! You Got " + (i + 1) + "Wrong 🦥";
        document.getElementById('quizContainer').appendChild(wrongAnswerMsg);
        // user gets it wrong and loses 15 points
        // take 10 points away from user and keep track of that in our finalScore variable
        timeLeft = (timeLeft - 10)
        finalScore = (finalScore - 10);

        setTimeout(function() {
            wrongAnswerMsg.innerHTML = '';
        }, 1000);
    }

    i++;

    if (questionAnswerArray.length == i) {
        clearInterval(timeInterval);
        finalScore = (finalScore - (60 - timeLeft));
        console.log(finalScore);
        scoreHtml.innerHTML = "You are done! 🦄 🐅 🦔  our score is " + finalScore + "%";

        scoreButtonHtml.addEventListener("click", function() {
            reStartButtonHtml.setAttribute("style", "display:block;");
            startButtonHtml.setAttribute("style", "display:none;");
            scoreboardTitleHtml.setAttribute("style", "display:block;");

            keepingScoreArray = getLocal(keepingScoreArray);

            var scoreBoard = {
                name: inputHtml.value,
                score: finalScore
            }

            keepingScoreArray.push(scoreBoard);
            keepingScoreArray = sortScore(keepingScoreArray);

            for (var i = 0; i < keepingScoreArray.length; i++) {
                var j = keepingScoreArray[i];

                var newScoreLi = document.createElement("li");
                newScoreLi.textContent = "name: " + j.name + "  |  score: " + j.score;
                scoreboardHtml.appendChild(newScoreLi);
            }
            localStorage.setItem("final score", JSON.stringify(keepingScoreArray));

        });
    }
    quizQuestionHtml.innerHTML = questionAnswerArray[i].question;
    buttonOneHtml.innerHTML = questionAnswerArray[i].answer1;
    buttonTwoHtml.innerHTML = questionAnswerArray[i].answer2;
    buttonThreeHtml.innerHTML = questionAnswerArray[i].answer3;
    buttonFourHtml.innerHTML = questionAnswerArray[i].answer4;
});

var timeInterval = '';

function countdown() {
    timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerCountHtml.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerCountHtml.innerHTML = timeLeft + ' second remaining HURRY UP';
            timeLeft--;
        } else {
            timerCountHtml.innerHTML = '0';
            clearInterval(timeInterval);
        }
    }, 1000);
}
