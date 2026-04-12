/* ════════════════════════════════════
   helpers.js  –  Utilidades generales
   Responsabilidad: funciones de uso compartido entre módulos
════════════════════════════════════ */

/**
 * Calcula la distancia entre dos coordenadas geográficas
 * usando la fórmula de Haversine.
 *
 * @param {number} lat1 - Latitud punto A
 * @param {number} lon1 - Longitud punto A
 * @param {number} lat2 - Latitud punto B
 * @param {number} lon2 - Longitud punto B
 * @returns {number} Distancia en metros
 */
export function haversine(lat1, lon1, lat2, lon2) {
  const EARTH_RADIUS_M = 6_371_000;
  const toRad = deg => deg * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}