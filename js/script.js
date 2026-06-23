const sizeValue = document.getElementById("size-value");
const slider = document.getElementById("password-length");

function updateSliderProgress() {
  const val = Number(slider.value);
  const min = Number(slider.min);
  const max = Number(slider.max);

  const progressPercentage = ((val - min) / (max - min)) * 100;

  // atualiza a variável CSS diretamente no elemento do slider
  slider.style.setProperty("--slider-progress", `${progressPercentage}%`);

  sizeValue.textContent = val;
}

slider.addEventListener("input", updateSliderProgress);

// executa a função uma vez no início
// garante que o preenchimento esteja correto quando a página carregar
updateSliderProgress();
