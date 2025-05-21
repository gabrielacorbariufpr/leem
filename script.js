const questions = [
  "Descreva sua percepção sobre a usabilidade da tecnologia utilizada.",
  "Quais foram os pontos positivos dessa experiência?",
  "O que você acha que poderia ser melhorado?",
  "A experiência contribuiu para seu aprendizado?",
  "Quão satisfeito você ficou com a atividade realizada?",
  "Você encontrou alguma dificuldade durante a atividade?",
  "A proposta foi atrativa e motivadora?",
  "Quais sugestões você deixaria para melhorar a experiência?",
  "Se você pudesse resumir essa experiência em uma palavra, qual seria?",
  "O quanto essa tecnologia favoreceu seu desenvolvimento?",
  "Deixe um comentário final sobre sua experiência."
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

// Input XP
function handleInput(e) {
  const texto = e.target.value;
  document.getElementById("charCount").innerText = texto.length;

  const xpAtual = Math.floor(texto.length / 20) * 15;
  if (xpAtual !== xp) {
    if (xpAtual > xp) {
      showXpNotification(`+${xpAtual - xp} XP`, 'ganho');
    } else {
      showXpNotification(`Que triste! Você perdeu ${xp - xpAtual} XP`, 'perda');
    }
    xp = xpAtual;
    document.getElementById("xp").innerText = xp;
  }
}

// XP Notifier
function showXpNotification(msg, tipo) {
  const notifier = document.getElementById("xp-notifier");
  notifier.innerText = msg;
  notifier.className = tipo;
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

// Barra de progresso
function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;
}

// Inicializar
renderQuestion();
startTimer();
