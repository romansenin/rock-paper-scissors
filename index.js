const selectionDiv = document.querySelector(".selection");
const battleDiv = document.querySelector(".battle");
const userBox = battleDiv.querySelector(".box");
const userImg = userBox.querySelector("img");
const computerBox = battleDiv.querySelector(".box:last-child");
const computerImg = computerBox.querySelector("img");
const restartBtn = document.getElementById("btn-restart");

let numWins = 0;
let numLosses = 0;
let numTies = 0;

document.querySelectorAll(".selection .box").forEach((box) => {
  box.onclick = handleClick;
});

restartBtn.onclick = function() {
  this.style.display = "none";
  battleDiv.style.display = "none";
  selectionDiv.style.display = "flex";
  userBox.style.backgroundColor = "#fff";
  computerBox.style.backgroundColor = "#fff";
}

function handleClick() {
  selectionDiv.style.display = "none";
  battleDiv.style.display = "flex";
  battleDiv.style.opacity = 1;

  const userChoice = this.getAttribute("data-itemname");
  userImg.src = generateSrc(userChoice);
  userImg.alt = userChoice;
  playGame(userChoice.charAt(0));
}

function generateSrc(name) {
  return `./assets/images/${name.toLowerCase()}.png`;
}

function choose(lastChoice) {
  const choices = ["Rock", "Paper", "Scissors"];
  return choices.filter((choice) => choice !== lastChoice)[
    Math.floor(Math.random() * 2)
  ];
}

async function playGame(userChoice) {
  // spin off the decision wheel 20 times, get first character of resulting string
  const computerChoice = (await decisionWheel(20)).charAt(0);

  if (userChoice === computerChoice) {
    // tie
    numTies++;
    // set both user's and computer's boxes to green background color
    battleDiv.querySelector(".box").style.backgroundColor = "#00ff00";
    battleDiv.querySelector(".box:last-child").style.backgroundColor =
      "#00ff00";
  } else if (
    // user wins
    (userChoice === "R" && computerChoice === "S") ||
    (userChoice === "P" && computerChoice === "R") ||
    (userChoice === "S" && computerChoice === "P")
  ) {
    numWins++;
    // set user's box to green background color
    battleDiv.querySelector(".box").style.backgroundColor = "#00ff00";
  } else {
    // computer wins
    numLosses++;
    // set computer's box to green background color
    battleDiv.querySelector(".box:last-child").style.backgroundColor =
      "#00ff00";
  }
  restartBtn.style.display = "block";
}

function decisionWheel(numTimes, count = 1, lastChoice = "Rock") {
  return new Promise((resolve) => {
    // set off a function call after 180 * 0.1 * count milliseconds, the higher the count, the slower it gets
    setTimeout(function () {
      // choose either R, P, or S, excluding the last choice so that a change is visible in the computer's box
      const choice = choose(lastChoice);

      // set the computer box's image and alt tag
      computerImg.src = generateSrc(choice);
      computerImg.alt = choice;
      // if not done yet, recursively resolve itself
      if (count < numTimes)
        return resolve(decisionWheel(numTimes, ++count, choice));
      // else resolve the final choice
      resolve(choice);
    }, 180 * 0.1 * count);
  });
}
