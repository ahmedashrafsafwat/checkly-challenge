const { successResponse, errorResponse, uniqueId } = require('../helper');
const axios = require("axios")
module.exports.webHookController = {
    push: async (req, res) => {
        await axios.post('http://localhost:8082/check/validate')

        return successResponse("Web Hook Fired", response, 200, res)
    }
};