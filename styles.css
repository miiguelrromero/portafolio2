// Apertura de los archivos desplegables
const triggers = document.querySelectorAll('[aria-controls]');
triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const willOpen = trigger.getAttribute('aria-expanded') !== 'true';

    trigger.setAttribute('aria-expanded', String(willOpen));
    panel.classList.toggle('is-open', willOpen);
    panel.setAttribute('aria-hidden', String(!willOpen));

    if (willOpen) {
      window.setTimeout(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 180);
    }
  });
});

// Aparición progresiva de los elementos al entrar en pantalla
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Cursor experimental: se desactiva automáticamente en pantallas táctiles
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');
if (window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
  window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });
  const follow = () => {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(follow);
  };
  follow();
}

// El índice lateral acompaña el recorrido
const sections = [...document.querySelectorAll('.section-marker')];
const current = document.querySelector('.side-index__current');
const line = document.querySelector('.side-index__line');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = entry.target.dataset.index;
      current.textContent = index;
      line.style.setProperty('--progress', `${Number(index) / 3 * 100}%`);
      line.style.background = `linear-gradient(to bottom, var(--red) ${Number(index) / 3 * 100}%, #777 ${Number(index) / 3 * 100}%)`;
    }
  });
}, { threshold: 0.45 });
sections.forEach(section => sectionObserver.observe(section));

// Movimiento sutil de la pegatina siguiendo el puntero
const sticker = document.querySelector('.sticker');
if (sticker && window.matchMedia('(pointer: fine)').matches) {
  const stage = document.querySelector('.hero__stage');
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    sticker.style.translate = `${x * 12}px ${y * 12}px`;
  });
  stage.addEventListener('mouseleave', () => { sticker.style.translate = '0 0'; });
}
