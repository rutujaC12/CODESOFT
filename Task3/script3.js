document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let currentInput = "";
    let currentOperator = "";
    let firstOperand = "";
    let isCalculatorOn = true;

    function updateDisplay() {
        display.textContent = firstOperand + " " + currentOperator + " " + currentInput;
    }

    function toggleCalculator(on) {
        if (on) {
            isCalculatorOn = true;
            display.style.opacity = 1;
        } else {
            isCalculatorOn = false;
            display.style.opacity = 0.5;
            currentInput = "";
            firstOperand = "";
            currentOperator = "";
            updateDisplay();
        }
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            if (!isCalculatorOn) return;
            const buttonValue = button.textContent;

            if (buttonValue >= "0" && buttonValue <= "9") {
                currentInput += buttonValue;
            } else if (buttonValue === ".") {
                if (!currentInput.includes(".")) {
                    currentInput += ".";
                }
            } else if (buttonValue === "C") {
                currentInput = "";
                currentOperator = "";
                firstOperand = "";
            } else if (["+", "-", "*", "/"].includes(buttonValue)) {
                if (currentOperator && firstOperand) {
                    currentInput = calculate(firstOperand, currentInput, currentOperator).toString();
                    firstOperand = currentInput;
                } else {
                    firstOperand = currentInput;
                }
                currentInput = "";
                currentOperator = buttonValue;
            } else if (buttonValue === "=") {
                if (currentOperator && firstOperand) {
                    currentInput = calculate(firstOperand, currentInput, currentOperator).toString();
                    firstOperand = "";
                    currentOperator = "";
                }
            }

            updateDisplay();
        });
    });

    function calculate(num1, num2, operator) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num1 / num2;
            default:
                return num2;
        }
    }

    document.getElementById("on").addEventListener("click", function () {
        toggleCalculator(!isCalculatorOn);
    });

    toggleCalculator(isCalculatorOn);
});
