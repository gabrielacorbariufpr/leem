
document.addEventListener('DOMContentLoaded', () => {
  const xp = 285;
  const ranking = 'Top 15%';
  let medalha = 'Participação';

  if (xp >= 500) medalha = 'Diamante';
  else if (xp >= 400) medalha = 'Ouro';
  else if (xp >= 300) medalha = 'Prata';
  else if (xp >= 200) medalha = 'Bronze';

  document.getElementById('xp').textContent = xp;
  document.getElementById('ranking').textContent = ranking;
  document.getElementById('medalha').textContent = medalha;
});
