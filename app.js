let board;
let score = 0;
const rows = 4;
const columns = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  // Initial state of the game / board
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // Creates a div tag
      let tile = document.createElement("div");
      //   Sending the coordinates that correspond to the our board
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      // Updates the tile (for styling)
      updateTile(tile, num);
      document.getElementById("board").appendChild(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    document.querySelector(".game-over").innerText = "Game Over!";
    return;
  }

  let found = false;
  while (!found) {
    // Random row and column value
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    // If the board is empty
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  // Clearing the tile
  tile.innerText = "";
  tile.classList.value = ""; // Clears the class list
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    // Adding our styles dynamically
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", function (e) {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

function filterZeros(row) {
  return row.filter((num) => num != 0); // Create a new array without zeroes
}

function slide(row) {
  row = filterZeros(row); // Getting rid of zeroes ==> [2,2,2]

  // Slide
  // Need to minus 1 for the length so we don't go out of bounds
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      // Doubling our [i]
      row[i] *= 2;
      row[i + 1] = 0;
      // Setting our score to the value of row that's being doubled
      score += row[i];
    }
  }

  row = filterZeros(row);

  // Add zeroes back
  // While loop to add the zeroes over
  while (row.length < columns) {
    row.push(0);
  }

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    // Storing our iteration in row
    let row = board[r];
    // Get the new row
    row = slide(row);
    // Update that row back into the board
    board[r] = row;

    // This is for updating our html
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    // Storing our iteration in row
    let row = board[r];
    // Reversing it from slideLeft
    row.reverse();
    // Get the new row
    row = slide(row);
    // Reversing it from slideLeft
    row.reverse();
    // Update that row back into the board
    board[r] = row;

    // This is for updating our html
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Our Up function
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
