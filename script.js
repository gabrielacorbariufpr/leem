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
  const xpPerBlock = 15;
  const charBlock = 20;
  const answers = Array(questions.length).fill("");
  const container = document.getElementById("question-container");
  const progressBar = document.getElementById("progressBar");
  const xpDisplay = document.getElementById("xp");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const xpNotifier = document.getElementById("xp-notifier");

  function loadQuestion(index) {
    if (!container) return;
    const currentAnswer = answers[index] || "";
    const charCount = currentAnswer.length;
    const charColor = charCount >= 300 ? "red" : "#333";

    container.innerHTML = `
      <div class="question-card">
        <h2>${questions[index]}</h2>
        <textarea id="answer" maxlength="300" placeholder="Digite sua resposta aqui...">${currentAnswer}</textarea>
        <div id="charCount" class="char-counter" style="color: ${charColor};">${charCount}/300 caracteres</div>
      </div>
    `;

    const answerField = document.getElementById("answer");
    if (answerField) {
      answerField.addEventListener("input", (e) => {
        const newLength = e.target.value.length;
        const oldLength = answers[currentQuestion].length;
        answers[currentQuestion] = e.target.value;

        const oldBlocks = Math.floor(oldLength / charBlock);
        const newBlocks = Math.floor(newLength / charBlock);
        const diff = newBlocks - oldBlocks;
        if (diff !== 0) updateXP(diff * xpPerBlock);

        const charCounter = document.getElementById("charCount");
        if (charCounter) {
          charCounter.textContent = newLength + "/300 caracteres";
          charCounter.style.color = newLength >= 300 ? "red" : "#333";
        }
      });
    }

    updateProgressBar();
    updateXP(0);
    prevBtn.style.display = index === 0 ? "none" : "inline-block";
  }

  function updateProgressBar() {
    if (progressBar) {
      const percentage = ((currentQuestion + 1) / questions.length) * 100;
      progressBar.style.width = percentage + "%";
    }
  }

  function updateXP(amount) {
    xp += amount;
    if (xp < 0) xp = 0;
    if (xpDisplay) xpDisplay.textContent = xp;
    if (amount !== 0 && xpNotifier) {
      xpNotifier.textContent = amount > 0 ? `🎉 Você ganhou +${amount} XP!` : `⚠️ Você perdeu ${amount} XP!`;
      xpNotifier.style.backgroundColor = amount > 0 ? "#28a745" : "#c0392b";
      xpNotifier.classList.add("show");
      setTimeout(() => xpNotifier.classList.remove("show"), 1200);
    }
  }

  nextBtn.addEventListener("click", () => {
    const answer = document.getElementById("answer");
    if (answer) {
      const response = answer.value.trim();
      answers[currentQuestion] = response;
      if (response.length > 0) {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          loadQuestion(currentQuestion);
        } else {
          window.location.href = "leem-finalizacao-dinamica.html";
        }
      } else {
        alert("Por favor, escreva uma resposta antes de continuar.");
      }
    }
  });

  prevBtn.addEventListener("click", () => {
    const answer = document.getElementById("answer");
    if (answer) {
      answers[currentQuestion] = answer.value.trim();
      if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
      }
    }
  });

  loadQuestion(currentQuestion);
});
