const axios = require('axios').default;
const cheerio = require('cheerio');
const { vb } = require('../config');
const crypto = require('crypto');

const axiosInstance = axios.create({
  timeout: 1000,
  responseType: 'text',
});



const vbResourcesRepository = {
  getItemHtmlByPath (path) {
    return axiosInstance.get(vb.URL + '/' + path)
    .then((response => {
      const root = cheerio.load(response.data);
      const metaNodes = root('meta')

      const titleNode = metaNodes.filter((i, node) => node.attribs.property === 'og:title')[0];
      const pictureNode = metaNodes.filter((i, node) => node.attribs.property === 'og:image')[0];

      const title = titleNode ? titleNode.attribs.content : '';
      const picUrl = pictureNode ? vb.URL + pictureNode.attribs.content : '';

      const item = {
        path,
        title,
        picUrl,
      };

      const hash = crypto.createHash('MD5');
      hash.update(JSON.stringify(item));
      const id = hash.digest('hex');

      return {
        id,
        ...item,
      };
    }));
  },
};
module.exports = vbResourcesRepository;
