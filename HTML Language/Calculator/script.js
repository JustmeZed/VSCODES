let result = document.getElementById("result");
let expressionDisplay = document.getElementById("expression");
let memoryValue = 0;

const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zero = document.getElementById("zero");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const percent = document.getElementById("percent");
const equal = document.getElementById("equal");
const clear = document.getElementById("c");
const clearEntry = document.getElementById("ce");
const back = document.getElementById("back");
const decimal = document.getElementById("decimal");
const posnega = document.getElementById("posnega");
const oct = document.getElementById("oct");
const bin = document.getElementById("bin");
const hex = document.getElementById("hex");
const mc = document.getElementById("mc");
const mr = document.getElementById("mr");
const mplus = document.getElementById("mplus");
const mminus = document.getElementById("mminus");
const ms = document.getElementById("ms");
const mv = document.getElementById("mv");
const memoryCoverDiv = document.getElementById("memoryCoverDiv");

let currentNumber = "";
let currentExpression = "";

const memoryValueElement = document.querySelector(".memory-value");
let flag = false;

// Disable MC, MR, MV buttons initially
mc.disabled = true;
mr.disabled = true;
mv.disabled = true;

// Function to enable memory-related buttons
function enableMemoryButtons() {
  mc.disabled = false;
  mr.disabled = false;
  mv.disabled = false;
}

// Function to disable memory-related buttons
function disableMemoryButtons() {
  mc.disabled = true;
  mr.disabled = true;
  mv.disabled = true;
}

// M+ Button
mplus.onclick = () => {
  flag = true;
  let currentResult = parseFloat(result.innerHTML);
  if (!isNaN(currentResult)) {
    memoryValue += currentResult;
    memoryValueElement.textContent = memoryValue;
    console.log("Memory Added: " + memoryValue);
    enableMemoryButtons();
  }
};

// M- Button
mminus.onclick = () => {
  flag = true;
  let currentResult = parseFloat(result.innerHTML);
  if (!isNaN(currentResult)) {
    memoryValue -= currentResult;
    memoryValueElement.textContent = memoryValue;
    console.log("Memory Subtracted: " + memoryValue);
    enableMemoryButtons();
  }
};

// MS Button
ms.onclick = () => {
  flag = true;
  let currentResult = parseFloat(result.innerHTML);
  if (!isNaN(currentResult)) {
    memoryValue = currentResult;
    memoryValueElement.textContent = memoryValue;
    console.log("Memory Stored: " + memoryValue);
    enableMemoryButtons();
  }
};

// MR Button
mr.onclick = () => {
  result.innerHTML = memoryValue;
  expressionDisplay.innerHTML = "&nbsp;";
  console.log("Memory Recalled: " + memoryValue);
};

// MC Button
mc.onclick = () => {
  memoryValue = 0;
  memoryValueElement.textContent = memoryValue;
  console.log("Memory Cleared");
  disableMemoryButtons();
};

// MV Button
mv.onclick = () => {
  const row = memoryCoverDiv.querySelector(".row");
  const memoryValueElement = row.querySelector(".memory-value");

  if (!memoryValueElement) {
    const memoryValueElement = document.createElement("div");
    memoryValueElement.classList.add("memory-value");
    memoryValueElement.textContent = memoryValue;
    row.appendChild(memoryValueElement);
  }

  memoryValueElement.textContent = memoryValue;

  const memoryHoverButtons = row.querySelector(".memory-hover-buttons");
  if (!memoryHoverButtons.children.length) {
    const mcButton = document.createElement("button");
    mcButton.classList.add("mv-btn");
    mcButton.innerHTML = "MC";

    const mplusButton = document.createElement("button");
    mplusButton.classList.add("mv-btn");
    mplusButton.innerHTML = "M+";

    const mminusButton = document.createElement("button");
    mminusButton.classList.add("mv-btn");
    mminusButton.innerHTML = "M-";

    memoryHoverButtons.appendChild(mcButton);
    memoryHoverButtons.appendChild(mplusButton);
    memoryHoverButtons.appendChild(mminusButton);
  }

  memoryCoverDiv.classList.toggle("show");
};

document
  .querySelector(".memory-hover-buttons")
  .addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("mv-btn")) {
      const memoryValueElement = document.querySelector(".memory-value");

      if (e.target.innerText === "M+") {
        memoryValue += parseFloat(result.innerHTML);
        memoryValueElement.textContent = memoryValue;
        console.log("Memory Added: " + memoryValue);
      } else if (e.target.innerText === "M-") {
        memoryValue -= parseFloat(result.innerHTML);
        memoryValueElement.textContent = memoryValue;
        console.log("Memory Subtracted: " + memoryValue);
      } else if (e.target.innerText === "MC") {
        memoryValue = 0;
        memoryValueElement.textContent = memoryValue;
        console.log("Memory Cleared");
      }
    }
  });

const row = document.querySelector(".row");
const memoryHoverButtons = row.querySelector(".memory-hover-buttons");

row.addEventListener("mouseenter", () => {
  memoryHoverButtons.style.display = "block";
});

row.addEventListener("mouseleave", () => {
  memoryHoverButtons.style.display = "none";
});

equal.onclick = () => calculateResult();
clear.onclick = () => clearResult();
back.onclick = () => backspace();

