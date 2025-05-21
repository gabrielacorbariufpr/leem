
let xp = 0;
let segundos = 0;
let minutos = 0;

const resposta = document.getElementById('resposta');
const charCount = document.getElementById('charCount');
const xpDisplay = document.getElementById('xp');
const tempoDisplay = document.getElementById('tempo');
const notifier = document.getElementById('xp-notifier');

resposta.addEventListener('input', () => {
    const length = resposta.value.length;
    charCount.textContent = length;
    const novoXP = Math.floor(length / 20) * 15;
    if (novoXP > xp) {
        showNotifier(`🎉 Parabéns! Você ganhou ${novoXP - xp} XP!`, 'ganho');
    } else if (novoXP < xp) {
        showNotifier(`💔 Que triste! Você perdeu ${xp - novoXP} XP.`, 'perda');
    }
    xp = novoXP;
    xpDisplay.textContent = xp;
});

setInterval(() => {
    segundos++;
    if (segundos === 60) {
        minutos++;
        segundos = 0;
    }
    tempoDisplay.textContent = (minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
}, 1000);

function showNotifier(msg, tipo) {
    notifier.textContent = msg;
    notifier.className = 'notifier ' + (tipo === 'perda' ? 'perda' : '');
    notifier.style.display = 'block';
    setTimeout(() => {
        notifier.style.display = 'none';
    }, 2000);
}
