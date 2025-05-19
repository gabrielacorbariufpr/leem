
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

const container = document.getElementById('questions-container');

questions.forEach((q, i) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `
    <label for="q${i}"><strong>${i + 1}.</strong> ${q}</label>
    <textarea id="q${i}" rows="3" placeholder="Escreva sua resposta aqui..."></textarea>
    <div class="slider-container">
      <input type="range" min="1" max="5" value="3" id="slider${i}" />
      <span class="emoji" id="emoji${i}">😐</span>
    </div>
  `;
  div.addEventListener('click', () => {
    document.querySelectorAll('.question').forEach(el => el.classList.remove('active'));
    div.classList.add('active');
  });
  container.appendChild(div);

  const slider = div.querySelector(`#slider${i}`);
  const emoji = div.querySelector(`#emoji${i}`);
  slider.addEventListener('input', () => {
    const val = parseInt(slider.value);
    const emojis = ['😠', '😕', '😐', '🙂', '😄'];
    emoji.textContent = emojis[val - 1];
  });
});

document.getElementById('submit-btn').addEventListener('click', () => {
  alert('Missão concluída! Suas respostas foram registradas.');
});
