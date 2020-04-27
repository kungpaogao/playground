console.log("----- mines testing -----");

function createTest(test, name) {
  let elem = document.createElement("div");
  elem.className = "row";
  elem.innerText = name;

  if (test) {
    elem.style.background = "lightgreen";
  } else {
    elem.style.background = "salmon";
  }

  document.body.appendChild(elem);
}

function createTestHeader(title) {
  let elem = document.createElement("div");
  elem.className = "row test-header";
  elem.innerText = title;

  document.body.appendChild(elem);
}

createTestHeader("base cases");
createTest(true, "true test");
createTest(false, "false test");

createTestHeader("getRCfromId");
const rc = getRCfromId("15x2");
createTest(rc.row === 15, "correct row");
createTest(rc.col === 2, "correct col");
