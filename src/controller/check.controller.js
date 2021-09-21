const { successResponse, errorResponse } = require("../helper");
const { checkService } = require("../services/check.service");

module.exports.checkController = {
  getAll: async (req, res) => {
    await checkService.getAll(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Checks", response, 200, res);
    });
  },
  add: async (req, res) => {
    console.log(req.body)
    await checkService.add(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Check added", response, 200, res);
    });
  },
  update: async (req, res) => {
    await checkService.edit(req, res, (err, response) => {
        if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Check Updated", response, 200, res);
    });
  },
  delete: async (req, res) => {
    await checkService.delete(req, res, (err, response) => {
      if (err) return errorResponse(err.message, err.code, res);

      return successResponse("Check Deleted", response, 200, res);
    });
  }
};
