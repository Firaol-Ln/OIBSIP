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