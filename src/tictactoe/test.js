console.log("----- Tests loaded -----");

/* ------ TEST FUNCTIONS ----- */

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
assert(checkWin("sq2", "X"), "win check returns true for row");

reset();
update("sq0"); // X
update("sq2"); // O
update("sq4"); // X
update("sq5"); // O
update("sq8"); // X
assert(checkWin("sq8", "X"), "win check returns true for diag 159");

reset();
update("sq2"); // X
update("sq0"); // O
update("sq4"); // X
update("sq5"); // O
update("sq6"); // X
assert(checkWin("sq6", "X"), "win check returns true for diag 357");

testHead("build history");

reset();
update("sq0"); // X
update("sq2"); // O
update("sq4"); // X
update("sq5"); // O
update("sq8"); // X
assert(state.length === 5, "state is correct size before build");
assert(history.length === 5, "history is correct size before build");
buildHistory(2);
assert(state.length === 3, "state is correct size after build");
assert(history.length === 3, "history is correct size after build");
assert(!isX, "next move is right");

testHead("state tests");

reset();
update("sq4"); // X
update("sq2"); // O
const compare = [...history];
update("sq3"); // X
update("sq5"); // O

reset();
update("sq4"); // X
buildHistory(0);
const snapshot = [...history];
assert(snapshot[0].st.length === 1, "snapshot length should be 1");
assert(!isX, "next move should be an O");
update("sq2"); // O
assert(
  compare.length === history.length,
  "compare and history length should be same"
);
assert(
  compare[1].st.length === history[1].st.length,
  "compare and history state length should be same"
);
update("sq3"); // X
update("sq5"); // O
buildHistory(0);
assert(snapshot[0].st.length, "snapshot state length should still be 1");
assert(!isX, "next move should be an O, again");
assert(state.length === 1, "state length should be 1");
