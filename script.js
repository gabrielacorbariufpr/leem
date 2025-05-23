const perguntas = [
    "Todos os integrantes do grupo participaram ativamente? Comente.",
    "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
    "Qual foi a sua contribuição para a atividade? Comente.",
    "Você contribuiu com ideias próprias na realização das atividades do projeto? Comente.",
    "Você já fez alguma atividade como essa? Se sim, dê exemplos.",
    "Você se sentiu responsável/envolvido durante a atividade? Comente.",
    "O grupo enfrentou desafios? Quais?",
    "O que você aprendeu durante essa atividade?",
    "Quais sugestões você daria para melhorar essa atividade?",
    "Deixe um comentário geral sobre sua experiência."
];

let etapaAtual = 0;
let xp = 0;
let tempo = 0;
let intervaloTempo;
let caracteresAnteriores = 0;

function abrirTelaApresentacao() {
    const nome = document.getElementById('nome').value.trim();
    const professor = document.getElementById('professor').value.trim();
    const disciplina = document.getElementById('disciplina').value.trim();

    if (!nome || !professor || !disciplina) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    document.getElementById('nomeApresentacao').textContent = nome;
    document.getElementById('alunoCabecalho').textContent = nome;
    document.getElementById('profCabecalho').textContent = professor;
    document.getElementById('discCabecalho').textContent = disciplina;

    document.getElementById('telaIdentificacao').style.display = 'none';
    document.getElementById('telaApresentacao').style.display = 'block';
}

function iniciarMissao() {
    document.querySelector('header').style.display = 'flex';
    document.getElementById('telaApresentacao').style.display = 'none';
    document.getElementById('telaPergunta').style.display = 'block';
    carregarPergunta();
    intervaloTempo = setInterval(atualizarTempo, 1000);
}

function atualizarTempo() {
    tempo++;
    const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    document.getElementById('tempo').textContent = `${minutos}:${segundos}`;
}

function carregarPergunta() {
    document.getElementById('perguntaNumero').textContent = `Pergunta ${etapaAtual + 1}`;
    document.getElementById('perguntaTexto').textContent = perguntas[etapaAtual];
    document.getElementById('resposta').value = '';
    atualizarProgresso();
    atualizarContadorCaracteres();
}

function atualizarProgresso() {
    const progresso = ((etapaAtual) / perguntas.length) * 100;
    document.getElementById('barraProgresso').style.width = progresso + '%';
}

function atualizarContadorCaracteres() {
    const texto = document.getElementById('resposta').value;
    const contador = document.getElementById('contadorCaracteres');
    contador.textContent = `${texto.length}/500 caracteres`;
}

document.getElementById('resposta').addEventListener('input', () => {
    const caracteres = document.getElementById('resposta').value.length;
    atualizarContadorCaracteres();

    const diff = caracteres - caracteresAnteriores;
    if (diff >= 20) {
        xp += 15;
        caracteresAnteriores += 20;
        mostrarNotificacao('+15 XP');
    } else if (diff <= -20) {
        xp = Math.max(0, xp - 15);
        caracteresAnteriores -= 20;
        mostrarNotificacao('-15 XP');
    }
    document.getElementById('xp').textContent = xp;
});

document.getElementById('botaoConcluir').addEventListener('click', () => {
    etapaAtual++;
    if (etapaAtual < perguntas.length) {
        mostrarTelaPercurso();
    } else {
        clearInterval(intervaloTempo);
        alert('Missão concluída!');
    }
});

function mostrarTelaPercurso() {
    document.getElementById('telaPergunta').style.display = 'none';
    document.getElementById('telaPercurso').style.display = 'block';
    document.getElementById('xpPercurso').textContent = xp;
    document.getElementById('tempoPercurso').textContent = document.getElementById('tempo').textContent;
    document.getElementById('etapaAtualPercurso').textContent = etapaAtual;
}

function proximaPergunta() {
    document.getElementById('telaPercurso').style.display = 'none';
    document.getElementById('telaPergunta').style.display = 'block';
    carregarPergunta();
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.id = 'notificacaoXP';
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);

    notificacao.style.display = 'block';
    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}
