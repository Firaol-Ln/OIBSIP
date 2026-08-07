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