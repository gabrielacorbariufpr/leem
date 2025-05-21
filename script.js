
let contador = document.getElementById('contador-caracteres');
let resposta = document.getElementById('resposta');
let xp = 0;
let cronometroEl = document.getElementById('cronometro');

resposta.addEventListener('input', () => {
    contador.textContent = resposta.value.length;
    calcularXP(resposta.value.length);
});

function calcularXP(chars) {
    xp = Math.floor(chars / 50) * 15;
    document.getElementById('xp').textContent = xp;
}

let segundos = 0;
setInterval(() => {
    segundos++;
    const min = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    cronometroEl.textContent = `${min}:${seg}`;
}, 1000);
