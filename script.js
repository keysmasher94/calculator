// TODO:
//  - Make it keyboard accessible
//  - Display "ERROR" if too many characters on the screen (use toPrecision function)
//  - Add backspace functionality
//  - Add functionality that if num1, operator, and num2 are not null, if an
//  operator is pressed, the result is calculated and the answer becomes num1,
//  the operator becomes the next operator, and the answer and the operator are
//  displayed on the screen
const btn = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

const OPERATORS = ["+", "-", "*", "/", "^"];

function add(a, b) {
  let answer = a + b;
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}
function subtract(a, b) {
  let answer = a - b;
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}

function multiply(a, b) {
  let answer = a * b;
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}

function divide(a, b) {
  if (b === 0) {
    screen.textContent = "ERROR";
    return null;
  }
  let answer = a / b;
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}

function exponent(a, b) {
  let answer = a ** b;
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}

let num1 = null;
let num2 = null;
let operator = null;

btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    // FIXME: figure out what the clear buttons actually do on a calculator
    if (e.target.id === "clear") {
      num2 = null;
      operator = null;
      screen.textContent = num1;
    } else if (e.target.id === "clear-all") {
      num1 = null;
      operator = null;
      num2 = null;
      screen.textContent = "";
    } else if (num1 === null) {
      // Check that the input is a number
      if (!isNaN(parseInt(e.target.id))) {
        num1 = e.target.id;
        screen.textContent = num1;
      }
    } else if (
      (!isNaN(parseInt(e.target.id)) || e.target.id === ".") &&
      operator === null
    ) {
      // Keep adding numbers to num1 while the input are numbers
      num1 += e.target.id;
      screen.textContent = num1;
    } else if (operator === null) {
      // Only add an input if an operator is selected
      if (OPERATORS.includes(e.target.id)) {
        operator = e.target.id;
        screen.textContent = `${num1} ${operator}`;
      }
    } else if (num2 === null) {
      // Check that input is a number
      if (!isNaN(parseInt(e.target.id))) {
        num2 = e.target.id;
        screen.textContent = `${num1} ${operator} ${num2}`;
      }
    } else if (!isNaN(parseInt(e.target.id)) || e.target.id === ".") {
      // Keep adding numbers to num2 while the input are numbers
      num2 += e.target.id;
      screen.textContent = `${num1} ${operator} ${num2}`;
    } else if (e.target.id === "=") {
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);
      switch (operator) {
        case "+":
          num1 = add(num1, num2);
          break;
        case "-":
          num1 = subtract(num1, num2);
          break;
        case "*":
          num1 = multiply(num1, num2);
          break;
        case "/":
          num1 = divide(num1, num2);
          break;
        case "^":
          num1 = exponent(num1, num2);
          break;
      }
      num2 = null;
      operator = null;
    }
  });
});
