const axios = require('axios').default;
const cheerio = require('cheerio');
const { youtube } = require('../config');
const crypto = require('crypto');

const axiosInstance = axios.create({
  timeout: 1000,
  responseType: 'text',
});



const youtubeResourcesRepository = {
  getItemHtmlByVParam (v) {
    return axiosInstance.get(youtube.URL, { params: { v }})
    .then((response => {
      const root = cheerio.load(response.data);
      const metaNodes = root('meta')

      const urlNode = metaNodes.filter((i, node) => node.attribs.property === 'og:url')[0];
      const titleNode = metaNodes.filter((i, node) => node.attribs.property === 'og:title')[0];
      const pictureNode = metaNodes.filter((i, node) => node.attribs.property === 'og:image')[0];

      const url = urlNode ? urlNode.attribs.content : '';
      const title = titleNode ? titleNode.attribs.content : '';
      const picUrl = pictureNode ? pictureNode.attribs.content : '';

      const item = {
        v,
        url,
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
module.exports = youtubeResourcesRepository;
