/* ════════════════════════════════════
   carousel.js  –  Módulo del carrusel
   Responsabilidad: construir y controlar el carrusel de imágenes
════════════════════════════════════ */

/**
 * Inicializa el carrusel con la lista de museos.
 * @param {Array} museums - Arreglo de objetos museo desde la API
 */
export function initCarousel(museums) {
  const track  = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  let current  = 0;

  // ── Construir slides y dots ──────────────────────────────
  museums.forEach((museum, index) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <img
        src="${museum.image}"
        alt="${museum.name}"
        loading="${index === 0 ? 'eager' : 'lazy'}"
      />
      <div class="slide-caption">
        <h2>${museum.name}</h2>
      </div>
    `;
    track.appendChild(slide);

    // Dot indicador
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a ${museum.name}`);
    dot.addEventListener('click', () => goTo(index));
    dotsEl.appendChild(dot);
  });

  // ── Navegación ──────────────────────────────────────────
  function goTo(idx) {
    current = (idx + museums.length) % museums.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.dot').forEach((dot, i) =>
      dot.classList.toggle('active', i === current)
    );
  }

  document.querySelector('.carousel-btn.prev')
    .addEventListener('click', () => goTo(current - 1));
  document.querySelector('.carousel-btn.next')
    .addEventListener('click', () => goTo(current + 1));

  // ── Auto-avance cada 5 s (pausa al hover) ───────────────
  let timer = setInterval(() => goTo(current + 1), 5000);

  track.parentElement.addEventListener('mouseenter', () => clearInterval(timer));
  track.parentElement.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(current + 1), 5000);
  });

  // ── Soporte táctil / swipe ───────────────────────────────
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // ── Mostrar carrusel y ocultar spinner ───────────────────
  document.getElementById('carousel-loading').style.display = 'none';
  document.getElementById('carousel-container').style.display = 'block';
}