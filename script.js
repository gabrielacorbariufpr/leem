
const perguntas = [
  "01. Todos os integrantes do grupo participaram ativamente? Comente.",
  "02. Você já havia vivenciado alguma situação semelhante? Comente.",
  "03. Qual foi a sua contribuição para a atividade? Comente.",
  "04. Você contribuiu com ideias próprias? Comente.",
  "05. Você já fez atividade como essa? Comente.",
  "06. Você se sentiu responsável durante a atividade? Comente.",
  "07. A atividade incentivou o uso de TDICs? Comente.",
  "08. Gerou novos desafios ou ficou na zona de conforto? Comente.",
  "09. O aprendizado te ajudará no futuro? Comente.",
  "10. A atividade foi interessante e instigante? Comente.",
  "11. A atividade se relaciona com seus conhecimentos prévios? Comente."
];

let perguntaAtual = 0;
let xp = 0;
const xpPorPergunta = 15;

const questionario = document.getElementById('questionario');
const xpPopup = document.getElementById('xp-popup');
const xpDisplay = document.getElementById('xp');
const progressInner = document.getElementById('progress-inner');
const etapaPopup = document.getElementById('etapa-concluida');
const ovoImg = document.getElementById('ovo-img');

function atualizarPergunta() {
  questionario.innerHTML = `
    <div>
      <p><strong>${perguntas[perguntaAtual]}</strong></p>
      <textarea placeholder="Digite sua resposta..."></textarea>
    </div>
  `;
}

function mostrarPopupXP() {
  xpPopup.style.display = 'block';
  setTimeout(() => {
    xpPopup.style.display = 'none';
  }, 20000);
}

function atualizarProgresso() {
  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
  progressInner.style.width = progresso + '%';

  if (xp < 60) ovoImg.src = 'ovo1.png';
  else if (xp < 150) ovoImg.src = 'ovo2.png';
  else if (xp < 250) ovoImg.src = 'ovo3.png';
  else ovoImg.src = 'dino.png';
}

document.getElementById('avancar').addEventListener('click', () => {
  xp += xpPorPergunta;
  xpDisplay.textContent = xp + ' XP';
  mostrarPopupXP();
  etapaPopup.classList.remove('hidden');
});

document.getElementById('proxima-etapa').addEventListener('click', () => {
  perguntaAtual++;
  etapaPopup.classList.add('hidden');

  if (perguntaAtual >= perguntas.length) {
    window.location.href = 'leem-finalizacao-dinamica.html';
  } else {
    atualizarPergunta();
    atualizarProgresso();
  }
});

document.getElementById('voltar').addEventListener('click', () => {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    atualizarPergunta();
    atualizarProgresso();
  }
});

// Inicializar
atualizarPergunta();
atualizarProgresso();
