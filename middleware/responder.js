const xssFilters = require('xss-filters');

const createResponse = (req, body) => {
  const response = body;

  if (req.errors && req.errors.length) {
    response.errors = req.errors;
  }

  return response;
}


const responder = (req, res) => {
  res.set('Content-Type', 'application/json');
  const sanitizeObj = JSON.parse(xssFilters.inHTMLData(JSON.stringify(req.state.body)));
  return res.send(createResponse(req, sanitizeObj));
};

module.exports = responder;