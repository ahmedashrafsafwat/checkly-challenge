FROM node:14


RUN apt-get update && apt-get install -y wget

# Use dockerize to wait till mongodb container to get initiated first before the backend container
ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /

COPY package.json .


RUN npm install

COPY . .

# in real development enviornment there would be 
# different docker containers for each backend service
# but for now let's expose all the services port
EXPOSE 8080
EXPOSE 8081
EXPOSE 8082

# wait for mongodb successfull connection and then run the node app
CMD dockerize -wait tcp://db_mongo:27017 -timeout 7m && dockerize -wait tcp://rabbitmq:5672 -timeout 7m && npm jobs



