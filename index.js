let state = {
  squares: {},
  clickedSquares: [],
  lastSquareId: 0,
  lastSquareSize: 30,
  isSquaresAmountEven: true,
};

let addSquareButton = document.getElementById("addSquare");

addSquareButton.addEventListener("click", function () {
  let amount = Object.keys(state.squares).length;
  if (amount >=20) {
    const alertDiv = document.createElement("div");

    alertDiv.classList.add(
      "alert",
      "alert-danger",
      "alert-dismissible",
      "fade",
      "show",
      "notification"
    );
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
    <strong>Too much squares</strong> 20 squares is the maximimum amount of squares.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
  alertDiv.style.setProperty("display","flex")
    document.getElementById("alertSection").appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
    return;
  }
  for(let i = 0; i < 3; i++){
  let square = {
    size: state.lastSquareSize,
    id: state.lastSquareId,
    match: null,
    html: `<section id="${state.lastSquareId}" class="square"></section>`,
    isFlipped: false,
    solved: false,
  };
  let squaresSection = document.getElementById("squaresSection");
  
  squaresSection.innerHTML += square.html;
  
  currentSquare = document.getElementById(square.id);
  sizeString = square.size + "px";
  currentSquare.style.setProperty("height", sizeString);
  currentSquare.style.setProperty("width", sizeString);

  state.squares[square.id] = square;
  state.lastSquareId += 1;
  state.lastSquareSize += 20;
  state.isSquaresAmountEven = !state.isSquaresAmountEven;
  }
  adjustHeightNav();
});

let playButton = document.getElementById("play");

playButton.addEventListener("click", function () {
  resetGame();
  matchPairs();
  addSquareElementsClickEvent();
  const alertDiv = document.createElement("div");

    alertDiv.classList.add(
      "alert",
      "alert-info",
      "alert-dismissible",
      "fade",
      "show",
      "notification"
    );
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
    <strong>Lets play!</strong> Please click a square and match to his pair acoording to the number written on the square. <br> Good luck! 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
    document.getElementById("alertSection").appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 9000);
  });

function matchPairs() {
  let { squares } = state;
  console.log(squares);
  let squaresIds = Object.keys(squares);
  if (state.isSquaresAmountEven && squaresIds.length !== 0) {
    {
      while (squaresIds.length > 0) {
        const randomIndex1 = Math.floor(Math.random() * squaresIds.length);
        const randomSquareId1 = parseInt(squaresIds[randomIndex1]);
        squaresIds.splice(randomIndex1, 1);

        const randomIndex2 = Math.floor(Math.random() * squaresIds.length);
        const randomSquareId2 = parseInt(squaresIds[randomIndex2]);
        squaresIds.splice(randomIndex2, 1);

        state.squares[randomSquareId1].match = randomSquareId2;
        state.squares[randomSquareId2].match = randomSquareId1;
      }
    }
  } else {
    const alertDiv = document.createElement("div");

    alertDiv.classList.add(
      "alert",
      "alert-danger",
      "alert-dismissible",
      "fade",
      "show",
      "notification"
    );
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
    <strong>Odd number of squares</strong> Please add an even number of squares.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
    document.getElementById("alertSection").appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
}

function addSquareElementsClickEvent() {
  let squareElements = document.getElementsByClassName("square");
  for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener("click", function (event) {
      const { target } = event;
      const squareObj = state.squares[target.id];
      squareObj.isFlipped = true;
      state.clickedSquares.push(squareObj);
      CheckState();
    });
  }
}

function allSolved() {
  let allSolved = true;
  for (const squareObj of Object.values(state.squares)) {
    if (!squareObj.solved) {
      allSolved = false;
    }
  }
  if (Object.keys(state.squares).length === 0) {
    allSolved = false;
  }
  return allSolved;
}

function CheckState() {
  let { clickedSquares } = state;
  if (clickedSquares.length === 2) {
    let clickedSquareId1 = clickedSquares[0].id;
    let clickedSquareId2 = clickedSquares[1].id;
    state.squares[clickedSquareId1].isFlipped = false;
    state.squares[clickedSquareId2].isFlipped = false;

    if (clickedSquares[0].match === clickedSquares[1].id) {
      state.squares[clickedSquareId1].solved = true;
      state.squares[clickedSquareId2].solved = true;
    }

    state.clickedSquares = [];
  }

  for (let i = 0; i < Object.keys(state.squares).length; i++) {
    const square = state.squares[i];
    const squareElement = document.getElementById(square.id);
    if (square.isFlipped) {
      squareElement.style.setProperty("background-color", "blue");
      squareElement.innerHTML = square.match;
    } else if (square.solved) {
      squareElement.style.setProperty("background-color", "green");
      squareElement.innerHTML = square.match;
    } else {
      squareElement.style.setProperty("background-color", "black");
      squareElement.innerHTML = '';
    }
  }

  if (allSolved()) {
    const alertDiv = document.createElement("div");

    alertDiv.classList.add(
      "alert",
      "alert-success",
      "alert-dismissible",
      "fade",
      "show",
      "notification"
    );
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
    <strong>Congratulations!</strong> You won!
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;
    document.getElementById("alertSection").appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
  adjustHeightNav();
}
function resetGame() {
  
  for (let i = 0; i < Object.keys(state.squares).length; i++) {
    state.squares[i].isFlipped = false;
    state.squares[i].solved = false;
  }
  CheckState();
}

function resetSquares() {

  state = {
    squares: {},
    clickedSquares: [],
    lastSquareId: 0,
    lastSquareSize: 100,
    isSquaresAmountEven: true,
  };
  for (let i = 0; i < Object.keys(state.squares).length; i++) {
    state.squares[i].isFlipped = false;
    state.squares[i].solved = false;
  }
  let squaresSection = document.getElementById("squaresSection");
  console.log(squaresSection);
  squaresSection.remove();
  let newSection = document.createElement("section");
  newSection.setAttribute("id", "squaresSection");
  
  document.body.getElementsByClassName("game")[0].appendChild(newSection);
  adjustHeightNav();
}

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  resetSquares();
});

function adjustHeightNav() {
  let nav = document.getElementsByTagName("nav")[0];
  let game = document.getElementsByClassName("game")[0];
  let gameHeight = game.offsetHeight;
  if (gameHeight == null) {
    gameHeight = 1120;
  }
  nav.style.setProperty("height", `${gameHeight}px`);
  // game.style.setProperty("margin-top", navHeight + "px");
};