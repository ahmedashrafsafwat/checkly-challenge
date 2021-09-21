const routes = require("express").Router();

const { checkController } = require('../controller/check.controller')
const {requiredFields} = require('../middlewares/requiredFields');
const {validateCheck} = require('../middlewares/validateChecks');
 
/**
 *  gets checks with query params for paginations
 *  queryParameters: 
 *      perPage: 
 *          description: the checks per single page
 *      page:
 *          description: the page that we are currently standing on
 *  if query parameters not sent then the default scenario is turned on which returns 
 *  page number 0 with 10 checks per page
 */
routes.get("/" ,requiredFields,checkController.getAll);

routes.post("/",requiredFields , validateCheck ,checkController.add);

routes.put("/:id", requiredFields,checkController.update);

routes.delete("/:id", requiredFields,checkController.delete);




module.exports = routes;