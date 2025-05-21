let contador = 0;
let xpTotal = 0;
let tempo = 0;

// Tempo
setInterval(() => {
    tempo++;
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    document.getElementById('tempo').textContent = `${minutos}:${segundos}`;
}, 1000);

// Contagem de caracteres e XP
const resposta = document.getElementById('resposta');
const contadorCaracteres = document.getElementById('contador-caracteres');
const barraProgresso = document.getElementById('barra-progresso');
const xpTotalElemento = document.getElementById('xpTotal');

resposta.addEventListener('input', () => {
    const total = resposta.value.length;
    contadorCaracteres.textContent = `${total} / 500`;

    const progresso = Math.min((total / 500) * 100, 100);
    barraProgresso.style.width = `${progresso}%`;

    let xp = Math.floor(total / 20) * 15;
    xpTotal = xp;
    xpTotalElemento.textContent = `${xpTotal} XP`;
});
