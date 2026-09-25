const subjects = [
  { name: 'Informatika', icon: '⌘', color: 'purple', lessons: '12 mavzu', progress: 65, note: 'Algoritmlar', topics: ['Kompyuter asoslari', 'Algoritmlar', 'O‘zgaruvchilar', 'If / Else', 'Loop'] },
  { name: 'Ingliz tili', icon: '文', color: 'orange', lessons: '18 mavzu', progress: 42, note: 'Daily words', topics: ['Daily words', 'Present Simple', 'Speaking basics'] },
  { name: 'Matematika', icon: '∑', color: 'blue', lessons: '15 mavzu', progress: 28, note: 'Kasrlar', topics: ['Sonlar', 'Kasrlar', 'Tenglamalar'] },
  { name: 'Fizika', icon: '⚡', color: 'green', lessons: '10 mavzu', progress: 12, note: 'Harakat', topics: ['Harakat', 'Kuch', 'Energiya'] }
];

const onboarding = document.getElementById('onboarding');
const toast = document.getElementById('toast');
const app = document.querySelector('.app-shell');
const home = document.querySelector('main#home');
const subjectCards = document.getElementById('subjectCards');
const root = document.createElement('div');
root.id = 'screenRoot';
app?.appendChild(root);

const css = document.createElement('link');
css.rel = 'stylesheet'; css.href = 'screens.css';
document.head.appendChild(css);

function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function closeOnboarding() { if (onboarding) onboarding.style.display = 'none'; }
document.getElementById('skipOnboarding')?.addEventListener('click', closeOnboarding);
document.getElementById('startLearning')?.addEventListener('click', () => { closeOnboarding(); notify('Shaxsiy o‘quv yo‘lingiz tayyor!'); });
document.querySelectorAll('#subjectChoices .choice').forEach((choice) => choice.addEventListener('click', () => choice.classList.toggle('selected')));

if (subjectCards) {
  subjectCards.innerHTML = subjects.map((s) => `<button class="subject-card" data-subject-card="${s.name}"><span class="subject-icon ${s.color}">${s.icon}</span><h3>${s.name}</h3><p>${s.lessons} · ${s.note}</p><div class="bar"><i style="width:${s.progress}%"></i></div></button>`).join('');
}

