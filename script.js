const subjects = [
  { name: 'Informatika', icon: '⌘', color: 'purple', lessons: '12 mavzu', progress: 65, note: 'Algoritmlar' },
  { name: 'Ingliz tili', icon: '文', color: 'orange', lessons: '18 mavzu', progress: 42, note: 'Daily words' },
  { name: 'Matematika', icon: '∑', color: 'blue', lessons: '15 mavzu', progress: 28, note: 'Kasrlar' },
  { name: 'Fizika', icon: '⚡', color: 'green', lessons: '10 mavzu', progress: 12, note: 'Harakat' }
];

const subjectCards = document.getElementById('subjectCards');
const toast = document.getElementById('toast');
const onboarding = document.getElementById('onboarding');
const modal = onboarding.querySelector('.welcome-modal');
const savedPlan = JSON.parse(localStorage.getItem('eduplayPlan') || 'null');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function renderSubjects() {
  subjectCards.innerHTML = subjects.map((subject) => `
    <button class="subject-card" data-subject-card="${subject.name}">
      <span class="subject-icon ${subject.color}">${subject.icon}</span>
      <h3>${subject.name}</h3>
      <p>${subject.lessons} · ${subject.note}</p>
      <div class="bar"><i style="width:${subject.progress}%"></i></div>
    </button>
  `).join('');
}

renderSubjects();

function renderOnboarding() {
  modal.innerHTML = `
    <button class="modal-close" id="skipOnboarding" aria-label="Oynani yopish">×</button>
    <div class="welcome-icon">✦</div>
    <p class="eyebrow">EduPlay'ga xush kelibsiz</p>
    <h1 id="welcomeTitle">Bilim olishni <span>o'yinga</span> aylantiramiz!</h1>
    <p class="welcome-copy" id="welcomeCopy">Siz uchun qiziqarli va shaxsiy o'quv yo'lini bir necha qadamda tayyorlaymiz.</p>
    <div class="step-dots" id="stepDots"><i class="active"></i><i></i><i></i><i></i></div>
    <div id="onboardingStep"></div>
  `;

  const state = {
    step: 0,
    subjects: savedPlan?.subjects || ['Informatika'],
    goal: savedPlan?.goal || '',
    minutes: savedPlan?.minutes || ''
  };

  const stepRoot = document.getElementById('onboardingStep');
  const dots = [...document.querySelectorAll('#stepDots i')];
  const title = document.getElementById('welcomeTitle');
  const copy = document.getElementById('welcomeCopy');

  function updateDots() {
    dots.forEach((dot, index) => dot.classList.toggle('active', index === state.step));
  }

  function renderStep() {
    updateDots();
    if (state.step === 0) {
      title.innerHTML = `Bilim olishni <span>o'yinga</span> aylantiramiz!`;
      copy.textContent = `Siz uchun qiziqarli va shaxsiy o'quv yo'lini bir necha qadamda tayyorlaymiz.`;
      stepRoot.innerHTML = `<button class="wide-button" id="onboardingNext">Boshlaymiz <b>→</b></button>`;
    } else if (state.step === 1) {
      title.textContent = 'Sizga qaysi fanlar yoqadi?';
      copy.textContent = 'Bir yoki bir nechta fanni tanlang. Keyin ularni o‘zgartirishingiz mumkin.';
      stepRoot.innerHTML = `
        <div class="choice-grid" id="subjectChoices">
          ${subjects.map((item) => `<button class="choice ${state.subjects.includes(item.name) ? 'selected' : ''}" data-value="${item.name}"><span>${item.icon}</span>${item.name}</button>`).join('')}
        </div>
        <button class="wide-button" id="onboardingNext">Davom etish <b>→</b></button>`;
    } else if (state.step === 2) {
      title.textContent = 'Bugungi maqsadingiz nima?';
      copy.textContent = 'Maqsadingizga mos topshiriqlarni tavsiya qilamiz.';
      const goals = ['Informatikani o‘rganish', 'Ingliz tilini yaxshilash', 'Testlarda yuqori natija', 'Har kuni yangi bilim'];
      stepRoot.innerHTML = `<div class="choice-grid">${goals.map((goal) => `<button class="choice ${state.goal === goal ? 'selected' : ''}" data-goal="${goal}"><span>✓</span>${goal}</button>`).join('')}</div><button class="wide-button" id="onboardingNext">Davom etish <b>→</b></button>`;
    } else if (state.step === 3) {
      title.textContent = 'Kuniga qancha vaqt ajratasiz?';
      copy.textContent = 'Oz bo‘lsa ham, muntazam o‘qish eng yaxshi natija beradi.';
      const times = ['5 daqiqa', '15 daqiqa', '30 daqiqa', '1 soat'];
      stepRoot.innerHTML = `<div class="choice-grid">${times.map((time) => `<button class="choice ${state.minutes === time ? 'selected' : ''}" data-time="${time}"><span>◷</span>${time}</button>`).join('')}</div><button class="wide-button" id="onboardingNext">Rejani ko‘rish <b>→</b></button>`;
    } else {
      title.innerHTML = `Sizning rejangiz <span>tayyor!</span>`;
      copy.textContent = 'Endi har kuni kichik qadamlar bilan katta natijaga erishamiz.';
      stepRoot.innerHTML = `<div class="stats-card" style="margin:18px 0"><div class="stat-row"><span>Tanlangan fanlar</span><strong>${state.subjects.join(', ')}</strong></div><div class="stat-row"><span>Bugungi maqsad</span><strong>${state.goal}</strong></div><div class="stat-row"><span>Kunlik vaqt</span><strong>${state.minutes}</strong></div></div><button class="wide-button" id="finishOnboarding">EduPlay'ni boshlash <b>→</b></button>`;
    }

    const next = document.getElementById('onboardingNext');
    if (next) next.addEventListener('click', () => {
      if (state.step === 1 && state.subjects.length === 0) return showToast('Kamida bitta fan tanlang.');
      if (state.step === 2 && !state.goal) return showToast('Maqsadingizni tanlang.');
      if (state.step === 3 && !state.minutes) return showToast('Kunlik vaqtni tanlang.');
      state.step += 1;
      renderStep();
    });

    stepRoot.querySelectorAll('[data-value]').forEach((button) => button.addEventListener('click', () => {
      const value = button.dataset.value;
      state.subjects = state.subjects.includes(value) ? state.subjects.filter((item) => item !== value) : [...state.subjects, value];
      button.classList.toggle('selected', state.subjects.includes(value));
    }));
    stepRoot.querySelectorAll('[data-goal]').forEach((button) => button.addEventListener('click', () => {
      state.goal = button.dataset.goal;
      stepRoot.querySelectorAll('[data-goal]').forEach((item) => item.classList.toggle('selected', item === button));
    }));
    stepRoot.querySelectorAll('[data-time]').forEach((button) => button.addEventListener('click', () => {
      state.minutes = button.dataset.time;
      stepRoot.querySelectorAll('[data-time]').forEach((item) => item.classList.toggle('selected', item === button));
    }));
    const finish = document.getElementById('finishOnboarding');
    if (finish) finish.addEventListener('click', () => {
      localStorage.setItem('eduplayPlan', JSON.stringify(state));
      onboarding.style.display = 'none';
      showToast('Shaxsiy o‘quv yo‘lingiz saqlandi!');
      document.getElementById('subjects').scrollIntoView({ behavior: 'smooth' });
    });
  }

  document.getElementById('skipOnboarding').addEventListener('click', () => onboarding.style.display = 'none');
  renderStep();
}

