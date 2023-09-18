// Declare variables and constants
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.current-num');
const resultField = document.querySelector(".result")
let currentNum = '0';
let previousNum = null;
let operation = null;
let result = null;

// Declare functions
function updateDisplay() {
    const screen = document.querySelector('.screen');
    if (screen.scrollWidth > screen.clientWidth) {
        // Apply the .small-text class if content overflows
        screen.classList.add('small-text');
    } else if (screen.scrollWidth < screen.clientWidth) {
        // Remove the .small-text class if content doesn't overflow
        screen.classList.remove('small-text');
    }
    if (operation !== null && previousNum !== null && currentNum !== '') {
        // Display the current operation and both numbers
        display.textContent = `${previousNum} ${operation} ${currentNum}`;
    } else if (previousNum !== null && currentNum === '') {
        // Display only the previous number and the operation
        display.textContent = `${previousNum} ${operation}`;
    } else {
        // Display the current number or '0' if there's nothing
        display.textContent = currentNum || '0';

    }
}

function updateResultField() {
    // Update the result field with the current result
    resultField.textContent = result !== null ? result : '';
}

function calculatePercentage() {
    if (currentNum !== '') {
        // Calculate and display the percentage based on the current number
        currentNum = (parseFloat(currentNum) / 100).toString();
        updateDisplay();
    }
}

function clear() {
    currentNum = '0';
    previousNum = null;
    operation = null;
    result = null;
    updateDisplay();
    updateResultField();
}

function deleteLastDigit() {
    if (currentNum.length > 0) {
        // Remove the last character from the current number
        currentNum = currentNum.slice(0, -1);
        updateDisplay();
    }
}

function appendNumber(num) {
    if (result !== null) {
        clear(); // Clear everything if there's a previous result
    }

    if (currentNum === '0') {
        currentNum = '';
    }
    currentNum += num;
    updateDisplay();
}

function chooseOperation(op) {
    if (result !== null) {
        // If there's a previous result, set it as the current number
        currentNum = result.toString();
        previousNum = null;
        result = null;
    }

    operation = op;
    if (previousNum === null) {
        previousNum = currentNum;
        updateResultField(); // Update the result field with the first number
        display.textContent = `${previousNum} ${operation}`;
    } else {
        // Update the display with the selected operator
        display.textContent = `${previousNum} ${operation}`;
    }
    currentNum = '';
}

function performOperation() {
    switch (operation) {
        case '+':
            result = parseFloat(previousNum) + parseFloat(currentNum);
            break;
        case '-':
            result = parseFloat(previousNum) - parseFloat(currentNum);
            break;
        case 'x':
            result = parseFloat(previousNum) * parseFloat(currentNum);
            break;
        case '÷':
            result = parseFloat(previousNum) / parseFloat(currentNum);
            break;
        case '^':
            result = Math.pow(parseFloat(previousNum), parseFloat(currentNum));
            break;
        case '%':
            result = (parseFloat(previousNum) / 100) * parseFloat(currentNum);
            break;
        default:
            break;
    }
    currentNum = result.toString();
    previousNum = null;
    operation = null;
    // updateDisplay();
}

function calculate() {
    if (previousNum !== null && operation !== null && currentNum !== '') {
        // Perform the calculation and update the result field with the result
        performOperation();
        updateResultField(); // Update the result field with the result
    }
}

function toggleSign() {
    currentNum = parseFloat(currentNum) * -1;
    updateDisplay();
}



// Event listeners for number buttons
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => {
    button.addEventListener('click', (e) => appendNumber(e.target.textContent));
});

// Event listeners for operator buttons
const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => chooseOperation(e.target.textContent));
});

// Event listener for the equal button
document.querySelector('.equal-button').addEventListener('click', calculate);

// Event listener for the clear button
document.querySelector('.clear-button').addEventListener('click', clear);

// Event listener for the sign button
document.querySelector('.sign-button').addEventListener('click', toggleSign);

document.querySelector('.percent-button').addEventListener('click', calculatePercentage);

document.querySelector('.delete-button').addEventListener('click', deleteLastDigit);
// Additional event listeners for scientific functions (sin, cos, etc.) can be added here