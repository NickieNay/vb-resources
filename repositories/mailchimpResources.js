const requestPromise = require('request-promise');
const { mailchimpRoutes, mailchimpFolderId } = require('../config');

const mailchimpResourcesRepository = {
  createNewFile (name, buffer) {
    const options = {
      method: 'POST',
      uri: mailchimpRoutes.FILES,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`,
      },
      body: {
        folder_id: mailchimpFolderId,
        name: `${name}.jpg`,
        file_data: buffer.toString('base64'),
      },
      json: true,
    };
    return requestPromise.post(options);
  },
};
module.exports = mailchimpResourcesRepository;