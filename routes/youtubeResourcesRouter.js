const youtubeResourcesRouter = (require('express')).Router();
const youtubeResourcesController = require('../controllers/youtubeResources');
const Responder = require('../middleware/responder');

youtubeResourcesRouter.route('/')
/**
 * @api {get} /api/vbresources?path={path} Get meta information for vintagebreaks.com/{path}
 * @apiParam {String} path of item on vintage breaks
 */
.get(youtubeResourcesController.getYoutubeItem, Responder);

module.exports = youtubeResourcesRouter;