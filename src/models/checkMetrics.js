const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	checkId: String,
    // upTime: Date, 
    responseTime:Date
})

module.exports = mongoose.model("CheckMetrics", schema)