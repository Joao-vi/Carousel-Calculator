// Selectors

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const clearAll = document.querySelector("[data-clear-all]");
const clear = document.querySelector("[data-clear]");
const equal = document.querySelector("[data-equal]");
const previousTagElement = document.querySelector("[data-prev]");
const currentTagElement = document.querySelector("[data-current]");

// Class
class Calculator {
  constructor(previousTextElement, currentTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }
  correct() {
    if (this.currentOperand === "0") {
      return;
    } else {
      let original = this.currentOperand.slice(0, -1);
      if (original === "") {
        original = "0";
        this.currentOperand = original;
      } else {
        this.currentOperand = original;
      }
    }
  }
  clear() {
    this.previousOperand = "0";
    this.currentOperand = "0";
    this.operation = undefined;
  }
  appendNumber(number) {
    if (this.currentOperand === "0" && number == ".") {
      this.currentOperand += number;
    } else if (this.currentOperand === "0") {
      this.currentOperand = number;
    } else if (this.currentOperand.includes(".") && number == ".") {
      return;
    } else {
      this.currentOperand += number;
    }
  }
  chooseOperation(operation) {
    if (this.currentOperand === "0") {
      return;
    }
    if (this.previousOperand !== "0") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }
  show() {
    this.currentTextElement.innerText = this.currentOperand;
    if (this.operation === undefined) {
      this.previousTextElement.innerText = this.previousOperand;
    } else {
      this.previousTextElement.innerText =
        this.previousOperand + " " + this.operation;
    }
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case "+": {
        computation = prev + current;
        break;
      }
      case "-": {
        computation = prev - current;
        break;
      }
      case "x": {
        computation = prev * current;
        break;
      }
      case "/": {
        computation = prev / current;
        break;
      }
      default: {
        return;
      }
    }
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "0";
  }
}
let calculator = new Calculator(previousTagElement, currentTagElement);

// Events

// -- Operations
operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.chooseOperation(operation.innerText);
    calculator.show();
  });
});

// -- Clear all
clearAll.addEventListener("click", () => {
  calculator.clear();
  calculator.show();
});

// -- Numbers
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.show();
  });
});

// -- Equals Button

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.show();
});

//-- Clear

clear.addEventListener("click", () => {
  calculator.correct();
  calculator.show();
});
