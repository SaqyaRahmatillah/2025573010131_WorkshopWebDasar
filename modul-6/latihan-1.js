const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons-container");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let waitingSecondNumber = false;

function updateDisplay(value) {
  display.textContent = value;
}

function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  waitingSecondNumber = false;

  updateDisplay("0");
}

function calculate() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  let result = 0;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;

    case "-":
      result = num1 - num2;
      break;

    case "*":
      result = num1 * num2;
      break;

    case "/":
      result = num2 !== 0 ? num1 / num2 : "Error";
      break;
  }

  updateDisplay(result);

  firstNumber = result.toString();
  secondNumber = "";
  operator = "";
  waitingSecondNumber = false;
}

buttonsContainer.addEventListener("click", function (event) {
  const value = event.target.dataset.value;

  if (!value) return;

  if (!isNaN(value) || value === ".") {
    if (!waitingSecondNumber) {
      firstNumber += value;
      updateDisplay(firstNumber);
    } else {
      secondNumber += value;
      updateDisplay(secondNumber);
    }
  } else if (["+", "-", "*", "/"].includes(value)) {
    operator = value;
    waitingSecondNumber = true;
  } else if (value === "=") {
    if (firstNumber && secondNumber && operator) {
      calculate();
    }
  } else if (value === "C") {
    clearCalculator();
  }
});

window.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    if (!waitingSecondNumber) {
      firstNumber += key;
      updateDisplay(firstNumber);
    } else {
      secondNumber += key;
      updateDisplay(secondNumber);
    }
  } else if (["+", "-", "*", "/"].includes(key)) {
    operator = key;
    waitingSecondNumber = true;
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Escape") {
    clearCalculator();
  }
});
