const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#button-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  // Add digit to calculator screen
  addDigit(digit) {
    // Check if current operation already has a dot
    if (digit === "." && this.currentOperation.includes(".")) {
      return;
    }

    this.currentOperation += digit;
    this.updateScreen();
  }

  // Process all calculator operations
  processOperation(operation) {
    if (
      this.currentOperation === "" &&
      operation !== "C" &&
      operation !== "CE" &&
      operation !== "DEL"
    ) {
      if (this.previousOperation !== "" && this.operation !== undefined) {
        this.operation = operation;
        this.updateScreen();
      }
      return;
    }

    // Handle clear and delete operations
    switch (operation) {
      case "C":
        this.clearAll();
        break;
      case "CE":
        this.clearEntry();
        break;
      case "DEL":
        this.deleteDigit();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.chooseOperation(operation);
        break;
      case "=":
        this.compute();
        break;
      default:
        return;
    }

    this.updateScreen();
  }

  clearAll() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  clearEntry() {
    this.currentOperation = "";
  }

  deleteDigit() {
    this.currentOperation = this.currentOperation.slice(0, -1);
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.previousOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
  }

  // Change value of the calculator screen
  updateScreen() {
    this.currentOperationText.innerText = this.currentOperation;
    if (this.operation != null) {
      this.previousOperationText.innerText = `${this.previousOperation} ${this.operation}`;
    } else {
      this.previousOperationText.innerText = "";
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (!isNaN(value) || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
