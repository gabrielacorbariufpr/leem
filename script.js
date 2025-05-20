document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "1. A tecnologia educacional utilizada proporcionou uma boa usabilidade?",
    "2. Você se sentiu motivado(a) ao utilizar esta tecnologia?",
    "3. As funcionalidades da tecnologia atenderam suas necessidades?",
    "4. A navegação dentro da tecnologia foi clara e intuitiva?",
    "5. Você encontrou barreiras ou dificuldades técnicas durante o uso?",
    "6. O design da interface facilitou sua interação com a tecnologia?",
    "7. A tecnologia contribuiu para o seu aprendizado?",
    "8. A linguagem utilizada na tecnologia foi adequada e compreensível?",
    "9. Você se sentiu engajado(a) ao utilizar essa tecnologia?",
    "10. A tecnologia promoveu a sua autonomia no processo de aprendizagem?",
    "11. Você indicaria essa tecnologia para outros estudantes?"
  ];

  let currentQuestion = 0;
  let xp = 0;
  const answers = Array(questions.length).fill("");

  const container = document.getElementById("question-container");
  const charCount = document.getElementById("charCount");
  const progressBar = document.getElementById("progressBar");
  const xpDisplay = document.getElementById("xp");

  function loadQuestion(index) {
    container.innerHTML = `
      <div class="question-card">
        <h2>${questions[index]}</h2>
        <textarea id="answer" maxlength="300" placeholder="Digite sua resposta aqui...">${answers[index]}</textarea>
      </div>
    `;
    document.getElementById("answer").addEventListener("input", updateCharCount);
    updateCharCount();
    updateProgressBar();
    updateXP();
  }

  function updateCharCount() {
    const length = document.getElementById("answer").value.length;
    charCount.textContent = \`\${length}/300 caracteres\`;
  }

  function updateProgressBar() {
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = \`\${percentage}%\`;
  }

  function updateXP() {
    xpDisplay.textContent = xp;
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    const response = document.getElementById("answer").value.trim();
    answers[currentQuestion] = response;
    if (response.length > 0) {
      if (currentQuestion < questions.length - 1) {
        xp += 10;
        currentQuestion++;
        loadQuestion(currentQuestion);
      } else {
        window.location.href = "leem-finalizacao-dinamica.html";
      }
    } else {
      alert("Por favor, escreva uma resposta antes de continuar.");
    }
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    const response = document.getElementById("answer").value.trim();
    answers[currentQuestion] = response;
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion(currentQuestion);
    }
  });

  loadQuestion(currentQuestion);
});
