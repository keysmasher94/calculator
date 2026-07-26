// TODO:
//  - Make it keyboard accessible
const btn = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

const OPERATORS = ["+", "-", "*", "/", "^"];
const SCREEN_WIDTH = 12; // Actual width contains 18 numbers, but this allows
// for 3 spaces for gaps and operators

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
  if (answer > 999999999999 || answer == Infinity) {
    screen.textContent = "TOO LARGE";
    return null;
  }
  if (answer % 1 !== 0) {
    screen.textContent = answer.toFixed(2);
    return answer;
  } else {
    screen.textContent = answer;
    return answer;
  }
}

function backspace() {
  if (num2 !== null) {
    if (num2.length >= 1) {
      num2 = num2.slice(0, -1);
      screen.textContent = `${num1} ${operator} ${num2}`;
    } else {
      num2 = null;
      screen.textContent = `${num1} ${operator}`;
    }
  } else if (operator !== null) {
    operator = null;
    screen.textContent = num1;
  } else if (num1 !== null) {
    if (num1.length === 1) {
      num1 = null;
      screen.textContent = "";
    } else {
      num1 = num1.slice(0, -1);
      screen.textContent = num1;
    }
  }
}

function clear(type) {
  num2 = null;
  operator = null;
  if (type === "clear") {
    screen.textContent = num1;
  } else if (type === "clear-all") {
    num1 = null;
    screen.textContent = "";
  }
}

function addNum(order, number) {
  if (!isNaN(parseInt(number))) {
    if (order === "num1") {
      if (num1 === null) {
        num1 = number;
        // SCREEN_WIDTH - 1 allows for at least one digit in num2
      } else if (num1.length < SCREEN_WIDTH - 1) {
        num1 += number;
      }
      screen.textContent = num1;
    } else if (order === "num2") {
      // Make sure the first number isn't too big on its own
      if (num2 === null && num1.length <= SCREEN_WIDTH - 1) {
        num2 = number;
        screen.textContent = `${num1} ${operator} ${num2}`;
        //} else if (num1.length + num2.length < SCREEN_WIDTH) {
        //num2 += number;
      } else if (num2 === null && num1.length >= SCREEN_WIDTH) {
        return;
      } else if (num2 !== null && num1.length + num2.length >= SCREEN_WIDTH) {
        return;
      } else if (num2 !== null) {
        num2 += number;
        screen.textContent = `${num1} ${operator} ${num2}`;
      }
      //screen.textContent = `${num1} ${operator} ${num2}`;
    }
  } else if (number === ".") {
    // SCREEN_WIDTH - 2 allows for one digit in num2 and one additional digit so
    // the last character isn't a '.'
    if (
      order === "num1" &&
      !num1.includes(".") &&
      num1.length <= SCREEN_WIDTH
    ) {
      num1 += ".";
      screen.textContent = num1;
    } else if (
      order === "num2" &&
      !num2.includes(".") &&
      num1.length + num2.length <= SCREEN_WIDTH
    ) {
      num2 += ".";
      screen.textContent = `${num1} ${operator} ${num2}`;
    }
  }
}

let num1 = null;
let num2 = null;
let operator = null;

btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    // FIXME: figure out what the clear buttons actually do on a calculator
    if (e.target.id === "clear") {
      clear("clear");
    } else if (e.target.id === "clear-all") {
      clear("clear-all");
    } else if (e.target.id === "<-") {
      backspace();
    } else if (num1 === null) {
      addNum("num1", e.target.id);
    } else if (
      (!isNaN(parseInt(e.target.id)) || e.target.id === ".") &&
      operator === null
    ) {
      // Keep adding numbers to num1 while the input are numbers
      addNum("num1", e.target.id);
    } else if (operator === null) {
      // Only add an input if an operator is selected
      if (OPERATORS.includes(e.target.id)) {
        if (num1.length <= SCREEN_WIDTH - 1) {
          operator = e.target.id;
          screen.textContent = `${num1} ${operator}`;
        }
      }
    } else if (num2 === null) {
      addNum("num2", e.target.id);
    } else if (!isNaN(parseInt(e.target.id)) || e.target.id === ".") {
      // Keep adding numbers to num2 while the input are numbers
      addNum("num2", e.target.id);
    } else if (e.target.id === "=" || OPERATORS.includes(e.target.id)) {
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
      if (num1 !== null) {
        num1 = num1.toString();
      }
      num2 = null;
      if (OPERATORS.includes(e.target.id)) {
        operator = e.target.id;
        screen.textContent = `${num1} ${operator}`;
      } else {
        operator = null;
      }
    }
  });
});
