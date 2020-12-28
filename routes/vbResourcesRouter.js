const vbResourcesRouter = (require('express')).Router();
const vbResourcesController = require('../controllers/vbResources');
const Responder = require('../middleware/responder');

vbResourcesRouter.route('/')
/**
 * @api {get} /api/ebayresources?eid={eid} Get ebay resources for eid
 * @apiParam {String} eid of ebay item
 */
.get(vbResourcesController.getVbItem, Responder);

module.exports = vbResourcesRouter;