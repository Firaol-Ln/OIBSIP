// Calculator variables
let currentInput = "0";
let previousInput = "";
let operator = "";
let newNumber = false;

const current = document.getElementById("display-current");
const history = document.getElementById("display-history");

// Update the calculator screen
function updateDisplay() {
    current.textContent = currentInput;

    if (previousInput !== "" && operator !== "") {
        history.textContent = previousInput + " " + operator;
    } else {
        history.textContent = "";
    }
}

updateDisplay();

// Add a number to the display
function inputNumber(num) {
    if (currentInput === "0" || newNumber) {
        currentInput = num;
        newNumber = false;
    } else {
        currentInput += num;
    }

    updateDisplay();
}

// Add a decimal point
function inputDecimal() {
    if (newNumber) {
        currentInput = "0.";
        newNumber = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

// Choose an operator
function chooseOperator(op) {
    previousInput = currentInput;
    operator = op;
    newNumber = true;

    updateDisplay();
}

// Perform the calculation
function calculate() {
    let first = parseFloat(previousInput);
    let second = parseFloat(currentInput);
    let answer;

    if (operator === "+") {
        answer = first + second;
    } else if (operator === "−") {
        answer = first - second;
    } else if (operator === "×") {
        answer = first * second;
    } else if (operator === "÷") {
        if (second === 0) {
            currentInput = "Error";
            previousInput = "";
            operator = "";
            newNumber = true;
            updateDisplay();
            return;
        }

        answer = first / second;
    }

    currentInput = String(answer);
    previousInput = "";
    operator = "";
    newNumber = true;

    updateDisplay();
}

// Clear the calculator
function clearAll() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    newNumber = false;

    updateDisplay();
}

// Delete the last digit
function backspace() {
    if (newNumber) {
        return;
    }

    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }

    updateDisplay();
}
// Add click events to number buttons
document.querySelectorAll('[data-action="number"]').forEach(button => {
    button.addEventListener("click", function () {
        inputNumber(this.dataset.number);
    });
});

// Add click event to decimal button
const decimalButton = document.querySelector('[data-action="decimal"]');

decimalButton.addEventListener("click", function () {
    inputDecimal();
});

// Add click events to operator buttons
document.querySelectorAll('[data-action="operator"]').forEach(button => {
    button.addEventListener("click", function () {
        chooseOperator(this.dataset.operator);
    });
});

// Add click event to equals button
const equalsButton = document.querySelector('[data-action="equals"]');

equalsButton.addEventListener("click", function () {
    calculate();
});

// Add click event to clear button
const clearButton = document.querySelector('[data-action="clear"]');

clearButton.addEventListener("click", function () {
    clearAll();
});

// Add click event to backspace button
const backspaceButton = document.querySelector('[data-action="backspace"]');

backspaceButton.addEventListener("click", function () {
    backspace();
});