module.exports = function (err, req, res, next) {
  console.error(err);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send({
    errorCount: err.error.errors.length,
    error: err.error.errors[0].message,
  });
};
