console.log("loaded");

let squares = Array.from(document.getElementsByClassName("square"));
let table = document.getElementById("history");

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
 * Checks if `state` contains a value for square `id`
 * @param {string} id
 */
function hasKey(id) {
  return state.map(sq => sq.id).indexOf(id) !== -1;
}

function updateText(id, txt) {
  let button = document.getElementById(id);
  button.childNodes.forEach(node => (node.innerText = txt));
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
  desc = "Placed " + st.val + " at " + sqName[st.id];
  event = { ind: history.length, desc: desc, st: state };

  tBody = table.getElementsByTagName("tbody")[0];

  let row = tBody.insertRow(-1);
  let index = row.insertCell(0);
  let action = row.insertCell(1);
  let jump = row.insertCell(2);
  index.innerHTML = event.ind;
  action.innerHTML = event.desc;

  history.push(event);
}

function buildHistory() {}

function undo() {}

function reset() {
  squares.forEach(sq => updateText(sq.id, ""));
  isX = true;
  state = [];
  history = [];
  bodyRef = table.getElementsByTagName("tbody")[0];
  console.log(bodyRef);
  bodyRef.innerHTML = "";
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
  let elem = document.createElement("div");
  elem.className = "row";
  elem.innerText = title;

  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(elem);
}

testHead("base cases");

assert(true, "test pass");
assert(false, "test fail");

testHead("state cases");

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
