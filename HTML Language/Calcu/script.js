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


const calculatorContainer = document.querySelector('.container');

// Minimize Calculator
function minimizeCalculator() {
    calculatorContainer.style.display = 'none';
    setTimeout(() => {
        alert("Calculator minimized. Refresh to bring it back.");
    }, 100);
}

// Toggle Enlarge/Restore Calculator
let isEnlarged = false;
    function toggleEnlargeCalculator() {
        if (!isEnlarged) {
            calculatorContainer.style.width = '600px'; // Enlarged width
            calculatorContainer.style.height = 'auto'; // Adjust height as needed
        } else {
            calculatorContainer.style.width = '360px'; // Default width
            calculatorContainer.style.height = 'auto';
            }
            isEnlarged = !isEnlarged;
    }

// Exit Calculator
function exitCalculator() {
    calculatorContainer.remove(); // Removes the calculator from the DOM
        alert("Calculator closed.");
}


// Menu Overlay Elements
const menuOverlay = document.getElementById('menu-overlay');
const closeMenuButton = document.getElementById('close-menu');


// Open the menu overlay
function openMenu() {
    menuOverlay.style.display = 'flex'; // Show the menu overlay
}

// Close the menu overlay
closeMenuButton.addEventListener('click', () => {
    menuOverlay.style.display = 'none'; // Hide the menu overlay
});

// Close menu by clicking outside the menu box
menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
        menuOverlay.style.display = 'none'; // Hide the menu
    }
});

// Show the About Section
function showAboutSection() {
    menuOverlay.style.display = 'none'; // Close the menu
    aboutSection.style.display = 'flex'; // Show the About Section
}

// Close the About Section
closeAboutButton.addEventListener('click', () => {
    aboutSection.style.display = 'none'; // Hide the About Section
});

