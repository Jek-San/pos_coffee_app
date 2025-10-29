function toCaps(str) {
  if (!str || typeof str !== 'string') return '';
  return str.toUpperCase();
}

module.exports = toCaps;
