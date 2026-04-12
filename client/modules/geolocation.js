/* ════════════════════════════════════
   geolocation.js  –  Módulo de geolocalización
   Responsabilidad: detectar la ubicación del usuario y mostrar
                    el museo más cercano usando la API del navegador
════════════════════════════════════ */

import { haversine } from '../utils/helpers.js';

/**
 * Solicita la ubicación del usuario y muestra el museo más cercano.
 * @param {Array} museums - Arreglo de objetos museo desde la API
 */
export function initGeolocation(museums) {
  if (!navigator.geolocation) {
    console.info('Geolocalización no disponible en este navegador.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => _onPositionSuccess(pos, museums),
    err => console.info('Permiso de geolocalización denegado:', err.message)
  );
}

// ── Privado ────────────────────────────────────────────────
function _onPositionSuccess(pos, museums) {
  const { latitude, longitude } = pos.coords;

  // Encontrar el museo con menor distancia
  let nearest = null;
  let minDist  = Infinity;

  museums.forEach(museum => {
    const dist = haversine(latitude, longitude, museum.lat, museum.lng);
    if (dist < minDist) {
      minDist  = dist;
      nearest  = museum;
    }
  });

  if (!nearest) return;

  const km     = (minDist / 1000).toFixed(1);
  const banner = document.getElementById('nearby-banner');

  banner.innerHTML = `
    <span class="icon">📍</span>
    El museo más cercano a tu ubicación es
    <strong>${nearest.name}</strong> — a aproximadamente <strong>${km} km</strong>.
    <a href="${nearest.mapsUrl}" target="_blank" rel="noopener"
       style="color:#fff; margin-left:.4rem;">
      Ver en Maps →
    </a>
  `;
  banner.style.display = 'block';

  // Resaltar la tarjeta correspondiente y hacer scroll
  const card = document.querySelector(`.museum-card[data-id="${nearest.id}"]`);
  if (card) {
    card.style.outline = '3px solid var(--rust)';
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}