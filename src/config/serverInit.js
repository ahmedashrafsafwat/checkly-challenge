const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");


// Create express server
module.exports = (serviceName, port) => {
    try {
        let app = express();

        app.use(cors())

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));


        //require only the running service only 
        const route = require(`../routes/${serviceName}.js`);

        // if the service is for user then make a main route else make it as the service name
        app.use(`/${serviceName == 'user'? '': serviceName}`, route)

        // start running the service
        app.listen(port, () => {
            console.log(`${serviceName} service is running at http://localhost:${port} `);
        });

        return app;

    } catch (err) {
        console.log(err)
        throw err.message;
    }
}