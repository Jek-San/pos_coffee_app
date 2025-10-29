/**
 * General-purpose data sanitizer to filter object properties
 * based on allowed fields.
 * 
 * @param {Object} data - The object to sanitize (e.g., req.body).
 * @param {string[]} allowedFields - Array of allowed keys to keep.
 * @returns {Object} - A sanitized version of the input object.
 */
function sanitize(data, allowedFields) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );
}

module.exports = sanitize;
