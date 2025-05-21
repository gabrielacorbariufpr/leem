
let xp = 0;
let charCount = 0;
let timerElement = document.getElementById('timer');
let xpElement = document.getElementById('xp');
let charCountElement = document.getElementById('charCount');
let progressBar = document.getElementById('progress-bar');
let notification = document.getElementById('notification');

// Timer
let seconds = 0;
setInterval(() => {
    seconds++;
    let mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    let secs = String(seconds % 60).padStart(2, '0');
    timerElement.textContent = \`\${mins}:\${secs}\`;
}, 1000);

// XP Calculation
document.getElementById('answer').addEventListener('input', (e) => {
    charCount = e.target.value.length;
    charCountElement.textContent = charCount;

    let newXP = Math.floor(charCount / 10) * 5;
    if (newXP > xp) {
        showNotification(\`+ \${newXP - xp} XP\`);
    }
    xp = newXP;
    xpElement.textContent = \`\${xp} XP\`;

    let progress = Math.min(charCount / 500, 1) * 100;
    progressBar.style.width = progress + '%';
});

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