function clearResult() {
  currentNumber = "";
  currentExpression = "";
  result.innerHTML = "0";
  expressionDisplay.innerHTML = "&nbsp;";
}

function backspace() {
  currentNumber = currentNumber.slice(0, -1);
  result.innerHTML = currentNumber;
  expressionDisplay.innerHTML = currentExpression + currentNumber;
}

function calculatePercent() {
  if (currentNumber === "" && currentExpression !== "") {
    currentNumber = result.innerHTML;
    currentExpression = "";
  }
  if (currentNumber !== "") {
    let currentValue = parseFloat(currentNumber);
    if (!isNaN(currentValue)) {
      let percentValue = currentValue / 100;
      currentNumber = percentValue.toString();
      result.innerHTML = currentNumber;
      expressionDisplay.innerHTML = currentNumber;
    }
  }
}

function clearLastEntry() {
  if (currentNumber !== "") {
    currentNumber = "";
    result.innerHTML = "&nbsp;&nbsp;";
    expressionDisplay.innerHTML = currentExpression;
  } else if (currentExpression !== "") {
    let parts = currentExpression.trim().split(" ");
    if (parts.length > 1) {
      parts.pop();
      currentExpression = parts.join(" ");
    } else {
      currentExpression = "";
    }
    expressionDisplay.innerHTML = currentExpression;
  }
}

function addDecimal() {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    result.innerHTML = currentNumber;
    expressionDisplay.innerHTML = currentExpression + currentNumber;
  }
}

function togglePositiveNegative() {
  if (currentNumber !== "") {
    if (currentNumber.startsWith("-")) {
      currentNumber = currentNumber.slice(1);
    } else {
      currentNumber = "-" + currentNumber;
    }
    result.innerHTML = currentNumber;
    expressionDisplay.innerHTML = currentExpression + `(${currentNumber})`;
  }
}

let originalNumber = null;

function calculateResult() {
  try {
    const expression = currentExpression
      .trim()
      .replace(/×/g, "*")
      .replace(/÷/g, "/");
    if (expression && currentNumber !== "") {
      const fullExpression = expression + " " + currentNumber;
      const resultValue = eval(fullExpression);
      result.innerHTML = resultValue;
      expressionDisplay.innerHTML = `${fullExpression} = ${resultValue}`;
      currentExpression = resultValue.toString();
      currentNumber = "";
      originalNumber = resultValue.toString();
    }
  } catch (e) {
    result.innerHTML = "Invalid";
    expressionDisplay.innerHTML = "Invalid";
    resetAll();
  }
}

// Function to reset variables for new input
function resetAll() {
  currentNumber = "";
  currentExpression = "";
  originalNumber = null;
  result.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

// Convert to Octal
function convertToOctal() {
  const numberToConvert =
    originalNumber !== null ? originalNumber : currentNumber;
  if (numberToConvert !== "") {
    const octalValue = parseInt(numberToConvert, 10).toString(8);
    result.innerHTML = octalValue;
    expressionDisplay.innerHTML = `${numberToConvert} (Octal)`;
  }
}

// Convert to Binary
function convertToBinary() {
  const numberToConvert =
    originalNumber !== null ? originalNumber : currentNumber;
  if (numberToConvert !== "") {
    const binaryValue = parseInt(numberToConvert, 10).toString(2);
    result.innerHTML = binaryValue;
    expressionDisplay.innerHTML = `${numberToConvert} (Binary)`;
  }
}

// Convert to Hexadecimal
function convertToHexadecimal() {
  const numberToConvert =
    originalNumber !== null ? originalNumber : currentNumber;
  if (numberToConvert !== "") {
    const hexValue = parseInt(numberToConvert, 10).toString(16).toUpperCase();
    result.innerHTML = hexValue;
    expressionDisplay.innerHTML = `${numberToConvert} (Hex)`;
  }
}

// Function to handle number input
function insertValue(value) {
  if (/\d/.test(value)) {
    if (originalNumber !== null && currentNumber === "") {
      resetAll();
    }
    currentNumber += value;
    result.innerHTML = currentNumber;
    expressionDisplay.innerHTML = currentExpression + currentNumber;
  } else if (["+", "-", "×", "÷"].includes(value)) {
    if (currentNumber !== "") {
      currentExpression += ` ${currentNumber}`;
    }
    currentExpression += ` ${value}`;
    currentNumber = " ";
    expressionDisplay.innerHTML = currentExpression;
    result.innerHTML = "";
    originalNumber = null;
  }
}

one.onclick = () => insertValue("1");
two.onclick = () => insertValue("2");
three.onclick = () => insertValue("3");
four.onclick = () => insertValue("4");
five.onclick = () => insertValue("5");
six.onclick = () => insertValue("6");
seven.onclick = () => insertValue("7");
eight.onclick = () => insertValue("8");
nine.onclick = () => insertValue("9");
zero.onclick = () => insertValue("0");
add.onclick = () => insertValue("+");
subtract.onclick = () => insertValue("-");
multiply.onclick = () => insertValue("×");
divide.onclick = () => insertValue("÷");
percent.onclick = () => calculatePercent();
clearEntry.onclick = () => clearLastEntry();
decimal.onclick = () => addDecimal();
posnega.onclick = () => togglePositiveNegative();
oct.onclick = () => convertToOctal();
bin.onclick = () => convertToBinary();
hex.onclick = () => convertToHexadecimal();
