
const perguntas = [
  "Todos os integrantes do grupo participaram ativamente? Comente.",
  "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
  "Qual foi a sua contribuição para a atividade? Comente.",
  "Você contribuiu com ideias próprias na realização das atividades do projeto? Comente.",
  "Você já fez alguma atividade como essa? Se sim, dê exemplos.",
  "Você se sentiu responsável/envolvido durante a atividade? Comente.",
  "O grupo enfrentou desafios? Quais?",
  "O que você aprendeu durante essa atividade?",
  "Quais sugestões você daria para melhorar essa atividade?",
  "Deixe um comentário geral sobre sua experiência."
];

let etapaAtual = 0;
let xp = 0;
let tempo = 0;
let intervaloTempo;
let caracteresAnteriores = 0;

const xpSpan = document.getElementById('xp');
const tempoSpan = document.getElementById('tempo');
const perguntaNumero = document.getElementById('perguntaNumero');
const perguntaTexto = document.getElementById('perguntaTexto');
const resposta = document.getElementById('resposta');
const contador = document.getElementById('contadorCaracteres');
const telaPergunta = document.getElementById('telaPergunta');
const telaPercurso = document.getElementById('telaPercurso');
const xpPercurso = document.getElementById('xpPercurso');
const tempoPercurso = document.getElementById('tempoPercurso');
const etapaAtualPercurso = document.getElementById('etapaAtualPercurso');
const totalEtapas = perguntas.length;
const botaoProxima = document.getElementById('botaoProxima');

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
  perguntaNumero.textContent = `Pergunta ${etapaAtual + 1}`;
  perguntaTexto.textContent = perguntas[etapaAtual];
  resposta.value = '';
  contador.textContent = '0/500 caracteres';
}

resposta.addEventListener('input', () => {
  const caracteres = resposta.value.length;
  contador.textContent = `${caracteres}/500 caracteres`;

  const diff = caracteres - caracteresAnteriores;
  if (diff >= 20) {
    xp += 15;
    caracteresAnteriores += 20;
  } else if (diff <= -20) {
    xp = Math.max(0, xp - 15);
    caracteresAnteriores -= 20;
  }
  xpSpan.textContent = xp;
});

document.getElementById('botaoConcluir').addEventListener('click', () => {
  etapaAtual++;
  if (etapaAtual < perguntas.length) {
    mostrarTelaPercurso();
  } else {
    alert('Parabéns! Você concluiu todas as etapas.');
    clearInterval(intervaloTempo);
  }
});

botaoProxima.addEventListener('click', () => {
  esconderTelaPercurso();
  carregarPergunta();
});

function mostrarTelaPercurso() {
  telaPergunta.style.display = 'none';
  telaPercurso.style.display = 'block';
  xpPercurso.textContent = xp;
  tempoPercurso.textContent = tempoSpan.textContent;
  etapaAtualPercurso.textContent = etapaAtual;
}

function esconderTelaPercurso() {
  telaPergunta.style.display = 'block';
  telaPercurso.style.display = 'none';
}

iniciar();
