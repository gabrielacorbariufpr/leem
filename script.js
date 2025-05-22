
const perguntas = [
  "Todos os integrantes do grupo participaram ativamente? Comente.",
  "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
  "Qual foi a sua contribuição para a atividade? Comente.",
  "Você contribuiu com ideias próprias (foi autêntico) na realização das atividades do projeto? Comente.",
  "Você já fez alguma atividade como essa realizada? Se sim, dê exemplos.",
  "Você se sentiu responsável/envolvido durante a realização da atividade? Comente.",
  "O grupo enfrentou desafios? Quais?",
  "O que você aprendeu durante essa atividade?",
  "Quais sugestões você daria para melhorar essa atividade?",
  "Deixe um comentário geral sobre sua experiência."
];

let etapaAtual = 0;
let xp = 0;
let tempo = 0;
let intervaloTempo;

const xpSpan = document.getElementById('xp');
const tempoSpan = document.getElementById('tempo');

function iniciar() {
  carregarPergunta();
  intervaloTempo = setInterval(() => {
    tempo++;
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    tempoSpan.textContent = `${minutos}:${segundos}`;
  }, 1000);
}

function carregarPergunta() {
  document.getElementById('telaPergunta').style.display = 'block';
  document.getElementById('telaPercurso').style.display = 'none';

  const perguntaTexto = perguntas[etapaAtual];
  document.getElementById('perguntaNumero').textContent = `Etapa ${etapaAtual + 1}:`;
  document.getElementById('perguntaTexto').textContent = perguntaTexto;
  document.getElementById('resposta').value = '';
  atualizarContador();
}

function concluirEtapa() {
  const resposta = document.getElementById('resposta').value;
  const caracteres = resposta.length;
  const xpGanhos = Math.floor(caracteres / 20) * 15;

  xp += xpGanhos;
  xpSpan.textContent = xp;

  mostrarNotificacao(`🎉 Você ganhou +${xpGanhos} XP!`);

  etapaAtual++;

  if (etapaAtual < perguntas.length) {
    mostrarTelaPercurso();
  } else {
    clearInterval(intervaloTempo);
    alert('Parabéns! Você concluiu todas as etapas.');
  }
}

function atualizarContador() {
  const resposta = document.getElementById('resposta').value;
  document.getElementById('contadorCaracteres').textContent = `${resposta.length}/300 caracteres`;
}

document.getElementById('resposta').addEventListener('input', atualizarContador);

function mostrarTelaPercurso() {
  document.getElementById('telaPergunta').style.display = 'none';
  document.getElementById('telaPercurso').style.display = 'block';

  const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
  const segundos = String(tempo % 60).padStart(2, '0');
  document.getElementById('tempoPercurso').textContent = `${minutos}:${segundos}`;
  document.getElementById('xpPercurso').textContent = xp;
  document.getElementById('etapaAtualPercurso').textContent = etapaAtual;
  document.getElementById('totalEtapasPercurso').textContent = perguntas.length;

  const percentual = (etapaAtual / perguntas.length) * 100;
  document.getElementById('progressoPreenchido').style.width = percentual + '%';
}

document.getElementById('botaoAvancar').addEventListener('click', () => {
  carregarPergunta();
});

function mostrarNotificacao(mensagem) {
  const notificacao = document.getElementById('notificacao');
  notificacao.textContent = mensagem;
  notificacao.classList.add('ativo');
  setTimeout(() => {
    notificacao.classList.remove('ativo');
  }, 4000);
}

window.onload = iniciar;