renderOnboarding();

subjectCards.addEventListener('click', (event) => {
  const card = event.target.closest('[data-subject-card]');
  if (card) showToast(`${card.dataset.subjectCard} fani ochilmoqda...`);
});

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  showToast(document.body.classList.contains('dark') ? 'Tungi rejim yoqildi' : 'Yorug‘ rejim yoqildi');
});

const games = {
  crossword: { title: 'Krossvord: Algoritmlar', html: '<p class="muted">Algoritmda takrorlanadigan buyruqlar ketma-ketligi nima deyiladi?</p><button class="game-option" data-answer="no">A) Shart</button><button class="game-option" data-answer="yes">B) Sikl (Loop)</button><button class="game-option" data-answer="no">C) O‘zgaruvchi</button>' },
  match: { title: 'Juftini top', html: '<p class="muted">Inglizcha so‘zning to‘g‘ri tarjimasini tanlang: <b>Variable</b></p><button class="game-option" data-answer="yes">O‘zgaruvchi</button><button class="game-option" data-answer="no">Algoritm</button><button class="game-option" data-answer="no">Natija</button>' },
  truefalse: { title: 'To‘g‘ri yoki noto‘g‘ri', html: '<p class="muted">Loop — bir xil amallarni qayta-qayta bajarish uchun ishlatiladi.</p><button class="game-option" data-answer="yes">To‘g‘ri ✓</button><button class="game-option" data-answer="no">Noto‘g‘ri ×</button>' },
  scramble: { title: 'So‘zlar labirinti', html: '<p class="muted">Harflarni to‘g‘ri tartiblang: <b>G O L O R I T H M A</b></p><button class="game-option" data-answer="yes">ALGORITHM</button><button class="game-option" data-answer="no">LOGARITHM</button>' }
};

const gameModal = document.getElementById('gameModal');
const gameTitle = document.getElementById('gameTitle');
const gameContent = document.getElementById('gameContent');

document.querySelectorAll('[data-game]').forEach((card) => card.addEventListener('click', () => {
  const game = games[card.dataset.game];
  gameTitle.textContent = game.title;
  gameContent.innerHTML = game.html;
  gameModal.classList.add('open');
  gameModal.setAttribute('aria-hidden', 'false');
  gameContent.querySelectorAll('.game-option').forEach((option) => option.addEventListener('click', () => {
    if (option.dataset.answer === 'yes') {
      option.style.background = '#dff8ed';
      showToast('+25 XP! To‘g‘ri javob.');
    } else {
      option.style.background = '#ffe6e6';
      showToast('Yana bir bor o‘ylab ko‘ring.');
    }
  }));
}));

document.getElementById('closeGame').addEventListener('click', () => {
  gameModal.classList.remove('open');
  gameModal.setAttribute('aria-hidden', 'true');
});
gameModal.addEventListener('click', (event) => {
  if (event.target === gameModal) gameModal.classList.remove('open');
});
