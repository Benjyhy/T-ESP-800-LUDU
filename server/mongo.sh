docker pull mongo
docker run --name mongo-db -d -p 27017:27017 mongo mongod --auth
docker exec -it mongo-db bin/mongo -c 'use ludu'
mongo
use ludu
db.createUser({user:"ludu", pwd:"root", roles:[{role:"root", db:"admin"}]})
exit
