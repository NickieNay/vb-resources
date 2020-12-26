module.exports = function error404Handler (req, res) {
  res.status(404).send({
      error: {
        status: 'error',
        code: '404',
        message:'resource not found',
      },
    });
};
