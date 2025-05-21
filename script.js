
const questions = [
    "Todos os integrantes do grupo participaram ativamente? Comente.",
    "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
    "Qual foi a sua contribuição para a atividade? Comente.",
    "Você contribuiu com ideias próprias (foi autêntico) na realização das atividades do projeto? Comente.",
    "Você já fez alguma atividade como essa realizada? Se sim, dê exemplos.",
    "Você se sentiu responsável/envolvido durante a realização da atividade? Comente.",
    "Você sente que essa atividade incentivou o uso de TDICs em sua vida? Comente.",
    "A atividade gerou novos desafios ou você permaneceu na sua zona de conforto? Comente.",
    "Você acha que o aprendizado alcançado na atividade realizada te ajudará em situações de sua vida? Comente.",
    "Você achou a atividade interessante, estimulante ou instigante? Comente.",
    "Você sente que a atividade tem relação com os conceitos/assuntos que você já tinha aprendido? Comente."
];

let currentQuestion = 0;
let xp = 0;

const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const xpDisplay = document.getElementById('xp-display');

function renderQuestion() {
    questionContainer.innerHTML = `
        <div class="question-card">
            <strong>${(currentQuestion + 1).toString().padStart(2, '0')}.</strong> ${questions[currentQuestion]}
            <textarea id="response"></textarea>
        </div>
    `;
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    xpDisplay.textContent = `⭐ ${xp} XP acumulado`;
}

document.getElementById('nextBtn').addEventListener('click', () => {
    const text = document.getElementById('response').value.trim();
    if (text.length > 0) {
        xp += Math.min(50, text.length / 10);
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        window.location.href = 'leem-finalizacao-dinamica.html';
    }
});

document.getElementById('backBtn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
});

renderQuestion();
