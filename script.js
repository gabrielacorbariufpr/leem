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
    etapaAtual = 0;
    carregarPergunta();
    iniciarTempo();
}

function iniciarTempo() {
    intervaloTempo = setInterval(() => {
        tempo++;
        const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
        const segundos = String(tempo % 60).padStart(2, '0');
        document.getElementById('tempo').textContent = `${minutos}:${segundos}`;
    }, 1000);
}

function carregarPergunta() {
    document.getElementById('perguntaNumero').textContent = `Etapa ${etapaAtual + 1}`;
    document.getElementById('perguntaTexto').textContent = perguntas[etapaAtual];
    const resposta = document.getElementById('resposta');
    resposta.value = '';
    caracteresAnteriores = 0;
    atualizarProgresso();
    atualizarContadorCaracteres();

    // 🔥 Sempre remover o listener anterior antes de adicionar um novo
    resposta.removeEventListener('input', respostaListener);
    resposta.addEventListener('input', respostaListener);
}

 else if (diff <= -20) {
        xp = Math.max(0, xp - 15);
        caracteresAnteriores -= 20;
        mostrarNotificacao('perda');
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

function configurarResposta() {
    const resposta = document.getElementById('resposta');
    resposta.removeEventListener('input', respostaListener); // ✔️ Remove anterior
    resposta.addEventListener('input', respostaListener);    // ✔️ Adiciona atualizado
}

    document.getElementById('xp').textContent = xp;
}


document.getElementById('botaoConcluir').addEventListener('click', () => {
    etapaAtual++;
    if (etapaAtual < perguntas.length) {
        mostrarTelaPercurso();
    } else {
        finalizarMissao();
    }
});


function mostrarTelaPercurso() {
    document.getElementById('telaPergunta').style.display = 'none';
    document.getElementById('telaPercurso').style.display = 'block';
    document.getElementById('xpPercurso').textContent = xp;
    document.getElementById('tempoPercurso').textContent = document.getElementById('tempo').textContent;
    document.getElementById('etapaAtualPercurso').textContent = etapaAtual;
    document.getElementById('totalEtapas').textContent = perguntas.length;
}

function proximaPergunta() {
    document.getElementById('telaPercurso').style.display = 'none';
    document.getElementById('telaPergunta').style.display = 'block';
    carregarPergunta();
}

function finalizarMissao() {
    clearInterval(intervaloTempo);
    window.location.href = 'leem-finalizacao-dinamica.html';
}

function mostrarNotificacao(tipo) {
    const notificacao = document.createElement('div');
    notificacao.id = 'notificacaoXP';

    if (tipo === 'ganho') {
        notificacao.innerHTML = '🎉 Parabéns! Você ganhou +15 XP ⭐';
    } else if (tipo === 'perda') {
        notificacao.innerHTML = '😢 Que triste! Você perdeu -15 XP ⭐';
    }

    document.body.appendChild(notificacao);
    notificacao.style.display = 'block';

    setTimeout(() => {
        notificacao.remove();
    }, 2000);
}

function respostaListener() {
    const resposta = document.getElementById('resposta');
    const caracteres = resposta.value.length;
    atualizarContadorCaracteres();

    const diff = caracteres - caracteresAnteriores;
    if (diff >= 20) {
        xp += 15;
        caracteresAnteriores += 20;
        mostrarNotificacao('ganho');
    } else if (diff <= -20) {
        xp = Math.max(0, xp - 15);
        caracteresAnteriores -= 20;
        mostrarNotificacao('perda');
    }
    document.getElementById('xp').textContent = xp;
}
