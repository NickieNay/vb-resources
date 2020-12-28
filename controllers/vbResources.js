const vbResourcesRepository = require('../repositories/vbResources')
const _ = require('lodash');

const params = [
  'image',
  'itemAffiliateWebUrl',
  'itemId',
  'price',
  'shortDescription',
  'title',
  // 'additionalImages',
  // 'buyingOptions',
  // 'itemEndDate',
  // `'itemWebUrl',
];

const ebayResourcesController = {
  getVbItem(req, res, next) {
    const path = req.query.path;
    return vbResourcesRepository.getItemHtmlByPath(path)
      .then((ebayResource) => ({ path, ..._.pick(ebayResource, params) }))
      .then(ebayResource => {
        req.state = { body: ebayResource };
        return next();
      })
      .catch(err => next(err)); 
  },
};

module.exports = ebayResourcesController;
