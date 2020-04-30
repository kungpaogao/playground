console.log("----- MINES LOADED -----");

/**
 * Square display states
 */
const EXPLODED = -1;
const HIDDEN = 0;
const REVEALED = 1;
const FLAGGED = 2;
const QUESTION = 3;

/**
 * Square value for bombs
 */
const BOMB = -1;

/**
 * Game states for flags, bombs, covered
 */
let numFlags = 0;
let numBombs = 0;
let numCovered = 0;

/**
 * Board information
 */
let numRows = 0;
let numCols = 0;

/**
 * List of rows which are lists of squares that contain the state of each game
 * square: {
 *   id: string;
 *   display: EXPLODED | HIDDEN | REVEALED | FLAGGED | QUESTION;
 *   value: BOMB | number;
 * }
 * `id` consists of `${row}x${col}`
 */
let gameState = [[{ id: "0x0", display: HIDDEN, value: BOMB }]];

/**
 * Initializes game state: bombs, square values
 * @param {number} r - number of rows
 * @param {number} c - number of columns
 * @param {number} n - number of bombs
 */
function generateGame(r, c, n) {}

/**
 * Returns object with computed row and column properties from `id`
 * @param {string} id - square id
 */
function getRCfromId(id) {
  const split = id.split("x");
  const row = Number.parseInt(split[0]);
  const col = Number.parseInt(split[1]);
  return { row, col };
}

/**
 * Calculates the number of mines surrounding a square
 * @param {string} id - square id
 */
function calculateNum(id) {
  const rc = getRCfromId(id);
  const r = rc.row;
  const c = rc.col;

  const surround = [
    { row: r - 1, col: c - 1 },
    { row: r - 1, col: c },
    { row: r - 1, col: c + 1 },
    { row: r, col: c + 1 },
    { row: r + 1, col: c + 1 },
    { row: r + 1, col: c },
    { row: r + 1, col: c - 1 },
    { row: r, col: c - 1 },
  ];

  let count = 0;

  surround.forEach(({ row, col }) => {
    // check to make sure coords are in bounds
    if (!(row < 0 || row >= numRows || col < 0 || col >= numCols)) {
      count += gameState[row][col].value === BOMB ? 1 : 0;
    }
  });

  return count;
}

/**
 * Displays the game by creating tiles for each square in `gameState`
 */
function displayGame() {
  const gameCanvas = document.getElementById("gameCanvas");

  gameState.forEach((row, index) => {
    let gameRow = document.createElement("div");
    gameRow.id = `row${index}`;
    gameRow.className = "game-row";

    row.forEach(({ id, display, value }) => {
      let square = document.createElement("div");
      square.id = id;
      square.innerText = value;
      // TODO: add conditions for displaying the square
      gameRow.appendChild(square);
    });

    gameCanvas.appendChild(gameRow);
  });
}

/**
 * Checks if player has won the game
 */
function checkWin() {
  return numBombs === numFlags || numBombs === numCovered;
}

/**
 * Updates the display state of a square
 * @param {string} id - square id
 * @param {EXPLODED | HIDDEN | REVEALED | FLAGGED | QUESTION} val - display
 */
function updateDisplay(id, val) {}

/**
 * Called on left click
 * Reveals square and adjacent empty slots (recursively)
 * @param {string} id - square id
 */
function revealSquare(id) {}

/**
 * Called on right click
 * Rotates through the right-click actions of a square: flag, question, empty
 * @param {string} id - square id
 */
function flagSquare(id) {}

/**
 * Called on double left click
 * @param {string} id - square id
 */
function fastReveal(id) {}
