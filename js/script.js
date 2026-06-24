const form = document.querySelector(".generator__form");
const password = document.querySelector(".generator__display-input");
const slider = document.getElementById("password-length");
const strengthText = document.getElementById("strength-text");
const strengthBars = document.querySelectorAll(".generator__strength-bar");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const allowedCharacters = getSelectedCharacters();

  if (!allowedCharacters) {
    alert("Por favor, selecione pelo menos uma das opções de caracteres!");
    return;
  }

  const passwordLength = Number(slider.value);
  const newPassword = generetePassword(passwordLength, allowedCharacters);

  password.value = newPassword;

  updateStrength(passwordLength);
});

function getSelectedCharacters() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%&*()_+-=[]{}?;:,.";

  let allowedCharacters = "";

  if (document.getElementById("uppercase").checked) {
    allowedCharacters += uppercaseChars;
  }

  if (document.getElementById("lowercase").checked) {
    allowedCharacters += lowercaseChars;
  }

  if (document.getElementById("numbers").checked) {
    allowedCharacters += numberChars;
  }

  if (document.getElementById("symbols").checked) {
    allowedCharacters += symbolChars;
  }

  return allowedCharacters;
}

function updateSliderProgress() {
  const val = Number(slider.value);
  const min = Number(slider.min);
  const max = Number(slider.max);

  const progressPercentage = ((val - min) / (max - min)) * 100;

  // atualiza a variável CSS diretamente no elemento do slider
  slider.style.setProperty("--slider-progress", `${progressPercentage}%`);
  document.getElementById("size-value").textContent = val;
}

function generetePassword(length, charactersAllowed) {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersAllowed.length);
    result += charactersAllowed[randomIndex];
  }

  return result;
}

document.getElementById("copy").addEventListener("click", () => {
  if (password.value === "") {
    alert("Primeiro gere uma senha para poder copiar!");
    return;
  }

  navigator.clipboard.writeText(password.value);

  const copyMessage = document.getElementById("message-copied");
  copyMessage.classList.remove("hidden");

  setTimeout(() => {
    copyMessage.classList.add("hidden");
  }, 2000);
});

function updateStrength(lengthSlider) {
  let strengthOfText = "";
  let barsToPaint = 0;
  let colorClass = "";

  if (lengthSlider < 5) {
    strengthOfText = "Muito Fraca";
    barsToPaint = 1;
    colorClass = "bar--very-weak";
  } else if (lengthSlider >= 5 && lengthSlider < 8) {
    strengthOfText = "Fraca";
    barsToPaint = 2;
    colorClass = "bar--weak";
  } else if (lengthSlider >= 8 && lengthSlider < 12) {
    strengthOfText = "Média";
    barsToPaint = 3;
    colorClass = "bar--average";
  } else if (lengthSlider >= 12) {
    strengthOfText = "Forte";
    barsToPaint = 4;
    colorClass = "bar--strong";
  }

  for (let i = 0; i < strengthBars.length; i++) {
    // remove qualquer classe que a barra possa ter ganhado antes
    strengthBars[i].classList.remove(
      "bar--very-weak",
      "bar--weak",
      "bar--average",
      "bar--strong",
    );

    // se a barra atual deve ser pintada, adiciona a classe da vez
    if (i < barsToPaint) {
      strengthBars[i].classList.add(colorClass);
    }
  }

  strengthText.textContent = strengthOfText;
  strengthText.classList.remove("hidden");
}

slider.addEventListener("input", updateSliderProgress);
updateSliderProgress();
