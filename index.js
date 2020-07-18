const selectionDiv = document.querySelector(".selection");
const battleDiv = document.querySelector(".battle");
const userImg = battleDiv.querySelector("img");
const computerImg = battleDiv.querySelector(".box:last-child img");

document.querySelectorAll(".selection .box").forEach((box) => {
  box.onclick = handleClick;
});

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
  const computerChoice = (await decisionWheel(15)).charAt(0);
  if (userChoice === computerChoice) {
    battleDiv.querySelector(".box").style.backgroundColor = "#00ff00";
    battleDiv.querySelector(".box:last-child").style.backgroundColor = "#00ff00";
  } else if (
    (userChoice === "R" && computerChoice === "S") ||
    (userChoice === "P" && computerChoice === "R") ||
    (userChoice === "S" && computerChoice === "P")
  ) {
    battleDiv.querySelector(".box").style.backgroundColor = "#00ff00";
  } else {
    battleDiv.querySelector(".box:last-child").style.backgroundColor = "#00ff00";
  }
}

function decisionWheel(numTimes, count = 1, lastChoice = "Rock") {
  return new Promise((resolve) => {
    setTimeout(function () {
      const choice = choose(lastChoice);
      computerImg.src = generateSrc(choice);
      computerImg.alt = choice;
      if (count < numTimes)
        return resolve(decisionWheel(numTimes, ++count, choice));
      resolve(choice);
    }, 200 * 0.1 * count);
  });
}
