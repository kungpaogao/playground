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
 * List of rows which are lists of squares that contain the state of each game
 * square: {
 *   id: string;
 *   display: EXPLODED | HIDDEN | REVEALED | FLAGGED | QUESTION;
 *   value: BOMB | number;
 * }
 */
let gameState = [];

/**
 * Initializes game state: bombs, square values
 * @param {number} r - number of rows
 * @param {number} c - number of columns
 * @param {number} n - number of bombs
 */
function generateGame(r, c, n) {}

/**
 * Calculates the number of mines surrounding a square
 * @param {number} r - number of rows
 * @param {number} c - number of columns
 * @param {string} id - square id
 */
function calculateNum(r, c, id) {}

/**
 * Displays the game by creating tiles for each square in `gameState`
 */
function displayGame() {}

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
 * Reveals square and empty slots
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
