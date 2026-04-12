/* ════════════════════════════════════
   app.js  –  Punto de entrada principal
   Responsabilidad: importar módulos y orquestar la inicialización
════════════════════════════════════ */

import { getMuseums }       from './api.js';
import { initCarousel }     from '../modules/carousel.js';
import { buildMuseumCards } from '../modules/qr.js';
import { initGeolocation }  from '../modules/geolocation.js';

(async () => {
  try {
    const museums = await getMuseums();

    initCarousel(museums);
    buildMuseumCards(museums);
    initGeolocation(museums);

  } catch (err) {
    console.error('Error al cargar los museos:', err);

    document.getElementById('carousel-loading').innerHTML = `
      <p style="color:var(--rust)">
        No se pudo conectar a la API.<br>
        Asegúrate de que el servidor esté corriendo en
        <code>http://localhost:3000</code>.
      </p>
    `;
  }
})();