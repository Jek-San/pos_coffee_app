// pos/middleware/validate.js
module.exports = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log("❌ Validation error", result.error.format()); // Debug log
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Invalid input",
      errors: result.error.flatten().fieldErrors,
    });
  }

  req.body = result.data; // Cleaned, parsed body
  next();
};

