const {publish} = require('../services/publisher');
const schedule = require('node-schedule');

const { db }= require('../models')



    db.once('open', async ()=> {
        var Check = require('../models/check')

        console.log("opend ??")
    let checks = await Check.find();

    checks.forEach((check)=>{
        /** 
         * add a scheduler for each check frequency 
         * frequency: how often the check should run in minutes
         * 
        */ 
        if(!check.frequency) check.frequency = 10;// set it to default value if not found
        
        schedule.scheduleJob(`*/${check.frequency} * * * *`, function(){
            console.log(`new job started at ${new Date()} for check with id: ${check._id}`)
            check.startTime = new Date();
            publish(check);
          });
    })
})
