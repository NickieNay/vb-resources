const youtubeResourcesRepository = require('../repositories/youtubeResources')
const _ = require('lodash');

const params = [
  'id',
  'v',
  'url',
  'title',
  'picUrl',
];

const youtubeResourcesController = {
  getYoutubeItem(req, res, next) {
    const v = req.query.v;
    return youtubeResourcesRepository.getItemHtmlByVParam(v)
      .then((item) => ({ ..._.pick(item, params) }))
      .then(item => {
        req.state = { body: item };
        return next();
      })
      .catch(err => next(err)); 
  },
};

module.exports = youtubeResourcesController;
