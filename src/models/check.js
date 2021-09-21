const mongoose = require("mongoose")

const schema = new mongoose.Schema({
	name: String,
	activated: Boolean,
	checkType: String,
	script: String,
	frequency: Number
},{strict: false})

module.exports = mongoose.model("Check", schema)