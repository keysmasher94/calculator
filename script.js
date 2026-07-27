/*
 * The Odin Project - Calculator
 *
 * A simple calculator, completing the final major project of the foundation
 * course for The Odin Project
 *
 * Copyright (C) 2026 Jared Lynch <jaredlynch@protonmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const btn = document.querySelectorAll("button");
const screen = document.querySelector(".screen");

const OPERATORS = ["+", "-", "*", "/", "^"];
const VALID_KEYS = [
  "+",
  "-",
  "*",
  "/",
  "^",
  "Backspace",
  "Delete",
  "Enter",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "=",
];
const SCREEN_WIDTH = 12; // Actual width contains 18 numbers, but this allows
// for 3 spaces for gaps and operators

function add(a, b) {
  let answer = Math.round((a + b) * 100) / 100;
  screen.textContent = answer;
  return answer;
}

function subtract(a, b) {
  let answer = Math.round((a - b) * 100) / 100;
  screen.textContent = answer;
  return answer;
}

function multiply(a, b) {
  let answer = Math.round(a * b * 100) / 100;
  screen.textContent = answer;
  return answer;
}

function divide(a, b) {
  if (b === 0) {
    screen.textContent = "ERROR";
    return null;
  }
  let answer = Math.round((a / b) * 100) / 100;
  screen.textContent = answer;
  return answer;
}

function exponent(a, b) {
  let answer = Math.round(a ** b * 100) / 100;
  if (answer > 999999999999 || answer == Infinity) {
    screen.textContent = "TOO LARGE";
    return null;
  }
  screen.textContent = answer;
  return answer;
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
  if (type === "clear") {
    if (num2 !== null) {
      num2 = null;
      screen.textContent = `${num1} ${operator}`;
    } else if (operator !== null) {
      operator = null;
      screen.textContent = num1;
    } else {
      num1 = null;
      screen.textContent = "";
    }
  } else if (type === "clear-all") {
    num1 = null;
    num2 = null;
    operator = null;
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
    calculate(e.target.id);
  });
});

addEventListener("keydown", (e) => {
  if (VALID_KEYS.includes(e.key)) {
    if (e.key === "Backspace") {
      value = "<-";
    } else if (e.key === "Delete") {
      value = "clear-all";
    } else if (e.key === "Enter") {
      value = "=";
    } else {
      value = e.key;
    }
    calculate(value);
  }
});

function calculate(value) {
  if (value === "clear") {
    clear("clear");
  } else if (value === "clear-all") {
    clear("clear-all");
  } else if (value === "<-") {
    backspace();
  } else if (num1 === null) {
    addNum("num1", value);
  } else if ((!isNaN(parseInt(value)) || value === ".") && operator === null) {
    // Keep adding numbers to num1 while the input are numbers
    addNum("num1", value);
  } else if (operator === null || OPERATORS.includes(value)) {
    // Only add an input if an operator is selected
    if (OPERATORS.includes(value)) {
      // TODO: change this so if there's an operator, and you press another
      // operator, it changes the operator
      if (num1.length <= SCREEN_WIDTH - 1) {
        operator = value;
        screen.textContent = `${num1} ${operator}`;
      }
    }
  } else if (num2 === null) {
    addNum("num2", value);
  } else if (!isNaN(parseInt(value)) || value === ".") {
    // Keep adding numbers to num2 while the input are numbers
    addNum("num2", value);
  } else if (value === "=" || OPERATORS.includes(value)) {
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
    if (OPERATORS.includes(value)) {
      operator = value;
      screen.textContent = `${num1} ${operator}`;
    } else {
      operator = null;
    }
  }
}
