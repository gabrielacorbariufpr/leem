
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

let totalXP = 0;
const pointsPerQuestion = 15;
const answered = Array(questions.length).fill(false);

const container = document.getElementById('questions-container');
const progressFill = document.querySelector('.progress-fill');
const pointsText = document.querySelector('.points');

function updateProgress() {
  const completed = answered.filter(x => x).length;
  const percent = (completed / questions.length) * 100;
  progressFill.style.width = percent + '%';
  pointsText.innerHTML = `⭐ ${completed * pointsPerQuestion} XP acumulado`;
}

questions.forEach((q, i) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `
    <label for="q${i}"><strong>${(i+1).toString().padStart(2, '0')}.</strong> ${q}</label>
    <textarea id="q${i}" rows="3" maxlength="500" placeholder="Digite sua resposta (máx. 500 caracteres)"></textarea>
    <div class="char-limit" id="char${i}">0 / 500</div>
    <div class="points-msg" id="points${i}"></div>
  `;
  div.addEventListener('click', () => {
    document.querySelectorAll('.question').forEach(el => el.classList.remove('active'));
    div.classList.add('active');
  });

  container.appendChild(div);

  const textarea = div.querySelector(`#q${i}`);
  const charDisplay = div.querySelector(`#char${i}`);
  const pointsMsg = div.querySelector(`#points${i}`);

  textarea.addEventListener('input', () => {
    const length = textarea.value.length;
    charDisplay.textContent = `${length} / 500`;

    if (length > 10 && !answered[i]) {
      answered[i] = true;
      pointsMsg.innerHTML = '🎉 +15 pontos adicionados!';
      updateProgress();
    } else if (length <= 10 && answered[i]) {
      answered[i] = false;
      pointsMsg.innerHTML = '❌ Resposta removida. -15 pontos.';
      updateProgress();
    } else {
      pointsMsg.innerHTML = '';
    }
  });
});

updateProgress();
