const vbResourcesRepository = require('../repositories/vbResources')
const _ = require('lodash');

const params = [
  'id',
  'path',
  'title',
  'picUrl',
];

const vbResourcesController = {
  getVbItem(req, res, next) {
    const path = req.query.path;
    return vbResourcesRepository.getItemHtmlByPath(path)
      .then((item) => ({ ..._.pick(item, params) }))
      .then(item => {
        req.state = { body: item };
        return next();
      })
      .catch(err => next(err)); 
  },
};

module.exports = vbResourcesController;
