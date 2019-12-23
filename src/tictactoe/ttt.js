console.log("----- TTT loaded -----");

let squares = Array.from(document.getElementsByClassName("square"));
let tbody = document.getElementById("history").getElementsByTagName("tbody")[0];

/**
 *  Holds objects of form: `{id: string, val: string}`
 */
// TODO: make state a dictionary: id -> val
let state = [];
/**
 * Holds objects of form: `{ind: number, desc: string, st: list }`
 */
let history = [];
let isX = true;

/* ----- HELPER METHODS ----- */
/**
 * Dictionary mapping square `id` to square name and number
 */
const sqMap = {
  sq0: ["Square 1", 1],
  sq1: ["Square 2", 2],
  sq2: ["Square 3", 3],
  sq3: ["Square 4", 4],
  sq4: ["Square 5", 5],
  sq5: ["Square 6", 6],
  sq6: ["Square 7", 7],
  sq7: ["Square 8", 8],
  sq8: ["Square 9", 9]
};

/**
 * Returns index of square `id` in `state` or -1 if `id` is not in `state`
 * @param {string} id
 */
function getIndex(id) {
  return state.map(sq => sq.id).indexOf(id);
}

/**
 * Checks if `state` contains a value for square `id`
 * @param {string} id
 */
function hasKey(id) {
  return getIndex(id) !== -1;
}

function updateText(id, txt) {
  let button = document.getElementById(id);
  button.childNodes.forEach(node => (node.innerText = txt));
}

/**
 * Returns the state of square `id`; can be `X`, `O`, or `null`
 * @param {string} id
 */
function getValue(id) {
  const index = getIndex(id);

  if (index !== -1) {
    return state[index].val;
  } else {
    return null;
  }
}

/* ---- GAME FUNCTIONS ----- */

/**
 * Checks to see if anyone has won on the board given the most recently updated
 * square `id` with value `val`
 * @param {string} id - must be last updated id
 * @param {string} val
 */
function checkWin(id, val) {
  console.log("squareMap", sqMap[id]);
  const num = sqMap[id][1] - 1;
  const row = Math.trunc(num / 3);
  const col = num % 3;

  // check cols
  if (col === 0) {
    // non-null and equal in column
    if (
      getValue("sq0") === val &&
      getValue("sq0") === getValue("sq3") &&
      getValue("sq3") === getValue("sq6")
    ) {
      return true;
    }
  } else if (col === 1) {
    if (
      getValue("sq1") === val &&
      getValue("sq1") === getValue("sq4") &&
      getValue("sq4") === getValue("sq7")
    ) {
      return true;
    }
  } else {
    if (
      getValue("sq2") === val &&
      getValue("sq2") === getValue("sq5") &&
      getValue("sq5") === getValue("sq8")
    ) {
      return true;
    }
  }

  // check rows
  if (row === 0) {
    // non-null and equal in row
    if (
      getValue("sq0") === val &&
      getValue("sq0") === getValue("sq1") &&
      getValue("sq1") === getValue("sq2")
    ) {
      return true;
    }
  } else if (row === 1) {
    if (
      getValue("sq3") === val &&
      getValue("sq3") === getValue("sq4") &&
      getValue("sq4") === getValue("sq5")
    ) {
      return true;
    }
  } else {
    if (
      getValue("sq6") === val &&
      getValue("sq6") === getValue("sq7") &&
      getValue("sq7") === getValue("sq8")
    ) {
      return true;
    }
  }

  // check diagonals
  if (num === 0 || num === 4 || num === 8) {
    if (
      getValue("sq0") === val &&
      getValue("sq0") === getValue("sq4") &&
      getValue("sq4") === getValue("sq8")
    ) {
      return true;
    }
  }
  if (num === 2 || num === 4 || num === 6) {
    if (
      getValue("sq2") === val &&
      getValue("sq2") === getValue("sq4") &&
      getValue("sq4") === getValue("sq6")
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Updates `state` when a square is triggered
 * @param {string} id - valid square id in state
 */
function update(id) {
  let l = isX ? "X" : "O";
  if (!hasKey(id)) {
    updateText(id, l);
    st = { id: id, val: l };
    state.push(st);
    isX = !isX;
    addHistory(st);
  }
}

/**
 * Adds current state to `history` and adds to HTML table
 * @param {state} st
 */
function addHistory(st) {
  const desc = "Placed " + st.val + " at " + sqMap[st.id][0];
  const copy = [...state];
  const event = { ind: history.length, desc: desc, st: copy };
  // console.log("built event", event);

  const row = tbody.insertRow(-1);
  const index = row.insertCell(0);
  const action = row.insertCell(1);
  const jump = row.insertCell(2);
  index.innerHTML = event.ind;
  action.innerHTML = event.desc;
  const button = document.createElement("button");
  button.innerHTML = "Jump back to this action";
  button.addEventListener("click", () => {
    alert(event.ind);
  });

  jump.appendChild(button);

  history.push(event);
}

/**
 * Rebuilds board with to reflect current state
 */
function buildBoard() {
  squares.forEach(sq =>
    updateText(sq.id, hasKey(sq.id) ? getValue(sq.id) : "")
  );
}

/**
 * Builds history given the event index
 * @param {number} index
 */
function buildHistory(index) {
  const event = history[index];

  // set state
  state = event.st;

  // set board
  buildBoard();

  // set history table
  for (let i = history.length; i > index + 1; i--) {
    tbody.deleteRow(-1);
  }

  // set history
  history = history.slice(0, index + 1);
}

/**
 * Removes last event from `history` and goes to the previous state
 */
function undo() {
  // remove last event in history
  history.pop();

  // set state to the last state in history
  if (history.length > 0) {
    state = history[history.length - 1].st;
    isX = state[state.length - 1].val == "O";
  } else {
    reset();
  }

  buildBoard();

  tbody.deleteRow(-1);
}

/**
 * Resets the state of the game to initial
 */
function reset() {
  isX = true;
  state = [];
  history = [];

  buildBoard();

  tbody.innerHTML = "";
}
