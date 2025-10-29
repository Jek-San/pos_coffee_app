module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    code: err.code || 'INTERNAL_ERROR',
    errors: err.meta || null, // <- this shows Zod validation errors
  });
};
