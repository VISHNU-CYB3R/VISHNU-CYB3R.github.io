/* ══════════════════════════════════════════
   VISHNU C — Portfolio Script
   Includes: Hamburger, Cursor, Typewriter,
   Scroll Reveal, Active Nav, Contact Form
══════════════════════════════════════════ */
 
/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobLinks  = document.querySelectorAll('.mob-link');
 
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
 
/* ── CUSTOM CURSOR (desktop only) ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
 
const isTouchDevice = window.matchMedia('(hover: none)').matches;
 
if (isTouchDevice) {
  /* On phones/tablets — restore normal cursor, hide custom elements */
  document.body.style.cursor = 'auto';
  if (cursor) cursor.style.display = 'none';
  if (ring)   ring.style.display   = 'none';
} else {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
 
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    }
  });
 
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (ring) {
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();
 
  document.querySelectorAll('a, button, .skill-category, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; cursor.style.background = 'var(--neon2)'; }
      if (ring)   { ring.style.width = '50px';   ring.style.height = '50px'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = 'var(--neon)'; }
      if (ring)   { ring.style.width = '36px';   ring.style.height = '36px'; }
    });
  });
}


/* ── TYPEWRITER ── */
const roles = [
  'Cybersecurity Enthusiast',
  'Full Stack Developer',
  'Ethical Hacker',
  'Python Developer',
  'Problem Solver'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
 
function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 300);
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();
 
/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

 
  // ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const mobNavLinks = document.querySelectorAll('.mob-link');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
  mobNavLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });
 
  // ── FORMSPREE CONTACT FORM ──
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
 
  // Real-time validation helpers
  function validateField(input, errId, message) {
    const val = input.value.trim();
    const err = document.getElementById(errId);
    let valid = true;
    if (input.required && !val) {
      err.textContent = 'This field is required.';
      valid = false;
    } else if (input.minLength && val.length < input.minLength) {
      err.textContent = message;
      valid = false;
    } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      err.textContent = '';
    }
    input.classList.toggle('invalid', !valid);
    input.classList.toggle('valid', valid && val.length > 0);
    return valid;
  }
 
  document.getElementById('f-name').addEventListener('blur', function() {
    validateField(this, 'err-name', 'Name must be at least 2 characters.');
  });
  document.getElementById('f-email').addEventListener('blur', function() {
    validateField(this, 'err-email', '');
  });
  document.getElementById('f-message').addEventListener('blur', function() {
    validateField(this, 'err-message', 'Message must be at least 10 characters.');
  });
 
  // Form submission via Formspree fetch API
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
 
    // Validate all required fields first
    const nameOk = validateField(document.getElementById('f-name'), 'err-name', 'Name must be at least 2 characters.');
    const emailOk = validateField(document.getElementById('f-email'), 'err-email', '');
    const msgOk = validateField(document.getElementById('f-message'), 'err-message', 'Message must be at least 10 characters.');
    if (!nameOk || !emailOk || !msgOk) return;
 
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-flex';
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
 
    try {
      const data = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
 
      if (response.ok) {
        // Success
        formSuccess.style.display = 'flex';
        contactForm.reset();
        document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
        btnText.textContent = '✓ Sent!';
      } else {
        const resData = await response.json();
        if (resData.errors) {
          formError.querySelector('span + *') || (formError.innerHTML = '<span>✗</span> ' + resData.errors.map(e => e.message).join(', '));
        }
        formError.style.display = 'flex';
        btnText.textContent = 'Send Message →';
      }
    } catch (err) {
      formError.style.display = 'flex';
      btnText.textContent = 'Send Message →';
    } finally {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnSpinner.style.display = 'none';
    }
  });
