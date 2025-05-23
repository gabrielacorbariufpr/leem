
const supabaseUrl = 'https://wuwdkyfcugmmofziuqmo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d2RreWZjdWdtbW9meml1cW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDgwMDksImV4cCI6MjA2MzU4NDAwOX0.ZEBr1OKGW_rPD9tUeAucx3Ugj4R5kfxcfzZg9iEmdr4';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const perguntas = [
    "Todos os integrantes do grupo participaram ativamente? Comente.",
    "Você já havia vivenciado alguma situação semelhante à atividade desenvolvida? Comente.",
    "Qual foi a sua contribuição para a atividade? Comente.",
    "Você contribuiu com ideias próprias (foi autêntico) na realização das atividades do projeto? Comente.",
    "Você já fez alguma atividade como essa realizada? Se sim, dê exemplos.",
    "Você se sentiu responsável/envolvido durante a realização da atividade? Comente.",
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

const xpSpan = document.getElementById('xp');
const tempoSpan = document.getElementById('tempo');
const perguntaNumero = document.getElementById('perguntaNumero');
const perguntaTexto = document.getElementById('perguntaTexto');
const resposta = document.getElementById('resposta');
const contador = document.getElementById('contadorCaracteres');

const telaPergunta = document.getElementById('telaPergunta');
const telaPercurso = document.getElementById('telaPercurso');
const xpPercurso = document.getElementById('xpPercurso');
const tempoPercurso = document.getElementById('tempoPercurso');
const etapaAtualPercurso = document.getElementById('etapaAtualPercurso');
const totalEtapas = document.getElementById('totalEtapas');
const botaoProxima = document.getElementById('botaoProxima');

function iniciar() {
    carregarPergunta();
    totalEtapas.textContent = perguntas.length;
    intervaloTempo = setInterval(() => {
        tempo++;
        const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
        const segundos = String(tempo % 60).padStart(2, '0');
        tempoSpan.textContent = `${minutos}:${segundos}`;
    }, 1000);
}

function carregarPergunta() {
    perguntaNumero.textContent = `Pergunta ${etapaAtual + 1}`;
    perguntaTexto.textContent = perguntas[etapaAtual];
    resposta.value = '';
    contador.textContent = '0/500 caracteres';
}

resposta.addEventListener('input', () => {
    const caracteres = resposta.value.length;
    contador.textContent = `${caracteres}/500 caracteres`;

    const diff = caracteres - caracteresAnteriores;
    if (diff >= 20) {
        xp += 15;
        caracteresAnteriores += 20;
    } else if (diff <= -20) {
        xp = Math.max(0, xp - 15);
        caracteresAnteriores -= 20;
    }
    xpSpan.textContent = xp;
});

document.getElementById('botaoConcluir').addEventListener('click', () => {
    salvarResposta('usuario_demo', perguntas[etapaAtual], resposta.value, xp, tempoSpan.textContent);

    etapaAtual++;
    if (etapaAtual < perguntas.length) {
        mostrarTelaPercurso();
    } else {
        alert('Parabéns! Você concluiu todas as etapas.');
        clearInterval(intervaloTempo);
    }
});

botaoProxima.addEventListener('click', () => {
    esconderTelaPercurso();
    carregarPergunta();
});

function mostrarTelaPercurso() {
    telaPergunta.style.display = 'none';
    telaPercurso.style.display = 'block';
    xpPercurso.textContent = xp;
    tempoPercurso.textContent = tempoSpan.textContent;
    etapaAtualPercurso.textContent = etapaAtual;
}

function esconderTelaPercurso() {
    telaPergunta.style.display = 'block';
    telaPercurso.style.display = 'none';
}

async function salvarResposta(usuario, etapa, respostaTexto, xp, tempo) {
    const { data, error } = await supabase
        .from('respostas')
        .insert([
            { usuario, etapa, resposta: respostaTexto, xp, tempo }
        ]);
    if (error) {
        console.error('Erro ao salvar:', error);
    } else {
        console.log('Resposta salva:', data);
    }
}

iniciar();


let usuarioInfo = {
    nome: '',
    professor: '',
    disciplina: ''
};

function iniciarMissao() {
    const nome = document.getElementById('inputNome').value.trim();
    const professor = document.getElementById('inputProfessor').value.trim();
    const disciplina = document.getElementById('inputDisciplina').value.trim();

    if (!nome || !professor || !disciplina) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    usuarioInfo = { nome, professor, disciplina };

    document.getElementById('telaFormulario').style.display = 'none';
    document.querySelector('.header').style.display = 'flex';
    document.getElementById('telaPergunta').style.display = 'block';

    iniciar();
}

async function salvarResposta(usuario, etapa, respostaTexto, xp, tempo) {
    const { data, error } = await supabase
        .from('respostas')
        .insert([
            { usuario: usuarioInfo.nome, professor: usuarioInfo.professor, disciplina: usuarioInfo.disciplina, etapa, resposta: respostaTexto, xp, tempo }
        ]);
    if (error) {
        console.error('Erro ao salvar:', error);
    } else {
        console.log('Resposta salva:', data);
    }
}
