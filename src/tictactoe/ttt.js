console.log("loaded");

let squares = document.getElementsByClassName("square");
let state = [];

function update(id) {
  // let button = document.getElementById(id);
  state.push(id);
}

function assert(pass, testName) {
  let elem = document.createElement("div");
  elem.className = "row";
  elem.innerText = testName;

  if (pass) {
    elem.style.background = "lightgreen";
  } else {
    elem.style.background = "salmon";
  }

  document.body.appendChild(elem);
}

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
update("1");
update("2");
update("3");
assert(state.length === 3, "testing update adds to state");
