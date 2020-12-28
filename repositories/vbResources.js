const axios = require('axios').default;
const cheerio = require('cheerio');
const { vb } = require('../config');

const axiosInstance = axios.create({
  baseURL: vb.URL,
  timeout: 1000,
  responseType: 'text',
});

const vbResourcesRepository = {
  getItemHtmlByPath (path) {
    return axiosInstance.get(path)
    .then((response => {
      const root = cheerio.load(response.data);
      const metaNodes = root('meta')

      const titleNode = metaNodes.filter((i, node) => node.attribs.property === 'og:title')[0];
      const pictureNode = metaNodes.filter((i, node) => node.attribs.property === 'og:image')[0];

      const title = titleNode.attribs.content;
      const picUrl = pictureNode.attribs.content;

      console.log(response);
    }));
  },

  getItemHtmlByPathzz (path) {
    const options = {
      uri: vb.URL + path,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  
    return requestPromise(options);
  },
};
module.exports = vbResourcesRepository;
