// Perguntas
const questions = [
  "A tecnologia educacional utilizada proporcionou uma boa usabilidade?",
  "Quais pontos você considera positivos nesta experiência?",
  "O que poderia ser melhorado?",
  // [... até a 11ª pergunta]
];

let currentQuestion = 0;
let xp = 0;
let timer = 0;
let interval;

// Cronômetro
function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');
    document.getElementById("timer").innerText = `${minutes}:${seconds}`;
  }, 1000);
}

// Renderizar pergunta
function renderQuestion() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <div class="pergunta">
      ${currentQuestion + 1}. ${questions[currentQuestion]}
    </div>
    <textarea id="resposta" placeholder="Digite sua resposta aqui..."></textarea>
  `;

  document.getElementById("resposta").addEventListener("input", handleInput);
  updateProgress();
}

function handleInput(e) {
  const texto = e.target.value;
  document.getElementById("charCount").innerText = texto.length;

  const xpAtual = Math.floor(texto.length / 20) * 15;
  if (xpAtual !== xp) {
    showXpNotification(xpAtual > xp ? `+${xpAtual - xp} XP` : `-${xp - xpAtual} XP`);
    xp = xpAtual;
    document.getElementById("xp").innerText = xp;
  }
}

// Notificação de XP
function showXpNotification(msg) {
  const notifier = document.getElementById("xp-notifier");
  notifier.innerText = `Você ganhou ${msg}!`;
  notifier.style.display = 'block';
  notifier.style.opacity = '1';
  setTimeout(() => {
    notifier.style.opacity = '0';
    setTimeout(() => notifier.style.display = 'none', 500);
  }, 1500);
}

// Navegação
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    clearInterval(interval);
    window.location.href = 'leem-finalizacao-dinamica.html';
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
});

// Barra de progresso
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

// Inicializar
renderQuestion();
startTimer();// JavaScript atualizado
