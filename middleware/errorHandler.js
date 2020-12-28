module.exports = function (err, req, res, next) {
  console.error(err);
  if (!err.response.status) err.response.status = 500;
  res.status(err.response.status).send({
    error: err.response.statusText,
  });
};
