/* ════════════════════════════════════
   qr.js  –  Módulo de tarjetas + QR
   Responsabilidad: generar las tarjetas de museos con su código QR
   Depende de: qrcodejs (cargado globalmente desde CDN en index.html)
════════════════════════════════════ */

/**
 * Genera la cuadrícula de tarjetas de museos, incluyendo el QR de Maps.
 * @param {Array} museums - Arreglo de objetos museo desde la API
 */
export function buildMuseumCards(museums) {
  const grid = document.getElementById('museum-grid');
  grid.innerHTML = ''; // Limpiar skeletons

  museums.forEach(museum => {
    const card = document.createElement('div');
    card.className = 'museum-card';
    card.dataset.id = museum.id;

    card.innerHTML = `
      <img src="${museum.image}" alt="${museum.name}" loading="lazy" />
      <div class="card-body">
        <h3>${museum.name}</h3>
        <div class="qr-block">
          <p class="qr-label">📍 Escanea para ubicación</p>
          <div id="qr-${museum.id}"></div>
          <a class="maps-link" href="${museum.mapsUrl}" target="_blank" rel="noopener">
            🗺️ ${museum.mapsUrl}
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Generar QR una vez que el elemento ya está en el DOM
    /* global QRCode */
    new QRCode(document.getElementById(`qr-${museum.id}`), {
      text: museum.mapsUrl,
      width: 120,
      height: 120,
      colorDark: '#1a1208',
      colorLight: '#f5f0e8',
      correctLevel: QRCode.CorrectLevel.M,
    });
  });
}