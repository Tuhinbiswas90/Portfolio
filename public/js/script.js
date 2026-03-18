/* ============================================
   TUHIN BISWAS — PORTFOLIO JS
   ============================================ */

// ─── LOADING SCREEN ───
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loader-bar');
  const pct    = document.getElementById('loader-pct');
  const text   = document.getElementById('loader-text');

  const msgs = ['INITIALIZING...', 'LOADING ASSETS...', 'COMPILING MODULES...', 'ALMOST READY...', 'LAUNCHING...'];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;

    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';

    if (progress > msgIdx * 25 && msgIdx < msgs.length) {
      text.textContent = msgs[msgIdx++];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        startTyping();
      }, 400);
    }
  }, 80);
});

document.body.style.overflow = 'hidden';

// ─── CUSTOM CURSOR ───
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .cert-card, nav ul a').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ─── CANVAS PARTICLES ───
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initParticles() {
  pts = [];
  const cols = Math.floor(W / 65);
  const rows = Math.floor(H / 65);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > 0.62) {
        pts.push({
          x: i * 65 + Math.random() * 20 - 10,
          y: j * 65 + Math.random() * 20 - 10,
          r: Math.random() * 1.3 + 0.3,
          a: Math.random(), speed: Math.random() * 0.006 + 0.002,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
  }
}

let tick = 0;
function drawCanvas() {
  ctx.clearRect(0, 0, W, H);
  tick += 0.5;

  pts.forEach((p, i) => {
    p.a = 0.12 + 0.1 * Math.sin(tick * p.speed + p.phase);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = i % 4 === 0
      ? `rgba(240,165,0,${p.a})`
      : `rgba(0,229,192,${p.a * 0.5})`;
    ctx.fill();
  });

  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 95) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(240,165,0,${0.05 * (1 - dist / 95)})`;
        ctx.lineWidth = 0.4;
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawCanvas);
}

resize();
initParticles();
drawCanvas();
window.addEventListener('resize', () => { resize(); initParticles(); });

// ─── TYPEWRITER ───
const roles = [
  'Frontend Developer',
  'MERN Stack Engineer',
  'React.js Specialist',
  'AI Integration Builder',
  'Problem Solver',
  'Open to Opportunities'
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function startTyping() {
  function type() {
    const current = roles[roleIdx];
    if (!isDeleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, isDeleting ? 45 : 80);
  }
  setTimeout(type, 500);
}

// ─── NAV SCROLL ───
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`nav ul a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── VISITOR COUNTER ───
async function fetchVisitors() {
  try {
    const res = await fetch('/api/visitors');
    const data = await res.json();
    if (data.success) {
      document.getElementById('visitor-count').textContent = data.count.toLocaleString();
    }
  } catch (err) {
    document.getElementById('visitor-count').textContent = '--';
  }
}
fetchVisitors();

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contact-form');
const formMsg     = document.getElementById('form-msg');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit-btn');
  const originalText = btn.textContent;

  btn.textContent = 'SENDING...';
  btn.disabled = true;
  formMsg.className = 'form-msg';

  const payload = {
    name:    document.getElementById('f-name').value.trim(),
    email:   document.getElementById('f-email').value.trim(),
    subject: document.getElementById('f-subject').value.trim(),
    message: document.getElementById('f-message').value.trim()
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      formMsg.textContent = '✓ ' + data.message;
      formMsg.classList.add('form-msg', 'success', 'show');
      contactForm.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    formMsg.textContent = '✗ ' + (err.message || 'Something went wrong. Please try again.');
    formMsg.classList.add('form-msg', 'error', 'show');
  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
    setTimeout(() => formMsg.classList.remove('show'), 5000);
  }
});

// ─── RESUME DOWNLOAD ───
document.getElementById('resume-btn').addEventListener('click', () => {
  // Replace 'resume.pdf' with your actual resume file in public/ folder
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'Tuhin_Biswas_Resume.pdf';
  link.click();
});

// ─── SMOOTH NAV LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
