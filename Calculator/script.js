let result = document.getElementById("result");
let buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = null;
let previousInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      // Clear everything
      currentInput = "";
      previousInput = "";
      operator = null;
    } else if (value === "+/-") {
      // Toggle positive/negative
      currentInput = String(-parseFloat(currentInput));
    } else if (value === "%") {
      // Percentage
      currentInput = String(parseFloat(currentInput) / 100);
    } else if (value === "=") {
      // Perform calculation
      if (operator && previousInput !== "" && currentInput !== "") {
        currentInput = String(calculate(previousInput, currentInput, operator));
        operator = null;
        previousInput = "";
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Handle operators
      if (currentInput !== "") {
        if (previousInput !== "") {
          currentInput = String(calculate(previousInput, currentInput, operator));
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
      }
    } else {
      // Append numbers or decimal
      currentInput += value;
    }

    // Update display
    result.value = currentInput || "0";
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