const box = document.getElementById("board");
const playButton = document.getElementById("startButton");
const selectFirst = document.getElementById("selectFirst");
const selectComputerMode = document.getElementById("selectComputerMode");
const selectMultiPlayerMode = document.getElementById("selectMultiPlayerMode");
const computerMode = document.getElementsByClassName("computerMode")[0];
const allButtons = document.querySelectorAll(".btn");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");
selectComputerMode.addEventListener("change", handleRadioChange);
selectMultiPlayerMode.addEventListener("change", handleRadioChange);

let gameOver = false;

function resetGame() {
  gameOver = false;
  board = ["", "", "", "", "", "", "", "", ""];

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].innerText = "";
  }
}

function handleRadioChange() {
  resetGame();
  if (selectMultiPlayerMode.checked) {
    console.log("enter to make disable");
    computerMode.classList.add("makeDisable");
  } else {
    computerMode.classList.remove("makeDisable");
  }
}

playButton.addEventListener("click", handleStartGame);

function handleStartGame() {
  if (!selectFirst.checked) {
    computerTurn();
  }
}

for (let i = 1; i <= 9; i++) {
  const block = document.createElement("div");
  block.id = i.toString();
  block.className =
    "bg-slate-800 text-white text-4xl flex justify-center items-center h-20  cursor-pointer btn";
  box.appendChild(block);
}


const player = [true, "X", "O"];
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];



function startAgain() {
  for (let i = 0; i < board.length; i++) {
    board[i] = "";
  }
}

function showToast(player) {
  if (player == "X") {
    if (selectMultiPlayerMode.checked) {
      toastMessage.innerText = "Player 'X' Win";
    } else {
      if (selectFirst.checked) {
        toastMessage.innerText = "You Win";
      } else {
        toastMessage.innerText = "Computer Win";
      }
    }
  } else if (player == "O") {
    if (selectMultiPlayerMode.checked) {
      toastMessage.innerText = "Player 'O' Win";
    } else {
      if (!selectFirst.checked) {
        toastMessage.innerText = "You Win";
      } else {
        toastMessage.innerText = "Computer Win";
      }
    }
  } else {
    toastMessage.innerText = "Match Draw";
  }

  toast.style.display = "block";
  setTimeout(() => {
    toast.style.top = "150px";
    setTimeout(() => {
      hideToast();
    }, 2000);
  }, 100);
}

function hideToast() {
  toast.style.top = "-50px";
  setTimeout(() => {
    toast.style.display = "none";
  }, 500);
  location.reload();
}

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showToast(board[a]);
      gameOver = true;
      return;
    }
  }

  if (!board.includes("") && !gameOver) {
    gameOver = true;
    showToast("It's a draw!");
  }
}

function computerTurn() {
  if (selectMultiPlayerMode.checked) {
    return;
  }
  if (gameOver) {
    return;
  }

  for (const combo of winningCombinations) {
    const computerVal = selectFirst.checked ? player[2] : player[1];
    console.log(computerVal);
    const [a, b, c] = combo;

    if (board[a] == computerVal && board[a] == board[b] && board[c] == "") {
      board[c] = computerVal;
      document.getElementById(c + 1).innerText = computerVal;
      checkWinner();
      return;
    } else if (
      board[b] == computerVal &&
      board[b] == board[c] &&
      board[a] == ""
    ) {
      board[a] = computerVal;
      document.getElementById(a + 1).innerText = computerVal;

      checkWinner();

      return;
    } else if (
      board[c] == computerVal &&
      board[c] == board[a] &&
      board[b] == ""
    ) {
      board[b] = computerVal;
      document.getElementById(b + 1).innerText = computerVal;
      checkWinner();
      return;
    }
  }

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;

    if (board[a] && board[a] == board[b] && board[c] == "") {
      board[c] = player[0] ? player[1] : player[2];
      document.getElementById(c + 1).innerText = player[0]
        ? player[1]
        : player[2];
      checkWinner();
      player[0] = !player[0];
      return;
    } else if (board[b] && board[b] == board[c] && board[a] == "") {
      board[a] = player[0] ? player[1] : player[2];
      document.getElementById(a + 1).innerText = player[0]
        ? player[1]
        : player[2];
      checkWinner();
      player[0] = !player[0];
      return;
    } else if (board[c] && board[c] == board[a] && board[b] == "") {
      board[b] = player[0] ? player[1] : player[2];
      document.getElementById(b + 1).innerText = player[0]
        ? player[1]
        : player[2];
      checkWinner();
      player[0] = !player[0];
      return;
    }
  }

  while (true) {
    const randomIndex = Math.floor(Math.random() * 9);
    if (board[randomIndex] == "") {
      board[randomIndex] = player[0] ? player[1] : player[2];
      document.getElementById(randomIndex + 1).innerText = player[0]
        ? player[1]
        : player[2];
      checkWinner();
      player[0] = !player[0];
      return;
    } else {
      for (let i = 0; i < 9; i++) {
        if (board[i] == "") {
          board[i] = player[0] ? player[1] : player[2];
          document.getElementById(i + 1).innerText = player[0]
            ? player[1]
            : player[2];
          checkWinner();
          player[0] = !player[0];
          return;
        }
      }
    }
  }
}

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function () {
    if (gameOver || document.getElementById(this.id).innerText.length > 0) {
      return;
    }

    document.getElementById(this.id).innerText = player[0]
      ? player[1]
      : player[2];
    board[parseInt(this.id) - 1] = player[0] ? player[1] : player[2];
    checkWinner();
    player[0] = !player[0];
    setTimeout(computerTurn, 500);
  });
}
