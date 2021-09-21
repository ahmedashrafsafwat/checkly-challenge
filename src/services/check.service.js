const Check = require("../models/check");
const LifeCycle = require("../models/checkMetrics");

module.exports.checkService = {
  getAll: async (req, res, callback) => {
    try {
      let { page , perPage } = req.query 

      if(!page) {
        page = 0
      } else {
        page = parseInt(page)
      }
      if(!perPage) {
        perPage = 10
      }else {
        perPage =parseInt(perPage)
      }

      let checks = await Check.find({})
        .select('title description deadline reminderTime isCompleted')
        .limit(perPage)
        .skip(perPage * page)
        .sort({title: 'asc'});

        callback(null, checks);
    } catch (err) {
        callback({message:err.message,code:500})
    }
  },
  add: async (req, res, callback) => {
      try {

        let newCheck = await Check.create(req.body);

        newCheck = newCheck.toObject()

        // remove unneccery fields
        delete newCheck["__v"]

        callback(null, newCheck);

      } catch (err) {
        callback({message:err.message,code:500})
      }
  },
  update: async (req, res, callback) => {
    try {
        let { updateBody } = req.body;
        let _id = req.params.id


        const editedCheck = await Check.updateOne({_id},updateBody)

        editedCheck.nModified ? callback(null, editedCheck): callback({message:"Check not found",code:404});


    } catch (err) {
        callback({message:err.message,code:500})
    }

  },
  delete: async (req, res, callback) => {

    try {
        let _id = req.params.id

        const deletedCheck = await Check.deleteOne({_id})

        deletedCheck.deletedCount ? callback(null, deletedCheck): callback({message:"Check not found",code:404});

    } catch (err) {
        callback({message:err.message,code:500})
    }

  }
};
