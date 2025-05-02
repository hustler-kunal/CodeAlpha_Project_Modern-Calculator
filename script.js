const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeSwitch = document.getElementById("themeSwitch");

let current = "";
let resetNext = false;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function handleInput(input) {
  if (input === "clear") {
    current = "";
  } else if (input === "backspace") {
    current = current.slice(0, -1);
  } else if (input === "=" || input === "Enter") {
    try {
      current = eval(current).toString();
    } catch {
      current = "Error";
    }
    resetNext = true;
  } else {
    if (resetNext && /\d/.test(input)) current = "";
    current += input;
    resetNext = false;
  }
  updateDisplay(current);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    handleInput(button.dataset.action);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ("0123456789+-*/.".includes(key)) {
    handleInput(key);
  } else if (key === "Enter") {
    handleInput("Enter");
  } else if (key === "Backspace") {
    handleInput("backspace");
  } else if (key === "Escape") {
    handleInput("clear");
  }
});

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light");
});
