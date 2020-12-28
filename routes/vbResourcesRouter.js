const vbResourcesRouter = (require('express')).Router();
const vbResourcesController = require('../controllers/vbResources');
const Responder = require('../middleware/responder');

vbResourcesRouter.route('/')
/**
 * @api {get} /api/vbresources?path={path} Get meta information for vintagebreaks.com/{path}
 * @apiParam {String} path of item on vintage breaks
 */
.get(vbResourcesController.getVbItem, Responder);

module.exports = vbResourcesRouter;