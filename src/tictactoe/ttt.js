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
 * @param {string} id
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
  let copy = [...state];
  const event = { ind: history.length, desc: desc, st: copy };
  // console.log("built event", event);

  let row = tbody.insertRow(-1);
  let index = row.insertCell(0);
  let action = row.insertCell(1);
  let jump = row.insertCell(2);
  index.innerHTML = event.ind;
  action.innerHTML = event.desc;
  jump.innerHTML = event.st;

  history.push(event);
}

/**
 * Builds history given the event index
 * @param {number} index
 */
function buildHistory(index) {
  const event = history[index];
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

  squares.forEach(sq =>
    updateText(sq.id, hasKey(sq.id) ? getValue(sq.id) : "")
  );

  tbody.deleteRow(-1);
}

/**
 * Resets the state of the game to initial
 */
function reset() {
  squares.forEach(sq => updateText(sq.id, ""));
  isX = true;
  state = [];
  history = [];

  tbody.innerHTML = "";
}

/**
 * Creates a test case display named `name`; green if `pass`, red otherwise
 * @param {boolean} pass
 * @param {string} name
 */
function assert(pass, name) {
  let elem = document.createElement("div");
  elem.className = "row";
  elem.innerText = name;

  if (pass) {
    elem.style.background = "lightgreen";
  } else {
    elem.style.background = "salmon";
  }

  document.body.appendChild(elem);
}

/**
 * Creates header titled `title` for a set of test cases
 * @param {string} title
 */
function testHead(title) {
  console.log(">>> tests:", title);

  let elem = document.createElement("div");
  elem.className = "row testhead";
  elem.innerText = title;

  document.body.appendChild(elem);
}

/* ------ TEST CASES ------ */

testHead("base cases");

assert(true, "test pass");
assert(false, "test fail");

testHead("helper cases");

update("sq1"); // X
assert(getIndex("sq1") === 0, "getIndex returns correct index");
assert(hasKey("sq1"), "hasKey returns true for key that exists");
assert(getIndex("sq2") === -1, "getIndex returns -1 for invalid index");
assert(!hasKey("sq2"), "hasKey returns false for key that doesn't exists");
update("sq2"); // O
assert(getIndex("sq2") === 1, "getIndex returns correct value after update");
assert(getValue("sq1") === "X", "getValue returns correct value at square X");
assert(getValue("sq2") === "O", "getValue returns correct value at square O");
assert(getValue("sq5") === null, "getValue returns null");
assert(sqMap["sq0"][0] === "Square 1", "square map 0 returns name");
assert(sqMap["sq0"][1] === 1, "square map 1 returns number");

testHead("state cases");

reset();
update("sq1");
update("sq2");
update("sq3");
assert(state.length === 3, "update adds to state");

reset();
update("sq1");
update("sq1");
update("sq1");
update("sq1");
assert(state.length === 1, "no duplicates in state");

testHead("history cases");

reset();
assert(history.length === 0, "history is init");
update("sq0"); // X
update("sq1"); // O
assert(history.length === 2, "history is updated 2");
update("sq2"); // X
assert(history.length === 3, "history is updated 3");
assert(history[1].st.length === 2, "history stores correct state 2");
assert(history[2].st.length === 3, "history stores correct state 3");

testHead("undo cases");

reset();
update("sq1"); // X
update("sq2"); // O
update("sq0"); // X
undo();
assert(state.length === 2, "undo reverts state");
assert(state[state.length - 1].val === "O", "undo gets correct move");

reset();
update("sq1"); // X
update("sq2"); // O
update("sq0"); // X
undo();
update("sq4"); // X
assert(state.length === 3, "undo reverts state w/ move after");
assert(state[state.length - 1].val === "X", "still gets correct move");

reset();
update("sq1"); // X
undo();
assert(history.length === 0, "can undo first move");
assert(state.length === 0, "state is clean");

testHead("win cases");

reset();
update("sq0"); // X
assert(!checkWin("sq0", "X"), "win check fails with one move");
update("sq8"); // O
update("sq1"); // X
update("sq5"); // O
assert(!checkWin("sq5", "O"), "win check returns false");
update("sq2"); // X
assert(checkWin("sq2", "X"), "win check returns true");
update("sq4"); // O

reset();
