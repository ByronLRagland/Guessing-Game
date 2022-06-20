let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let max = document.getElementById("max");
let num = document.getElementById("num");
let message = document.getElementById("message");
let submit = document.getElementById("submit");
let setMax = document.getElementById("setMax");
let again = document.getElementById("again");
let list = document.getElementById("list");
let result = document.getElementById("result");
let between = document.getElementById("between");
let remaining = document.getElementById("remaining");
const answers = [];
let maxNum;
let guess;
let left;
let guessNums;

// Generates random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// Switch from section1 to section2
function start() {
  section1.style.display = "none";
  section2.style.display = "flex";
}

// Checks if more than 1 guess remains
function plural(x) {
  return x <= 1 ? "Guess" : "Guesses";
}

// Adds valid data to array and lists it
function add() {
  num.value = Math.round(parseInt(num.value));
  answers.push(num.value);
  list.innerHTML += `<li>${num.value} (${message.innerHTML})</li>`;
  num.value = "";
  left--;
  rest.innerHTML = `${left} ${plural(left)} left`;
}

function success() {
  submit.style.display = "none";
  again.style.display = "block";
  num.style.display = "none";
  between.style.display = "none";
}

// When submit button is pressed the value is validated
function play() {
  if(num.value != "" && !containsLetter(num.value)){
  num.value = Math.round(parseInt(num.value));
  }
  if (num.value == "") {
    alert("Please enter a number");
  } 
  else if (parseInt(num.value) < 1 ||  parseInt(num.value) > maximum){
    alert(`You must enter value between 1 and ${maximum}`);
  }
  else if (containsLetter(num.value)){
    alert(`This is not a number!`);
  }
  else if(answers.includes(num.value) > 0){
    alert(`You must enter a new number`);
  }
  else if (num.value > guess && left > 1) {
    message.innerHTML = "Go Lower";
    add();
  } 
  else if (num.value < guess && left > 1) {
    message.innerHTML = "Go Higher";
    add();
  } 
  else if (num.value > guess && left == 1) {
    message.innerHTML = "Game Over";
    add();
    message.innerHTML = "";
    result.innerHTML = "Better luck next time!!";
    let iterator = answers.values();
    for (let elements of iterator){
      console.log(elements);
    }
    alert(`You lose the game, number is: ${guess}`);
    success();
  } 
  else if (num.value < guess && left == 1) {
    message.innerHTML = "Game Over";
    add();
    message.innerHTML = "";
    result.innerHTML = "Better luck next time!!";
    alert(`You lose, the number is: ${guess}. Your guesses were ${answers}`);
    success();
  } 
  else if (num.value == guess) {
    result.innerHTML = "Congratulations";
    message.innerHTML = "You Win";
    add();
    message.innerHTML = `You guessed the number ${guess} <br/>And you took exactly ${answers.length} ${plural(Number(guessNums - left))}`;
    alert(`You win, the number is: ${guess}. Your guesses were ${answers}`);
    success();
  }

}

// When start button is pressed
function start1() {
  maxNum = prompt("Set maximum number");
  if (Math.round(parseInt(maxNum)) > 1 && !containsLetter(maxNum)){
  start();
  max.innerHTML = Math.round(parseInt(maxNum)) ;
  guess = randomNumber(1, Math.round(parseInt(maxNum)));
  maximum = Math.round(parseInt(maxNum));
  left = remaining.innerHTML = 5;
  guessNums = 5;
  }
  else{
    alert(`You must enter a number greater than 1`);
  }
}

// To play again
function restart() {
  location.reload();
}

// Pressing enter accepts value
num.addEventListener("keyup", function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    submit.click();
  }

});

// Checks if letters are in string
function containsLetter(str) {
  return /[a-z]/i.test(str);
}