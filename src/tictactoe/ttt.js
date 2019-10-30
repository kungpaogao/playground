console.log("loaded");

let squares = Array.from(document.getElementsByClassName("square"));
let state = [];
let isX = true;

/**
 * Checks if `state` contains a value for square `id`
 * @param {string} id
 */
function hasKey(id) {
  return state.map(sq => sq.k).indexOf(id) !== -1;
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
    state.push({ k: id, v: l });
    isX = !isX;
  }

  console.log("state", state);
}

function reset() {
  squares.forEach(sq => updateText(sq.id, ""));
  isX = true;
  state = [];
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

reset();
