const routes = require("express").Router();

const { webHookController } = require('../controller/webHook.controller')
const {requiredFields} = require('../middlewares/requiredFields');

/**
 *  emulates the webhook generated when pushing the code to github
 */
routes.post("/push",requiredFields, webHookController.push);

module.exports = routes;