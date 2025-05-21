
let xpAtual = 0;
const xpPorPergunta = 15;
const totalPerguntas = 11;
let perguntaAtual = 0;

const xpPopup = document.createElement('div');
xpPopup.className = 'xp-popup';
document.body.appendChild(xpPopup);

const etapaConcluida = document.createElement('div');
etapaConcluida.className = 'etapa-concluida';
etapaConcluida.innerHTML = `
  <h2>✅ Etapa Concluída!</h2>
  <div class="ovo-container"><img id="ovoImg" src="ovo1.png" alt="Ovo"></div>
  <div class="progress-bar"><div id="progressFill" class="progress-fill"></div></div>
  <p id="xpDisplay">XP: 0</p>
  <button id="btnProximaEtapa">Próxima Etapa ▶️</button>
`;
document.body.appendChild(etapaConcluida);

document.getElementById('btnProximaEtapa').onclick = () => {
  etapaConcluida.style.display = 'none';
  perguntaAtual++;
  atualizarOvo();
};

function mostrarPopupXP() {
  xpAtual += xpPorPergunta;
  xpPopup.innerText = `+${xpPorPergunta} XP 🪙`;
  xpPopup.style.display = 'block';
  setTimeout(() => {
    xpPopup.style.display = 'none';
  }, 20000);
}

function mostrarEtapaConcluida() {
  etapaConcluida.style.display = 'block';
  document.getElementById('xpDisplay').innerText = `XP: ${xpAtual}`;
  const progresso = Math.min(((perguntaAtual + 1) / totalPerguntas) * 100, 100);
  document.getElementById('progressFill').style.width = progresso + '%';
}

function atualizarOvo() {
  const ovoImg = document.getElementById('ovoImg');
  if (xpAtual < 60) ovoImg.src = 'ovo1.png';
  else if (xpAtual < 150) ovoImg.src = 'ovo2.png';
  else if (xpAtual < 250) ovoImg.src = 'ovo3.png';
  else ovoImg.src = 'dino.png';
}
