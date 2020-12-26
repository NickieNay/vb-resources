const requestPromise = require('request-promise');
const _ = require('lodash');
const { eBayRoutes, eBayScopes, eBayAffiliateInfo } = require('../config');

const ebayResourcesRepository = {
  getClientCredentials () {
    const options = {
      method: 'POST',
      uri: eBayRoutes.OAUTH,
      form: {
        grant_type: 'client_credentials',
        scope: eBayScopes.API_SCOPE,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${process.env.EBAY_API_KEY}`,
      },
      json: true,
    };

    return requestPromise(options);
  },

  getItemByEid (access_token, eid) {
    const options = {
      uri: eBayRoutes.LEGACY_ITEM_ID,
      qs: {
        legacy_item_id: `${eid}`,
      },
      headers: {
        ['X-EBAY-C-ENDUSERCTX']: `affiliateCampaignId=${eBayAffiliateInfo.CAMPAIGN_ID},affiliateReferenceId=${eBayAffiliateInfo.REFERENCE_ID}`,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      json: true,
    };
  
    return requestPromise(options);
  }
};
module.exports = ebayResourcesRepository;
