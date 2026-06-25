// ── LOADING SCREEN ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

// ── PROGRESS BAR ──
const progressBar = document.getElementById('readProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  });
}

// ── DARK MODE ──
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('.theme-icon');
  if (localStorage.getItem('leadup-theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    if (themeIcon) themeIcon.innerHTML = isDark ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
    localStorage.setItem('leadup-theme', isDark ? 'light' : 'dark');
  });
}

// ── MENU HAMBÚRGUER ──
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');
const mobileClose = document.getElementById('navMobileClose');
const overlay = document.getElementById('navOverlay');

if (hamburger && mobileMenu) {
  function openMenu() { mobileMenu.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { mobileMenu.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }
  hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', closeMenu));
}

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'Home.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('nav-active');
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('.numero-val[data-target]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const step = target / (1600 / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// ── PARALLAX HERO ──
const bgText = document.querySelector('.hero-bg-text');
if (bgText) {
  window.addEventListener('scroll', () => {
    bgText.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  });
}

// ── TIMELINE DRAG TO SCROLL ──
const timeline = document.querySelector('.evo-timeline');
if (timeline) {
  let isDown = false, startX, scrollLeft;
  timeline.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - timeline.offsetLeft; scrollLeft = timeline.scrollLeft; });
  timeline.addEventListener('mouseleave', () => { isDown = false; });
  timeline.addEventListener('mouseup', () => { isDown = false; });
  timeline.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    timeline.scrollLeft = scrollLeft - (e.pageX - timeline.offsetLeft - startX) * 1.5;
  });
}

// ── ANTES E DEPOIS ──
document.querySelectorAll('.ad-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.ad-card');
    const side = btn.dataset.side;
    card.querySelectorAll('.ad-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    card.querySelectorAll('.ad-side').forEach(s => s.classList.remove('active'));
    card.querySelector('.ad-' + side).classList.add('active');
  });
});

// ── QUIZ ──
(function () {
  const questions = document.querySelectorAll('.quiz-question');
  if (!questions.length) return;

  const fill = document.getElementById('quizFill');
  const label = document.getElementById('quizLabel');
  const resultDiv = document.getElementById('quizResult');
  const questionsDiv = document.getElementById('quizQuestions');
  const progressWrap = document.querySelector('.quiz-progress-wrap');
  const restart = document.getElementById('quizRestart');
  const total = questions.length;
  let current = 0, score = 0;

  const results = [
    { icon: '<i class="bi bi-seedling"></i>', title: 'Nível Iniciante', text: 'Sua empresa está nos primeiros passos do marketing. Existe um grande potencial a ser explorado. A Lead Up pode construir toda a base estratégica, estruturar seus processos e capacitar sua equipe para gerar resultados consistentes.' },
    { icon: '<i class="bi bi-bar-chart-fill"></i>', title: 'Nível em Desenvolvimento', text: 'Sua empresa já tem algumas iniciativas de marketing, mas falta estrutura, consistência e integração entre as ações. Com a orientação certa, é possível dobrar seu alcance e transformar esforços isolados em uma máquina de resultados.' },
    { icon: '<i class="bi bi-trophy-fill"></i>', title: 'Nível Avançado', text: 'Parabéns! Sua empresa já tem uma base sólida de marketing. A Lead Up pode ajudar a otimizar processos, explorar novos canais, escalar resultados e identificar oportunidades que passam despercebidas no dia a dia.' }
  ];

  function updateProgress() {
    if (fill) fill.style.width = (((current + 1) / total) * 100) + '%';
    if (label) label.textContent = `Pergunta ${current + 1} de ${total}`;
  }

  document.querySelectorAll('.quiz-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const qDiv = opt.closest('.quiz-question');
      if (qDiv.querySelector('.selected')) return;
      opt.classList.add('selected');
      score += parseInt(opt.dataset.val, 10);
      setTimeout(() => {
        qDiv.classList.remove('active');
        current++;
        if (current < total) { questions[current].classList.add('active'); updateProgress(); }
        else { showResult(); }
      }, 350);
    });
  });

  function showResult() {
    if (questionsDiv) questionsDiv.classList.add('hidden');
    if (progressWrap) progressWrap.classList.add('hidden');
    const r = results[score <= 12 ? 0 : score <= 24 ? 1 : 2];
    document.getElementById('quizResultIcon').innerHTML = r.icon;
    document.getElementById('quizResultTitle').textContent = r.title;
    document.getElementById('quizResultText').textContent = r.text;
    if (resultDiv) resultDiv.classList.remove('hidden');
  }

  if (restart) {
    restart.addEventListener('click', () => {
      current = 0; score = 0;
      questions.forEach((q, i) => { q.classList.toggle('active', i === 0); q.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected')); });
      if (resultDiv) resultDiv.classList.add('hidden');
      if (questionsDiv) questionsDiv.classList.remove('hidden');
      if (progressWrap) progressWrap.classList.remove('hidden');
      updateProgress();
    });
  }
})();

// ── FAQ ──
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isOpen) { item.classList.add('open'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
  });
});

// ── FORMULÁRIO DE CONTATO ──
(function () {
  const form = document.getElementById('contatoForm');
  const sucesso = document.getElementById('contatoSucesso');
  if (!form) return;

  function validate() {
    let ok = true;
    [{ id:'nome', err:'erroNome', msg:'Informe seu nome.' },
     { id:'empresa', err:'erroEmpresa', msg:'Informe o nome da empresa.' },
     { id:'segmento', err:'erroSegmento', msg:'Selecione um segmento.' },
     { id:'desafio', err:'erroDesafio', msg:'Conte um pouco sobre seu desafio.' }
    ].forEach(({ id, err, msg }) => {
      const el = document.getElementById(id);
      const errEl = document.getElementById(err);
      if (!el.value.trim()) { el.classList.add('erro'); errEl.textContent = msg; ok = false; }
      else { el.classList.remove('erro'); errEl.textContent = ''; }
    });
    const emailEl = document.getElementById('email');
    const emailErr = document.getElementById('erroEmail');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    if (!valid) { emailEl.classList.add('erro'); emailErr.textContent = 'Informe um e-mail válido.'; ok = false; }
    else { emailEl.classList.remove('erro'); emailErr.textContent = ''; }
    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector('.contato-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    const data = new FormData(form);

    fetch('https://formsubmit.co/ajax/leadupservices@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(r => r.json())
    .then(res => {
      if (res.success) {
        form.classList.add('hidden');
        if (sucesso) sucesso.classList.remove('hidden');
      } else {
        btn.disabled = false;
        btn.textContent = 'Enviar mensagem';
        alert('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = 'Enviar mensagem';
      alert('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.');
    });
  });

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('erro'));
  });
})();
