/** connect to mongodb */
const mongoose = require("mongoose") 

// choose from the development and test databases
const env = process.env.NODE_ENV || 'development'; 
// require the db config whether it is production or development
const config = require(`${__dirname}/../config/config.js`)[env];

 mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`, { useNewUrlParser: true ,useUnifiedTopology: true})

 var db = mongoose.connection
    db.on('error', function (err) {
      console.log('Failed to connect to db',err)
    });
  
    db.once('open', function () {
      console.log("Connected to database");
    });

  module.exports.db = db;