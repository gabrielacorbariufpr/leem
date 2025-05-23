
const supabaseUrl = 'https://wuwdkyfcugmmofziuqmo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d2RreWZjdWdtbW9meml1cW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMDgwMDksImV4cCI6MjA2MzU4NDAwOX0.ZEBr1OKGW_rPD9tUeAucx3Ugj4R5kfxcfzZg9iEmdr4';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function carregarRanking() {
    const { data, error } = await supabase
        .from('respostas')
        .select('*');

    if (error) {
        console.error('Erro ao carregar dados:', error);
        return;
    }

    // Agrupar dados
    const agrupado = {};
    data.forEach(r => {
        const chave = r.usuario + r.professor + r.disciplina;
        if (!agrupado[chave]) {
            agrupado[chave] = { 
                usuario: r.usuario,
                professor: r.professor,
                disciplina: r.disciplina,
                xp: 0,
                tempo: r.tempo
            };
        }
        agrupado[chave].xp += r.xp;
    });

    const ranking = Object.values(agrupado)
        .sort((a, b) => b.xp - a.xp);

    desenharRanking(ranking);
}

function aplicarFiltros() {
    const disc = document.getElementById('filtroDisciplina').value.toLowerCase();
    const prof = document.getElementById('filtroProfessor').value.toLowerCase();

    carregarRankingFiltrado(disc, prof);
}

async function carregarRankingFiltrado(disc, prof) {
    const { data, error } = await supabase
        .from('respostas')
        .select('*');

    if (error) {
        console.error('Erro ao carregar dados:', error);
        return;
    }

    const agrupado = {};
    data.forEach(r => {
        const chave = r.usuario + r.professor + r.disciplina;
        if (!agrupado[chave]) {
            agrupado[chave] = { 
                usuario: r.usuario,
                professor: r.professor,
                disciplina: r.disciplina,
                xp: 0,
                tempo: r.tempo
            };
        }
        agrupado[chave].xp += r.xp;
    });

    let ranking = Object.values(agrupado);
    if (disc) {
        ranking = ranking.filter(r => r.disciplina.toLowerCase().includes(disc));
    }
    if (prof) {
        ranking = ranking.filter(r => r.professor.toLowerCase().includes(prof));
    }

    ranking.sort((a, b) => b.xp - a.xp);

    desenharRanking(ranking);
}

function desenharRanking(ranking) {
    const top3 = document.getElementById('top3');
    const tabela = document.getElementById('tabelaRanking');

    top3.innerHTML = '';
    tabela.innerHTML = '';

    ranking.slice(0, 3).forEach((p, index) => {
        const medalha = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
        top3.innerHTML += `
            <div class="card-top">
                <h3>${medalha} ${p.usuario}</h3>
                <p><strong>Professor:</strong> ${p.professor}</p>
                <p><strong>Disciplina:</strong> ${p.disciplina}</p>
                <p><strong>XP:</strong> ${p.xp}</p>
                <p><strong>Tempo:</strong> ${p.tempo}</p>
            </div>
        `;
    });

    ranking.forEach((p, index) => {
        tabela.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${p.usuario}</td>
                <td>${p.professor}</td>
                <td>${p.disciplina}</td>
                <td>${p.xp}</td>
                <td>${p.tempo}</td>
            </tr>
        `;
    });
}

carregarRanking();