function pageHeader(label, title, text) { return `<div class="screen-header"><button class="back-button" data-route="home">← Bosh sahifa</button><p class="eyebrow">${label}</p><h1>${title}</h1><p>${text}</p></div>`; }
function showPage(route, value = '') {
  if (!root || !app) return;
  app.classList.toggle('is-screen-mode', route !== 'home');
  if (route === 'home') { root.innerHTML = ''; home?.scrollIntoView({ behavior: 'smooth' }); return; }
  if (route === 'subjects') root.innerHTML = pageHeader('O‘rganishni boshlang', 'Fanlar', 'Har bir fan bo‘yicha mavzularni bosqichma-bosqich o‘rganing.') + `<div class="screen-grid">${subjects.map((s) => `<button class="large-subject-card" data-subject-screen="${s.name}"><span class="subject-icon ${s.color}">${s.icon}</span><h2>${s.name}</h2><p>${s.lessons} · ${s.note}</p><div class="bar"><i style="width:${s.progress}%"></i></div><b>${s.progress}% davom etmoqda →</b></button>`).join('')}</div>`;
  if (route === 'subject') { const s = subjects.find((item) => item.name === value) || subjects[0]; root.innerHTML = pageHeader('Fan bo‘limi', s.name, `${s.name} fanidagi mavzularni tanlang va o‘rganishni davom ettiring.`) + `<div class="topic-layout"><div class="topic-list">${s.topics.map((topic, i) => `<button class="topic-item ${i === 0 ? 'current' : ''}" data-topic="${topic}"><span>${i + 1}</span><strong>${topic}</strong><small>${i ? 'Keyingi bosqich' : 'Boshlash mumkin'}</small><b>→</b></button>`).join('')}</div><aside class="practice-card"><span class="art-icon">✦</span><h2>Bugungi mashq</h2><p>5 ta savolni ishlab, bilimingizni mustahkamlang.</p><button class="primary-button" data-route="games">Mashqni boshlash →</button></aside></div>`; }
  if (route === 'games') { const games = [['crossword','▦','Krossvord','Algoritmlar va so‘zlar'],['match','◈','Juftini top','Tushunchalarni moslashtir'],['truefalse','✓?','To‘g‘ri yoki noto‘g‘ri','Tezkor bilim sinovi'],['scramble','Aa','So‘zlar labirinti','Inglizcha so‘zlarni top'],['order','123','Tartibga keltir','Algoritm bosqichlarini joyla'],['speed','⚡','Tezkor savollar','60 soniyada javob ber']]; root.innerHTML = pageHeader('Bilimni mustahkamla', 'O‘yinlar maydoni', 'Osondan murakkabgacha bilimlaringizni sinang.') + `<div class="screen-game-grid">${games.map((g) => `<button class="screen-game-card" data-game="${g[0]}"><span>${g[1]}</span><h2>${g[2]}</h2><p>${g[3]}</p><b>O‘ynash →</b></button>`).join('')}</div>`; }
  if (route === 'progress') root.innerHTML = pageHeader('Sizning natijalaringiz', 'Progress', 'Har bir kichik yutuq sizni katta maqsadga yaqinlashtiradi.') + `<div class="progress-dashboard"><div class="progress-big"><strong>68%</strong><span>Umumiy progress</span><div class="progress-ring"><i></i></div></div><div class="progress-stats"><div><b>1,260</b><small>Umumiy XP</small></div><div><b>7 kun</b><small>Streak</small></div><div><b>24</b><small>Tugallangan dars</small></div><div><b>86%</b><small>To‘g‘ri javoblar</small></div></div></div><div class="achievement-panel"><h2>Yutuqlar</h2><div class="achievement-list"><span>🔥 7 kunlik streak</span><span>🚀 Birinchi level</span><span>🧠 10 ta test</span></div></div>`;
  if (route === 'profile') root.innerHTML = pageHeader('EduPlay', 'Profil', 'O‘zingiz haqingizdagi ma’lumotlar va yutuqlar.') + `<div class="profile-card"><div class="profile-avatar">A</div><h2>EduPlay o‘quvchisi</h2><p>Explorer · Level 8</p><div class="profile-line"><span>XP</span><b>1,260 / 1,500</b></div><div class="bar"><i style="width:84%"></i></div><button class="primary-button" data-route="progress">Statistikani ko‘rish →</button></div>`;
  if (route === 'ai') root.innerHTML = pageHeader('Yordamchi', 'AI Mentor', 'Tushunmagan mavzuni sodda qilib tushuntirishga yordam beradi.') + `<div class="mentor-card"><div class="mentor-avatar">✦</div><h2>Salom! Men EduPlay Mentor.</h2><p>Bugun qaysi mavzuni tushunishda yordam kerak?</p><div class="mentor-options"><button data-mentor="Algoritmni tushuntir">Algoritmni tushuntir</button><button data-mentor="Xatoyimni izohla">Xatoyimni izohla</button><button data-mentor="Boshqa misol ber">Boshqa misol ber</button></div><div class="mentor-answer" id="mentorAnswer">Savolni tanlang — men sizni fikrlashga yo‘naltiraman.</div></div>`;
  root.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const gameData = {
  crossword: ['Krossvord: Algoritmlar', 'Takrorlanadigan buyruqlar ketma-ketligi nima?', ['A) Shart','B) Sikl (Loop)','C) O‘zgaruvchi'], 1],
  match: ['Juftini top', 'Variable so‘zining tarjimasini tanlang.', ['O‘zgaruvchi','Algoritm','Natija'], 0],
  truefalse: ['To‘g‘ri yoki noto‘g‘ri', 'Loop bir xil amallarni qayta-qayta bajarish uchun ishlatiladi.', ['To‘g‘ri ✓','Noto‘g‘ri ×'], 0],
  scramble: ['So‘zlar labirinti', 'Harflarni to‘g‘ri tartiblang: G O R I T H M A', ['ALGORITHM','LOGARITHM'], 0],
  order: ['Tartibga keltir', 'Algoritmning birinchi qadamini tanlang.', ['Masalani tushunish','Natijani tekshirish'], 0],
  speed: ['Tezkor savollar', 'HTML nimani anglatadi?', ['HyperText Markup Language','High Text Machine Logic'], 0]
};
function openGame(key) { const modal = document.getElementById('gameModal'); const title = document.getElementById('gameTitle'); const content = document.getElementById('gameContent'); const data = gameData[key]; if (!data || !modal) return; title.textContent = data[0]; content.innerHTML = `<p class="muted">${data[1]}</p>${data[2].map((answer, i) => `<button class="game-option" data-correct="${i === data[3]}">${answer}</button>`).join('')}`; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); content.querySelectorAll('.game-option').forEach((option) => option.addEventListener('click', () => { const correct = option.dataset.correct === 'true'; option.style.background = correct ? '#dff8ed' : '#ffe6e6'; notify(correct ? '+25 XP! To‘g‘ri javob.' : 'Yana bir bor o‘ylab ko‘ring.'); })); }

document.addEventListener('click', (event) => {
  const route = event.target.closest('[data-route]'); if (route) { event.preventDefault(); showPage(route.dataset.route); return; }
  const link = event.target.closest('a[href^="#"]'); if (link) { event.preventDefault(); showPage(link.getAttribute('href').slice(1) || 'home'); return; }
  const subject = event.target.closest('[data-subject-card],[data-subject-screen]'); if (subject) { showPage('subject', subject.dataset.subjectCard || subject.dataset.subjectScreen); return; }
  const game = event.target.closest('[data-game]'); if (game) { event.preventDefault(); openGame(game.dataset.game); return; }
  const topic = event.target.closest('[data-topic]'); if (topic) { notify(`${topic.dataset.topic} darsi ochilmoqda...`); return; }
  const mentor = event.target.closest('[data-mentor]'); if (mentor) { const answer = document.getElementById('mentorAnswer'); if (answer) answer.textContent = `${mentor.dataset.mentor}: avval o‘zingizcha fikrlab ko‘ring, keyin men yo‘l-yo‘riq beraman.`; }
});

document.getElementById('themeToggle')?.addEventListener('click', () => { document.body.classList.toggle('dark'); notify(document.body.classList.contains('dark') ? 'Tungi rejim yoqildi' : 'Yorug‘ rejim yoqildi'); });
document.getElementById('closeGame')?.addEventListener('click', () => { const modal = document.getElementById('gameModal'); modal?.classList.remove('open'); modal?.setAttribute('aria-hidden', 'true'); });
document.getElementById('gameModal')?.addEventListener('click', (event) => { if (event.target.id === 'gameModal') event.target.classList.remove('open'); });
document.querySelectorAll('main#home > .section-block, main#home > .learning-panel').forEach((section) => section.remove());