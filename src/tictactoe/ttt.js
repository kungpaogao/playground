console.log("loaded");

let squares = Array.from(document.getElementsByClassName("square"));
let tbody = document.getElementById("history").getElementsByTagName("tbody")[0];

/**
 *  Holds objects of form: `{id: string, val: string}`
 */
let state = [];
/**
 * Holds objects of form: `{ind: number, desc: string, st: list }`
 */
let history = [];
let isX = true;

const sqName = {
  sq0: "Square 1",
  sq1: "Square 2",
  sq2: "Square 3",
  sq3: "Square 4",
  sq4: "Square 5",
  sq5: "Square 6",
  sq6: "Square 7",
  sq7: "Square 8",
  sq8: "Square 9"
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
 * Returns the state of square `id`; can be `X`, `O`, or `undefined`
 * @param {string} id
 */
function getState(id) {
  const index = getIndex(id);

  if (index !== -1) {
    return state[index].val;
  } else {
    return undefined;
  }
}

/**
 * Updates `state` when a square is triggered
 * @param {string} id
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

function addHistory(st) {
  const desc = "Placed " + st.val + " at " + sqName[st.id];
  let copy = [...state];
  // const copy = state;
  // let copy = [];
  // for (const s in state) {
  //   copy.push(s);
  // }
  const event = { ind: history.length, desc: desc, st: copy };
  console.log("built event", event);

  let row = tbody.insertRow(-1);
  let index = row.insertCell(0);
  let action = row.insertCell(1);
  let jump = row.insertCell(2);
  index.innerHTML = event.ind;
  action.innerHTML = event.desc;
  jump.innerHTML = event.st;

  history.push(event);
}

function buildHistory() {}

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
    updateText(sq.id, hasKey(sq.id) ? getState(sq.id) : "")
  );

  tbody.deleteRow(-1);
}

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
assert(getState("sq1") === "X", "getState returns correct value at square X");
assert(getState("sq2") === "O", "getState returns correct value at square O");
assert(getState("sq5") === undefined, "getState returns undefined");

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

reset();
