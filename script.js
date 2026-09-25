const onboarding = document.getElementById('onboarding');
const skipOnboarding = document.getElementById('skipOnboarding');
const startLearning = document.getElementById('startLearning');

function closeOnboarding() {
  if (onboarding) onboarding.style.display = 'none';
}

skipOnboarding?.addEventListener('click', closeOnboarding);
startLearning?.addEventListener('click', () => {
  closeOnboarding();
  notify('Shaxsiy o‘quv yo‘lingiz tayyor!');
});

document.querySelectorAll('#subjectChoices .choice').forEach((choice) => {
  choice.addEventListener('click', () => choice.classList.toggle('selected'));
});

const gameModal = document.getElementById('gameModal');
const gameTitle = document.getElementById('gameTitle');
const gameContent = document.getElementById('gameContent');
const closeGame = document.getElementById('closeGame');
const gameData = {
  crossword: ['Krossvord: Algoritmlar', 'Algoritmda takrorlanadigan buyruqlar ketma-ketligi nima deyiladi?', ['A) Shart', 'B) Sikl (Loop)', 'C) O‘zgaruvchi'], 1],
  match: ['Juftini top', 'Variable so‘zining tarjimasini tanlang.', ['O‘zgaruvchi', 'Algoritm', 'Natija'], 0],
  truefalse: ['To‘g‘ri yoki noto‘g‘ri', 'Loop bir xil amallarni qayta-qayta bajarish uchun ishlatiladi.', ['To‘g‘ri ✓', 'Noto‘g‘ri ×'], 0],
  scramble: ['So‘zlar labirinti', 'Harflarni to‘g‘ri tartiblang: G O R I T H M A', ['ALGORITHM', 'LOGARITHM'], 0],
  order: ['Tartibga keltir', 'Algoritmning birinchi qadamini tanlang.', ['Masalani tushunish', 'Natijani tekshirish'], 0],
  speed: ['Tezkor savollar', 'HTML nimani anglatadi?', ['HyperText Markup Language', 'High Text Machine Logic'], 0]
};

function openGame(key) {
  const data = gameData[key];
  if (!data || !gameModal) return;
  gameTitle.textContent = data[0];
  gameContent.innerHTML = `<p class="muted">${data[1]}</p>${data[2].map((answer, index) => `<button class="game-option" data-correct="${index === data[3]}">${answer}</button>`).join('')}`;
  gameModal.classList.add('open');
  gameModal.setAttribute('aria-hidden', 'false');
  gameContent.querySelectorAll('.game-option').forEach((option) => option.addEventListener('click', () => {
    const correct = option.dataset.correct === 'true';
    option.style.background = correct ? '#dff8ed' : '#ffe6e6';
    notify(correct ? '+25 XP! To‘g‘ri javob.' : 'Yana bir bor o‘ylab ko‘ring.');
  }));
}

document.addEventListener('click', (event) => {
  const game = event.target.closest('[data-game]');
  if (game) {
    event.preventDefault();
    openGame(game.dataset.game);
  }
});

closeGame?.addEventListener('click', () => {
  gameModal.classList.remove('open');
  gameModal.setAttribute('aria-hidden', 'true');
});
gameModal?.addEventListener('click', (event) => {
  if (event.target === gameModal) gameModal.classList.remove('open');
});
