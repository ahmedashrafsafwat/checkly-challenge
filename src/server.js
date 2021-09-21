require('./config/config');
var port = process.env.PORT
var serviceName = process.env.SERVICE_NAME
// connect to db
require('./models');




/** the Server class is a factory class that helps in initiating the server with the requested services in the desired port */
class Server {
    constructor(serviceName, port) {
        this.port = port;
        this.serviceName = serviceName;
    }
    start() {
        this.app =  require('./config/serverInit')(this.serviceName,this.port);
        return this.app
    }
}

module.exports = Server;

/** if the environment is not in test then initiate the server services from the envrionment variables */
if(process.env.NODE_ENV != "test") {
    let server = new Server("webHook",8081)
    server.start()

    let server2 = new Server("checks",8082)
    server2.start()
}
