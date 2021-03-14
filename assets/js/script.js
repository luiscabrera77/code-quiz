// global
var index = 0;
var score = 0;
var secondsLeft = 75; // set to 75 for final commit
var interval;
var highscore;
var name;
var countdownEl = document.querySelector("#timer"); //nav-div
var divEl = document.querySelector("#question"); //first-div
var body = document.body; //background experiment
var allPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
var newPlayerObj;

// html elements - what am I'm going to insert?
var timeEl = document.createElement("p");
var startEl = document.createElement("h2");
var questionEl = document.createElement("p");
var startBtn = document.createElement("button");
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
var labelEl = document.createElement("label");
var inputEl = document.createElement("input");
var submitBtn = document.createElement("button");
var scoreDiv = document.createElement("div");

// classes and defaults - how are they going to be "boot-camp dressed"?
timeEl.className = "timer";
startEl.className = "h2 text-primary";
startEl.textContent = "You have 75 seconds to answer 5 questions. Every wrong answer will penalize your time by 10 seconds. Good luck!"
questionEl.className = "h2";
startBtn.className = "btn btn-primary btn-lg btn-block mt-4 col-12";
startBtn.textContent = "Start";
btn1.className = "btn btn-outline-primary btn-block mt-4 mb-2 col-6 ml-4 option";
btn2.className = "btn btn-outline-primary btn-block ml-4 mb-2 col-6 option";
btn3.className = "btn btn-outline-primary btn-block ml-4 mb-2 col-6 option";
btn4.className = "btn btn-outline-primary btn-block ml-4 mb-2 col-6 option";
labelEl.className = "ml-4";
inputEl.className = "form-control form-control-lg col-12 mb-2 mt-4";
inputEl.placeholder = "Enter your name to record your score";
submitBtn.className = "btn btn-success btn-lg col-12";
submitBtn.textContent = "Submit"
scoreDiv.className = "h4 mb-2"

// Load all the elements to the HTML - Arrange properly from top to bottom
countdownEl.appendChild(timeEl);
divEl.prepend(startEl);
divEl.appendChild(scoreDiv);
divEl.appendChild(inputEl);
divEl.appendChild(submitBtn);
divEl.appendChild(startBtn);
divEl.appendChild(btn1);
divEl.appendChild(btn2);
divEl.appendChild(btn3);
divEl.appendChild(btn4);
divEl.prepend(questionEl);
divEl.appendChild(labelEl);

//Hide these elements initially
questionEl.hidden = true;
scorecard.hidden = true;
btn1.hidden = true;
btn2.hidden = true;
btn3.hidden = true;
btn4.hidden = true;
labelEl.hidden = true;
inputEl.hidden = true;
submitBtn.hidden = true;
scoreDiv.hidden = true;

//Array with questions and answers
var questions = [
  { q: 'Inside which HTML element do we put the Javascript?', a: ['<js>', '<script>', '<scripting>', '<javascript>'], ca: '1' },
  { q: 'How do you write "Hello World" in an alert box?', a: ['masBox("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");'], ca: '3' },
  { q: 'How do you call a function named "myFunction"?', a: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'function myFunction'], ca: '1' },
  { q: 'How do you write an IF statement in JavaScript?', a: ['if (i==5)', 'if i = 5', 'if i == 5 then', 'if i = 5 then'], ca: '0' },
  { q: 'How does a FOR loop start?', a: ['for (var i = 0; i < 5; i++)', 'for var i = 0 to 5', 'for (i < 5; i++)', 'for (i = 0; i < 5)'], ca: '0' },
];

// Establish buttons values
btn1.value = "0";
btn2.value = "1";
btn3.value = "2";
btn4.value = "3";

// Function to start timer
function startTimer() {
  interval = setInterval(function () {
    secondsLeft--;
    timeLeft();
    if (secondsLeft <= 0) {
      clearInterval(interval);
      endGanme();
    }
  }, 1000);
}

// Update seconds
function timeLeft() {
  timeEl.textContent = secondsLeft;
}

