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
  battleDiv.style.margin = "0 auto";
  console.log(this);
  userImg.src = generateSrc(this.getAttribute("data-itemname"));
  userImg.alt = this.getAttribute("data-itemname");
  decisionWheel(15);
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

function decisionWheel(numTimes, count = 1, lastChoice = "Rock") {
  setTimeout(function () {
    const choice = choose(lastChoice);
    computerImg.src = generateSrc(choice);
    computerImg.alt = choice;
    if (count < numTimes) {
      decisionWheel(numTimes, ++count, choice);
    } else {
      // computer done choosing
    }
  }, 200 * 0.1 * count);
}
