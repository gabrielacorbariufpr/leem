
let xp = 0;
let seconds = 0;
let timerInterval;

window.onload = function() {
    startTimer();
    document.getElementById("answer").addEventListener("input", handleInput);
}

function handleInput(e) {
    const texto = e.target.value;
    const charCount = texto.length;
    const charLimit = 300;

    document.getElementById("charCount").innerText = charCount;

    const xpAtual = Math.floor(charCount / 20) * 15;
    if (xpAtual !== xp) {
        if (xpAtual > xp) {
            showXpNotification(`🎉 Parabéns! Você ganhou +${xpAtual - xp} XP!`);
        } else {
            showXpNotification(`💔 Que triste! Você perdeu ${xp - xpAtual} XP.`);
        }
        xp = xpAtual;
        document.getElementById("xp").innerText = xp;
    }
}

function showXpNotification(msg) {
    const notifier = document.getElementById("xp-notifier");
    notifier.innerText = msg;
    notifier.style.display = 'block';
    notifier.style.opacity = '1';
    setTimeout(() => {
        notifier.style.opacity = '0';
        setTimeout(() => notifier.style.display = 'none', 500);
    }, 1500);
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById('timer').innerText = `${mins}:${secs}`;
    }, 1000);
}

function nextStep() {
    alert("Etapa concluída!");
}
