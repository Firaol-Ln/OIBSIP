# Calculator – OIBSIP Task 1

A browser-based calculator built with HTML5, CSS3, and vanilla JavaScript for Task 1 of the Oasis Infobyte Web Development Internship.

## Features

* Display screen showing the current value and operation history
* Number buttons from 0–9
* Decimal point support
* Addition (+)
* Subtraction (−)
* Multiplication (×)
* Division (÷)
* Equals (=) button for calculations
* Clear (C) button to reset the calculator
* Backspace (⌫) button to remove the last entered character
* Percentage (%) conversion
* Division-by-zero protection with an error message
* Operator chaining for sequential calculations
* Responsive calculator layout using CSS Grid

## Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript

No JavaScript frameworks or `eval()` are used.

## How It Works

The calculator stores its current value, previous value, selected operator, and whether the next number should replace the current input.

Number and function buttons use `addEventListener()` to respond to user interactions. The calculator uses `data-*` attributes in the HTML to identify button actions and operators.

Calculations are performed manually using JavaScript conditional statements. `parseFloat()` is used to convert displayed values from strings into numbers before performing arithmetic operations.

Division by zero is checked before division. When the second number is zero, the calculator displays an error instead of producing an invalid result.

Operator chaining is supported by calculating the current operation before storing the next operator. For example:

`5 + 3 × 2`

is processed sequentially as:

`5 + 3 = 8`

then:

`8 × 2 = 16`

## Project Structure

text
calculator/
├── index.html
├── style.css
├── script.js
└── README.md

### `index.html`

Contains the calculator structure, display, and buttons.

### `style.css`

Contains the visual design, responsive layout, button styling, and CSS Grid keypad.

### `script.js`

Contains the calculator state, input handling, arithmetic operations, error handling, and button event listeners.

## How to Run

1. Clone the OIBSIP repository.
2. Open the calculator project folder.
3. Open `index.html` in a modern web browser.
4. No build tools or additional dependencies are required.

## Requirements Implemented

* Display screen ✅
* Numbers 0–9 ✅
* Decimal point ✅
* Addition, subtraction, multiplication, and division ✅
* Equals button ✅
* Clear button ✅
* Backspace button ✅
* Division-by-zero protection ✅
* Operator chaining ✅
* CSS Grid button layout ✅
* Event listeners instead of inline `onclick` attributes ✅
* No `eval()` ✅

## Author

Firaol Dereje
