
const perguntas = [
    "01. Todos os integrantes do grupo participaram ativamente? Comente.",
    "02. Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
    "03. Qual foi a sua contribuição para a atividade? Comente.",
    "04. Você contribuiu com ideias próprias (foi autêntico) na realização das atividades do projeto? Comente.",
    "05. Você já fez alguma atividade como essa realizada? Se sim, dê exemplos.",
    "06. Você se sentiu responsável/envolvido durante a realização da atividade? Comente.",
    "07. Você sente que essa atividade incentivou o uso de TDICs em sua vida? Comente.",
    "08. A atividade gerou novos desafios ou você permaneceu na sua zona de conforto? Comente.",
    "09. Você acha que o aprendizado alcançado na atividade realizada te ajudará em situações de sua vida? Comente.",
    "10. Você achou a atividade interessante, estimulante ou instigante? Comente.",
    "11. Você sente que a atividade tem relação com os conceitos/assuntos que você já tinha aprendido? Comente."
];

let perguntaAtual = 0;
let xp = 0;
const xpPorPergunta = 15;

const questionContainer = document.getElementById('question-container');
const progressScreen = document.getElementById('progress-screen');
const xpDisplay = document.getElementById('xp-display');
const progressFill = document.getElementById('progress-fill');
const nextStage = document.getElementById('next-stage');

function carregarPergunta() {
    questionContainer.innerHTML = `
        <div class="question-card">
            <p><strong>${perguntas[perguntaAtual]}</strong></p>
            <textarea placeholder="Digite sua resposta..."></textarea>
            <div style="margin-top: 1rem;">
                <button onclick="concluirPergunta()">Concluir Etapa</button>
            </div>
        </div>
    `;
    questionContainer.classList.remove('hidden');
    progressScreen.classList.add('hidden');
}

function concluirPergunta() {
    xp += xpPorPergunta;
    xpDisplay.textContent = `XP acumulado: ${xp}`;
    const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
    progressFill.style.width = progresso + '%';

    questionContainer.classList.add('hidden');
    progressScreen.classList.remove('hidden');
}

nextStage.addEventListener('click', () => {
    perguntaAtual++;
    if (perguntaAtual >= perguntas.length) {
        window.location.href = "leem-finalizacao-dinamica.html";
    } else {
        carregarPergunta();
    }
});

// Inicializar
carregarPergunta();
