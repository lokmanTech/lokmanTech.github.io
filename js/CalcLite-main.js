document.addEventListener("DOMContentLoaded", function () {
    const screen = document.querySelector('.screen');
    let currentInput = '0';
    let previousInput = '';
    let operator = '';

    function updateScreen() {
        screen.textContent = currentInput;
    }

    function clearScreen() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        updateScreen();
    }

    function handleNumberClick(value) {
        if (currentInput === '0' || currentInput === 'Error') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateScreen();
    }

    function handleOperatorClick(op) {
        if (operator !== '') {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = op;
    }

    function calculate() {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) {
            currentInput = 'Error';
        } else {
            switch (operator) {
                case '+':
                    currentInput = prev + current;
                    break;
                case '-':
                    currentInput = prev - current;
                    break;
                case '×':
                    currentInput = prev * current;
                    break;
                case '÷':
                    if (current !== 0) {
                        currentInput = prev / current;
                    } else {
                        currentInput = 'Error';
                    }
                    break;
                default:
                    break;
            }
        }
        operator = '';
        updateScreen();
    }

    function handleEqualClick() {
        calculate();
        previousInput = '';
    }

    function handleClearClick() {
        clearScreen();
    }

    // Event listener for all calculator buttons
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function () {
            const value = this.textContent;
            if (!isNaN(value) || value === '.') {
                handleNumberClick(value);
            } else if (value === '+' || value === '-' || value === '×' || value === '÷') {
                handleOperatorClick(value);
            } else if (value === '=') {
                handleEqualClick();
            } else if (value === 'C') {
                handleClearClick();
            }
        });
    });

    // Event listener for the delete button
    document.querySelector('.calc-button.delete').addEventListener('click', function () {
        currentInput = currentInput.slice(0, -1); // Remove the last character
        if (currentInput === "") {
            currentInput = '0'; // If there's nothing left, set it back to zero
        }
        updateScreen();
    });

});