//Establish a value every time a button is clicked
function askQuestion(index) {
  questionEl.textContent = questions[index].q;
  btn1.textContent = questions[index].a[0];
  btn2.textContent = questions[index].a[1];
  btn3.textContent = questions[index].a[2];
  btn4.textContent = questions[index].a[3];
}

//Tell the user his choice was wrong
function wrong() {
  $(body).toggleClass('wrong');
  setTimeout(function () {
    $(body).removeClass('wrong');
  }, 500);
};

//When start button is clicked... 
startBtn.addEventListener("click", function () {
  score = 0;

  // hide previosuly shown elements
  startEl.hidden = true;
  startBtn.hidden = true;

  // show previously hidden elements
  questionEl.hidden = false;
  scorecard.hidden = false;
  btn1.hidden = false;
  btn2.hidden = false;
  btn3.hidden = false;
  btn4.hidden = false;
  labelEl.hidden = true;
  inputEl.hidden = true;
  submitBtn.hidden = true;
  scoreDiv.hidden = true;

  //  start our timer and call askQuestion function
  startTimer();
  askQuestion(index);
})

//After submitting high score 
function restart() {
  score = 0;

  startEl.hidden = false;
  startBtn.hidden = false;

  startEl.textContent = "Try to answer the following questions within 75 seconds. Please note that incorrect answers will penalize your time by 10 seconds!"
  startBtn.textContent = "Start"

  questionEl.hidden = true;
  scorecard.hidden = true;
  btn1.hidden = true;
  btn2.hidden = true;
  btn3.hidden = true;
  btn4.hidden = true;
  labelEl.hidden = true;
  inputEl.hidden = true;
  submitBtn.hidden = true;
  scoreDiv.hidden = true;
}

//Check which answer button is clicked. Check if button value == question object index then update score and call next question.
divEl.addEventListener("click", function (event) {
  if (event.target.matches(".option")) {  // targeting by a fake class, not proud!
    var buttonClicked = event.target.value;

    if (index === 0 && buttonClicked === "1") { // 2nd option is the correct answer for question 1
      score++;
    } else if (index === 1 && buttonClicked === "3") { // 4th option is the correct answer for question 2
      score++;
    } else if (index === 2 && buttonClicked === "1") { // 2nd option is the correct answer for question 3
      score++;
    } else if (index === 3 && buttonClicked === "0") { // 1st option is the correct answer for question 4
      score++;
    } else if (index === 4 && buttonClicked === "0") { // 1st option is the correct answer for question 5
      score++;
    } else {
      secondsLeft -= 10;
      wrong();
    }
    if (index < 4) {
      index++;
      askQuestion(index);
    } else {
      endGanme();
      clearInterval(interval);
    }
  }
})

// when time is up or all questions answered end game and update elements
function endGanme() {

  // hide elements
  questionEl.hidden = true;
  btn1.hidden = true;
  btn2.hidden = true;
  btn3.hidden = true;
  btn4.hidden = true;

  // show elements again
  startEl.hidden = false;
  startBtn.hidden = false;
  labelEl.hidden = false;
  inputEl.hidden = false;
  submitBtn.hidden = false;
  scoreDiv.hidden = false;

  // tell user what´s going on
  startEl.textContent = "Your score: " + score + " out of 5";
  startBtn.textContent = "Or Try Again"

  // restore values   
  secondsLeft = 75; // set to 75 for final commit
  index = 0;
  highscore = localStorage.getItem("result");
  initials = localStorage.getItem("player");
  if (initials && highscore !== null) {
    scoreDiv.textContent = "( previous player " + initials + " scored " + highscore + " )";
  }
}

//Store score and initials in local storage PASS IT IN FUNCTION!
submitBtn.addEventListener("click", function () {

  if (inputEl.value === "") {
    alert("You must type in your name");
    return;
  }
  else
  localStorage.setItem("result", score);
  localStorage.setItem("player", inputEl.value);

  newPlayerObj = {
    player: inputEl.value,
    result: score,
  }

  allPlayers.push(newPlayerObj);
  localStorage.setItem("allPlayers", JSON.stringify(allPlayers));
  console.log(allPlayers);

  inputEl.value = "";
  restart();

});

countdownEl.style.color = "red";
countdownEl.style.fontSize = "100px";
scoreDiv.style.color = "red";