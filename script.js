let xp = 0;
let charCount = 0;

// Cronômetro
let segundos = 0;
const cronometro = document.getElementById('cronometro');
setInterval(() => {
    segundos++;
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    cronometro.textContent = `${min}:${seg}`;
}, 1000);

// Função para mostrar notificação de XP
function showXpNotification(mensagem, tipo) {
    let notifier = document.getElementById('xp-notifier');
    if (!notifier) {
        notifier = document.createElement('div');
        notifier.id = 'xp-notifier';
        notifier.style.position = 'fixed';
        notifier.style.top = '20px';
        notifier.style.left = '50%';
        notifier.style.transform = 'translateX(-50%)';
        notifier.style.padding = '10px 20px';
        notifier.style.color = 'white';
        notifier.style.borderRadius = '10px';
        notifier.style.fontWeight = 'bold';
        notifier.style.zIndex = '9999';
        document.body.appendChild(notifier);
    }

    notifier.innerText = mensagem;
    notifier.style.backgroundColor = tipo === 'ganho' ? '#28a745' : '#dc3545';
    notifier.style.display = 'block';
    notifier.style.opacity = '1';

    setTimeout(() => {
        notifier.style.opacity = '0';
        setTimeout(() => notifier.style.display = 'none', 500);
    }, 1500);
}

// Função para calcular XP
const textarea = document.getElementById('resposta');
const charCountSpan = document.getElementById('charCount');
const xpSpan = document.getElementById('xp');

textarea.addEventListener('input', () => {
    const texto = textarea.value;
    const count = texto.length;
    charCountSpan.innerText = count;

    const novoXp = Math.floor(count / 20) * 15;

    if (novoXp !== xp) {
        if (novoXp > xp) {
            showXpNotification(`🎉 Parabéns! Você ganhou +${novoXp - xp} XP!`, 'ganho');
        } else {
            showXpNotification(`💔 Que triste! Você perdeu ${xp - novoXp} XP.`, 'perda');
        }

        xp = novoXp;
        xpSpan.innerText = xp;
    }
});
