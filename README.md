# Checkly challenge


### Introduction:

This is Checkly backend challenge, the backend is built with microservices archticture in mind, we have 2 services the `webHook` simulation, the `checks` services and the `schedular rabbitmq service`, in real life project the database should be only connected to its crosponding service(s) which is not the case here, the services run using docker containers and docker compose, I have built four docker containers:
1. Haproxy container which acts as API Gateway for routing to the different services
2,3,4. 3 node containers for each service <br />
5. mongodb container

We have 2 modes for the `NODE_ENV` variable in the .env:
1. `development` => to the application as services in the development environment
2. `test` => to run the endpoint test cases which runs the two services at the same time
3. `production` => just written to simulate the production variables
To run a single service you can specify the service name in `SERVICE_NAME` env variable from `webHook` or `check`
the service name should always be equal to the route file name

### The prerequests to run this project:

   1. to have node & npm installed 
   2. to have docker installed 
   3. to have docker-compose installed

then head over to the APIs at port 8080 at localhost which is the exposed port for the `haproxy` you can change that inside the `docker-compose.yml` file

### How to run the project:

 run the following commands:

   1. run command `npm install`
   2. run command `docker-compose build`
   3. run command `docker-compose up`


### The APIs can be found inside the postman collection

   and here is the list of all routes <br />
`webhook` service  <br />
   POST   `http://localhost:8080/webHook/push` <br />
`check` service   <br />
   POST   `http://localhost:8080/checks` <br />
   GET    `http://localhost:8080/checks?perPage=10&page=0` <br />
   PUT    `http://localhost:8080/checks/:id` <br />
   DELETE `http://localhost:8080/checks/:id` <br />



### How to run the test cases:

Stand at the root directory and run command `npm run test` to run the endpoint api test cases 


For any questions or issues when running the check please contact me at ahmedashrafsafwat@gmail.com

Looking forward to hear from you

### the checks config file

The checks config file can be found in `src/config/checkDef.json`.
the json file only contains defenations for all the keys to be checked as well as the type for each key
I decided to go for JSON for the following reasons:
1. the `JSON` format is relativly easy to work with as of course it is a javascript object and can be imported and used extremly easy
2. it is near to the human language which means that every one can easly use and edit this file
it has it's cons of course:
1. JSON files doesn't allow the use of comments
2. JSON files doesn't allow multi line strings
`YAML` could also fit perfectly and would solve the multi line strings and comments that JSON files lacks
yet it doesn't integrate well with javascript and it should be converted at some point to javascript object in order to be used

### Final thoughts
The task could be much easier and I could have finished it well till the last requirement if the requirments were clearer and the defienations
were explained, the task should have been explained more, or even to discuss the task a bit more through a call, it was hard to even get the 
user stories out of it as I couldn't fully get the challenge.

It was nice meeting you all and really hope to join your amazing team in the future, good luck in your amazing journy

