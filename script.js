// TODO:
//  - Add a 'clear button'
//  - Make it keyboard accessible
const btn = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

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

let num1 = null;
let num2 = null;
let operator = null;

// TODO: play with a calculator when done and compare how they work
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (num1 == null) {
      // FIXME: this must be a number, and needs to handle multiple digits
      num1 = e.target.id;
      screen.textContent = num1.toString();
    } else if (operator == null) {
      // FIXME: this must be an operator
      operator = e.target.id;
      screen.textContent = `${num1.toString()} ${operator}`;
    } else if (num2 == null) {
      // FIXME: this must be a number, and needs to handle multiple digits
      num2 = e.target.id;
      screen.textContent = `${num1.toString()} ${operator} ${num2.toString()}`;
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
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operator === "+") {
    return num1 + num2;
  } else if (operator === "-") {
    return num1 - num2;
  } else if (operator === "*") {
    return num1 * num2;
  } else if (operator === "/") {
    return num1 / num2;
  }
}
