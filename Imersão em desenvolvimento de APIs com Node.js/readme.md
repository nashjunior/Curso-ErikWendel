docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=docker -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient 

docker exec -it mongodb mongo --host localhost -u admin -p docker --authenticationDatabase admin --eval "db.getSiblingDB('courses').createUser({user: 'user', pwd: 'docker', roles: [{role: 'readWrite', db: 'courses'}]})"