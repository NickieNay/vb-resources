const ebayResourcesRepository = require('../repositories/ebayResources')
const _ = require('lodash');
const request = require('request');
const sharp = require('sharp');
const fs = require('fs');
const { images } = require('../config');
const s3ResourcesRepository = require('../repositories/s3Resources');

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

const uploadPicToServer = ebayResource =>
  request(ebayResource.image.imageUrl)
    .pipe(sharp().resize(images.WIDTH, images.HEIGHT, {fit: 'inside'}))
    .toBuffer()
    .then(buffer => 
      s3ResourcesRepository.createNewFile(ebayResource.eid, buffer)
    )
    .then(({ full_size_url }) => (
      {
        ...ebayResource,
        preview_pic: full_size_url,
      }
    ));

const ebayResourcesController = {
  getEbayItem(req, res, next) {
    const eid = req.query.eid;
    return ebayResourcesRepository.getClientCredentials()
      .promise()
      .then(({ access_token }) => 
        ebayResourcesRepository.getItemByEid(access_token, eid))
      .then((ebayResource) => ({ eid, ..._.pick(ebayResource, params) }))
      .then(uploadPicToServer)
      .then(ebayResource => {
        req.state = { body: ebayResource };
        return next();
      })
      .catch(err => next(err)); 
  },

  getEbayItems (req, res, next) {
    const eids = Array.isArray(req.query.eid) ? req.query.eid : [req.query.eid];
    return ebayResourcesRepository.getClientCredentials()
      .promise()
      .then(({ access_token }) => 
        Promise.map(eids, eid =>
          ebayResourcesRepository.getItemByEid(access_token, eid)
          .then((ebayResource) => ({ eid, ..._.pick(ebayResource, params) }))
          .then(uploadPicToMailchimp)
        )
      )
      .then(ebayResources => {
        req.state = { body: ebayResources };
        return next();
      })
      .catch(err => next(err));
  },
};

module.exports = ebayResourcesController;
