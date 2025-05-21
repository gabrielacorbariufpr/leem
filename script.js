
const perguntas = [
    "01. Todos os integrantes do grupo participaram ativamente? Comente.",
    "02. Você já havia vivenciado alguma situação semelhante? Comente.",
    "03. Qual foi sua contribuição? Comente.",
    "04. Você trouxe ideias próprias? Comente.",
    "05. Já fez atividade semelhante? Exemplifique.",
    "06. Sentiu-se responsável/envolvido? Comente.",
    "07. A atividade incentivou uso de TDICs? Comente.",
    "08. Trouxe novos desafios ou ficou na zona de conforto? Comente.",
    "09. Aprendizado te ajudará no futuro? Comente.",
    "10. A atividade foi interessante/estimulante? Comente.",
    "11. A atividade se relaciona com conhecimentos prévios? Comente."
];

let etapa = 0;
let tempo = 0;
let xpTotal = 0;
let caracteresAnteriores = 0;

setInterval(() => {
    tempo++;
    const min = String(Math.floor(tempo / 60)).padStart(2, '0');
    const seg = String(tempo % 60).padStart(2, '0');
    document.getElementById('tempo').textContent = `⏳ ${min}:${seg}`;
}, 1000);

const resposta = document.getElementById('resposta');
const contador = document.getElementById('contador-caracteres');
const progressoMissao = document.getElementById('progresso-missao');
const notificacao = document.getElementById('notificacao');
const xpSpan = document.getElementById('xpTotal');

function atualizarPergunta() {
    document.getElementById('pergunta-box').innerHTML = `<h2>${perguntas[etapa]}</h2>`;
    resposta.value = '';
    contador.textContent = '0 / 500';
    caracteresAnteriores = 0;
    atualizarProgresso();
}

function atualizarProgresso() {
    const progresso = ((etapa) / perguntas.length) * 100;
    progressoMissao.style.width = progresso + '%';
}

resposta.addEventListener('input', () => {
    const total = resposta.value.length;
    contador.textContent = `${total} / 500`;

    const diff = total - caracteresAnteriores;
    if (diff > 0) {
        xpTotal += diff;
        mostrarNotificacao(`Parabéns! Você ganhou +${diff} XP`);
    } else if (diff < 0) {
        xpTotal += diff;
        mostrarNotificacao(`Triste... Você perdeu ${diff} XP`);
    }
    caracteresAnteriores = total;
    xpSpan.textContent = `⭐ ${xpTotal} XP`;
});

document.getElementById('btnAvancar').addEventListener('click', () => {
    if (etapa < perguntas.length - 1) {
        etapa++;
        atualizarPergunta();
    } else {
        window.location.href = 'leem-finalizacao-dinamica.html';
    }
});

document.getElementById('btnVoltar').addEventListener('click', () => {
    if (etapa > 0) {
        etapa--;
        atualizarPergunta();
    }
});

function mostrarNotificacao(texto) {
    notificacao.textContent = texto;
    notificacao.style.display = 'block';
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

atualizarPergunta();
