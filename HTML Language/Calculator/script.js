let memory = 0; // Memory storage
let currentOperator = null; // Current operator

const display = document.getElementById("display");

// Append a number or operator to the display
function appendNumber(number) {
  if (display.value === "0") display.value = "";
  display.value += number;
}

// Append a decimal point
function appendPeriod() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

// Clear the entire display
function clearAll() {
  display.value = "";
  currentOperator = null;
}

// Clear the last entry
function clearEntry() {
  display.value = display.value.slice(0, -1);
}

// Backspace function
function backspace() {
  display.value = display.value.slice(0, -1) || "0";
}

// Set the current operator
function setOperator(operator) {
  if (display.value !== "") {
    currentOperator = operator;
    display.value += ` ${operator} `;
  }
}

// Calculate the result
function calculate() {
  try {
    display.value = eval(display.value.replace("×", "*").replace("÷", "/"));
  } catch (error) {
    alert("Invalid expression");
    display.value = "";
  }
}

// Calculate percentage
function calculatePercentage() {
  display.value = String(eval(display.value) / 100);
}

// Memory functions
function memoryClear() {
  memory = 0;
  alert("Memory Cleared");
}

function memoryRecall() {
  display.value = memory;
}

function memoryAdd() {
  memory += parseFloat(display.value || 0);
}

function memorySubtract() {
  memory -= parseFloat(display.value || 0);
}

function memorySave() {
  memory = parseFloat(display.value || 0);
  alert(`Memory Saved: ${memory}`);
}

function memoryShow() {
  alert(`Memory: ${memory}`);
}

// Conversion functions
function convertToBinaryMode() {
  const number = parseInt(display.value || 0, 10);
  display.value = number.toString(2);
}

function convertToOctalMode() {
  const number = parseInt(display.value || 0, 10);
  display.value = number.toString(8);
}

function convertToHexMode() {
  const number = parseInt(display.value || 0, 10);
  display.value = number.toString(16).toUpperCase();
}
