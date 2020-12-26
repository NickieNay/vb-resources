const EbayResourcesRouter = (require('express')).Router();
const EbayResourcesController = require('../controllers/ebayResources');
const Responder = require('../middleware/responder');

EbayResourcesRouter.route('/')
/**
 * @api {get} /api/ebayresources?eid={eid} Get ebay resources for eid
 * @apiParam {String} eid of ebay item
 */
.get(EbayResourcesController.getEbayItem, Responder);

module.exports = EbayResourcesRouter;