const perguntas = [
  "Todos os integrantes do grupo participaram ativamente? Comente.",
  "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
  "Qual foi a sua contribuição para a atividade? Comente.",
  "Você contribuiu com ideias próprias (foi autêntico) na realização das atividades do projeto? Comente.",
  "Você já fez alguma atividade como essa realizada? Se sim, dê exemplos.",
  "Você se sentiu responsável/envolvido durante a realização da atividade? Comente.",
  "Você sente que essa atividade incentivou o uso de TDICs em sua vida? Comente.",
  "A atividade gerou novos desafios ou você permaneceu na sua zona de conforto? Comente.",
  "Você acha que o aprendizado alcançado na atividade realizada te ajudará em situações de sua vida? Comente.",
  "Você achou a atividade interessante, estimulante ou instigante? Comente.",
  "Você sente que a atividade tem relação com os conceitos/assuntos que você já tinha aprendido? Comente."
];

let perguntaAtual = 0;
let xp = 0;
let tempo = 0;
let timer;
const respostas = [];
const xpPorPergunta = [];

function iniciar() {
  carregarPergunta();
  timer = setInterval(() => {
    tempo++;
    document.getElementById('tempo').innerText = formatarTempo(tempo);
  }, 1000);
}

function carregarPergunta() {
  document.getElementById('perguntaNumero').innerText = `Etapa ${perguntaAtual + 1}:`;
  document.getElementById('perguntaTexto').innerText = perguntas[perguntaAtual];
  document.getElementById('resposta').value = '';
  document.getElementById('contadorCaracteres').innerText = '0';
}

document.getElementById('resposta').addEventListener('input', (e) => {
  const texto = e.target.value;
  const count = texto.length;
  document.getElementById('contadorCaracteres').innerText = count;

  const xpDigitado = Math.floor(count / 20) * 15;
  const xpAnterior = xpPorPergunta[perguntaAtual] || 0;
  const diff = xpDigitado - xpAnterior;

  if (diff > 0) {
    mostrarNotificacao(`🎉 Parabéns! Você ganhou +${diff} XP!`, 'ganho');
  } else if (diff < 0) {
    mostrarNotificacao(`💔 Que triste! Você perdeu ${-diff} XP.`, 'perda');
  }

  xp += diff;
  xpPorPergunta[perguntaAtual] = xpDigitado;
  document.getElementById('xp').innerText = xp;
});

function proximaPergunta() {
  const resposta = document.getElementById('resposta').value.trim();
  respostas.push(resposta);

  if (perguntaAtual < perguntas.length - 1) {
    perguntaAtual++;
    carregarPergunta();
  } else {
    clearInterval(timer);
    alert(`Missão concluída!\nXP final: ${xp}\nTempo: ${formatarTempo(tempo)}`);
    window.location.href = "leem-finalizacao-dinamica.html";
  }
}

function formatarTempo(segundos) {
  const m = String(Math.floor(segundos / 60)).padStart(2, '0');
  const s = String(segundos % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function mostrarNotificacao(texto, tipo) {
  const notifier = document.getElementById('xp-notifier');
  notifier.innerText = texto;
  notifier.className = tipo;
  notifier.style.display = 'block';
  notifier.style.opacity = '1';

  setTimeout(() => {
    notifier.style.opacity = '0';
    setTimeout(() => notifier.style.display = 'none', 500);
  }, 2000);
}

window.onload = iniciar;
