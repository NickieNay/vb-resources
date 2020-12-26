module.exports = {
  awsConst: {
    bucketName: 'otia-email-gen-assets',
    region: 'us-east-2',
  },

  eBayRoutes: {
    OAUTH: 'https://api.ebay.com/identity/v1/oauth2/token',
    LEGACY_ITEM_ID: 'https://api.ebay.com/buy/browse/v1/item/get_item_by_legacy_id',
  },

  mailchimpRoutes: {
    FOLDERS: 'https://us18.api.mailchimp.com/3.0/file-manager/folders',
    FILES: 'https://us18.api.mailchimp.com/3.0/file-manager/files',
  },

  eBayScopes: {
    API_SCOPE: 'https://api.ebay.com/oauth/api_scope',
  },

  eBayAffiliateInfo: {
    CAMPAIGN_ID: '5338393745',
    REFERENCE_ID: 'email-gen',
  },
  
  mailchimpFolderId: 2733,

  images: {
    WIDTH: 178,
    HEIGHT: 240,
  },
};
