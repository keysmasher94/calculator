// TODO:
//  - Make it keyboard accessible
//  - Display "ERROR" if too many characters on the screen (use toPrecision function)
//  - Once all functions ar here, make a new document and refactor -- treat this
//  as a portfolio item so produce it like one
const btn = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

const OPERATORS = ["+", "-", "*", "/", "^"];

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function exponent(a, b) {
  return a ** b;
}

let num1 = null;
let num2 = null;
let operator = null;

// TODO:
// - If a second operator is pressed when the `=` should be, calculate num1 and
// num2 at that point, then add the operator to the next sum
// - Don't allow multiple '.'s in one number
// - Allow '.'s (more than one digit per number is needed first)
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "clear") {
      num2 = null;
      operator = null;
      screen.textContent = num1;
    } else if (e.target.id === "clear-all") {
      num1 = null;
      operator = null;
      num2 = null;
      screen.textContent = "";
    } else if (num1 == null) {
      // FIXME: this must be a number, and needs to handle multiple digits
      num1 = e.target.id;
      if (num1 === "<-") {
        num1 = null;
        screen.textContent = "";
      } else {
        screen.textContent = num1.toString();
      }
    } else if (operator == null) {
      // FIXME: this must be an operator
      operator = e.target.id;
      if (operator === "<-") {
        num1 = null;
        operator = null;
        screen.textContent = "";
      } else {
        screen.textContent = `${num1.toString()} ${operator}`;
      }
    } else if (num2 == null) {
      // FIXME: this must be a number, and needs to handle multiple digits
      num2 = e.target.id;
      if (num2 === "<-") {
        operator = null;
        num2 = null;
        screen.textContent = num1.toString();
      } else {
        screen.textContent = `${num1.toString()} ${operator} ${num2.toString()}`;
      }
    } else if (e.target.id === "<-") {
      num2 = null;
      screen.textContent = `${num1.toString()} ${operator}`;
    } else if (e.target.id === "=") {
      const answer = calculate(num1, num2, operator);
      screen.textContent = answer.toString();
      // Reset
      num1 = answer;
      num2 = null;
      operator = null;
    }
  });
});

function calculate(num1, num2, operator) {
  // Change the numbers from strings to Floats to perform calculations
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (operator === "+") {
    answer = num1 + num2;
    // Do checks to see whether to dispay decimal point on the screen
    if (answer % 1 !== 0) {
      return answer.toFixed(2);
    } else {
      return answer;
    }
  } else if (operator === "-") {
    answer = num1 - num2;
    if (answer % 1 !== 0) {
      return answer.toFixed(2);
    } else {
      return answer;
    }
  } else if (operator === "*") {
    answer = num1 * num2;
    if (answer % 1 !== 0) {
      return answer.toFixed(2);
    } else {
      return answer;
    }
  } else if (operator === "/") {
    answer = num1 / num2;
    // This is any number divided by 0
    if (answer == Infinity) {
      return "ERROR";
    }
    if (answer % 1 !== 0) {
      return answer.toFixed(2);
    } else {
      return answer;
    }
  } else if (operator === "^") {
    answer = num1 ** num2;
    if (answer == NaN) {
      return "ERROR";
    }
    if (answer % 1 !== 0) {
      return answer.toFixed(2);
    } else {
      return answer;
    }
  }
}
