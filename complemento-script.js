
let xp = 0;
let caracteresDigitados = 0;
let tempo = 0;
const xpSpan = document.getElementById('xp');
const tempoSpan = document.getElementById('tempo');
const resposta = document.getElementById('resposta');
const notificacao = document.getElementById('notificacao');
const contador = document.querySelector('.contador');

setInterval(() => {
    tempo++;
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    tempoSpan.textContent = `${minutos}:${segundos}`;
}, 1000);

resposta.addEventListener('input', () => {
    const chars = resposta.value.length;
    contador.textContent = `${chars}/500`;
    const diff = chars - caracteresDigitados;

    if (diff >= 20) {
        xp += 15;
        showNotificacao('Parabéns! Você ganhou 15 XP', 'green');
        caracteresDigitados += 20;
    } else if (diff <= -20) {
        xp = Math.max(0, xp - 15);
        showNotificacao('Triste! Você perdeu 15 XP', 'red');
        caracteresDigitados -= 20;
    }
    xpSpan.textContent = `${xp} XP`;
});

function showNotificacao(msg, cor) {
    notificacao.textContent = msg;
    notificacao.style.background = cor === 'green' ? '#4caf50' : '#f44336';
    notificacao.classList.remove('oculto');
    setTimeout(() => notificacao.classList.add('oculto'), 20000);
}
