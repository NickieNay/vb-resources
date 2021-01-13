const vbResourcesRouter = require('./routes/vbResourcesRouter');
const youtubeResourcesRouter = require('./routes/youtubeResourcesRouter');
const notFoundMiddleware = require('./middleware/404Handler');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const cors = require('cors');

module.exports = function router (app) {

  app.use(cors());

  app.use('/healthcheck', (req, res) => {
    res.status(200).send('sall good!');
  });

  app.use('/api/vbresources', vbResourcesRouter);
  app.use('/api/youtuberesources', youtubeResourcesRouter);

  app.use(errorHandlingMiddleware);
  app.use(notFoundMiddleware);
}